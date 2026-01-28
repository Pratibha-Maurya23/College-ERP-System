import express from "express";
import fs from "fs";
import path from "path";
import cors from "cors";
import PDFDocument from "pdfkit";
import { v4 as uuidv4 } from "uuid";

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

// 🔹 PATHS
const DATA_DIR = path.join(process.cwd(), "data");
const RECEIPT_DIR = path.join(process.cwd(), "receipts");

const ADMISSION_FILE = path.join(DATA_DIR, "admissions.json");
const PAYMENT_FILE = path.join(DATA_DIR, "payments.json");

// 🔹 ENSURE FOLDERS EXIST
if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR);
if (!fs.existsSync(RECEIPT_DIR)) fs.mkdirSync(RECEIPT_DIR);

/* ---------- UTILITIES ---------- */
const readJSON = (file) => {
  try {
    if (!fs.existsSync(file)) return [];

    const content = fs.readFileSync(file, "utf8").trim();

    if (!content) return []; // 🔥 handles empty file

    return JSON.parse(content);
  } catch (err) {
    console.error(`❌ Failed to read ${file}:`, err.message);
    return [];
  }
};

const writeJSON = (file, data) => {
  fs.writeFileSync(file, JSON.stringify(data, null, 2), "utf8");
};
/* ---------- SAVE ADMISSION ---------- */
app.post("/save-admission", (req, res) => {
  try {
    const admissions = readJSON(ADMISSION_FILE);

    const newEntry = {
      id: Date.now(),
      ...req.body,
      createdAt: new Date().toISOString(),
    };

    admissions.push(newEntry);
    writeJSON(ADMISSION_FILE, admissions);

    res.json({ success: true, data: newEntry });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

/* ---------- GET LATEST ADMISSION ---------- */
app.get("/admission/latest", (req, res) => {
  const admissions = readJSON(ADMISSION_FILE);
  res.json(admissions[admissions.length - 1] || {});
});

/* ---------- PAYMENT + RECEIPT ---------- */
app.post("/payment", (req, res) => {
  try {
    const admission = readJSON(ADMISSION_FILE).slice(-1)[0];
    if (!admission) return res.status(400).json({ message: "No admission found" });

    const payment = req.body;
    const receiptId = uuidv4();
    const receiptPath = path.join(RECEIPT_DIR, `receipt-${receiptId}.pdf`);

    // 🔹 SAVE PAYMENT
    const payments = readJSON(PAYMENT_FILE);
    payments.push({
      receiptId,
      studentId: admission.id,
      ...payment,
      date: new Date().toISOString(),
    });
    writeJSON(PAYMENT_FILE, payments);

    // 🔹 GENERATE PDF RECEIPT
    const doc = new PDFDocument({ margin: 50 });
    doc.pipe(fs.createWriteStream(receiptPath));

    doc.fontSize(22).text("College Fee Receipt", { align: "center" });
    doc.moveDown();

    doc.fontSize(12);
    doc.text(`Receipt ID: ${receiptId}`);
    doc.text(`Date: ${new Date().toLocaleString()}`);
    doc.moveDown();

    doc.fontSize(14).text("Student Details", { underline: true });
    doc.fontSize(12);
    doc.text(`Name: ${admission.fullName}`);
    doc.text(`Email: ${admission.email}`);
    doc.text(`Phone: ${admission.phone}`);
    doc.text(`Course: ${admission.allotedCourse}`);
    doc.text(`Institute: ${admission.allotedInstitue}`);
    doc.moveDown();

    doc.fontSize(14).text("Payment Details", { underline: true });
    doc.fontSize(12);
    doc.text(`Paid Amount: ₹${payment.amountPaid}`);
    doc.text(`Total Fee: ₹${payment.totalFee}`);
    doc.text(`Remaining: ₹${payment.remaining}`);

    doc.end();

    res.json({
      success: true,
      receiptId,
      receiptUrl: `http://localhost:${PORT}/receipt/${receiptId}`,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: err.message });
  }
});

/* ---------- DOWNLOAD RECEIPT ---------- */
app.get("/receipt/:id", (req, res) => {
  const file = path.join(RECEIPT_DIR, `receipt-${req.params.id}.pdf`);
  if (!fs.existsSync(file)) return res.status(404).send("Receipt not found");
  res.download(file);
});

/* ---------- SERVER ---------- */
app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});
