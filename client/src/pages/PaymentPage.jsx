import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { generateInvoice } from "../utils/invoice";
import { useNavigate } from "react-router-dom";

const Toast = ({ message, onClose, type = "success", duration = 4000 }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, duration);
    return () => clearTimeout(timer);
  }, [onClose, duration]);

  const colors = {
    success: "bg-green-100 text-green-700 border-green-400",
    error: "bg-red-100 text-red-700 border-red-400",
    warning: "bg-yellow-100 text-yellow-700 border-yellow-400",
  };

  return (
    <div
      className={`fixed top-5 right-5 z-50 flex items-center border-l-4 p-4 rounded shadow-md ${colors[type]}`}
      role="alert"
    >
      <div className="flex-1">{message}</div>
      <button
        onClick={onClose}
        className="ml-4 text-xl font-bold focus:outline-none"
        aria-label="Close notification"
      >
        &times;
      </button>
    </div>
  );
};


const PaymentPage = () => {
  const navigate = useNavigate();
  const [toast, setToast] = useState({ message: "", type: "success", visible: false });


  const tuitionFee = 1;
  const registrationFee = 0;
  const bookFee = 0;
  const medicalInsurance = 0;
  const miscellaneous = 0;
  const totalFee = tuitionFee + registrationFee + bookFee + medicalInsurance + miscellaneous;
  const maxUpiLimit = 50000;

  const [formData, setFormData] = useState({
    name: "",
    cardNumber: "",
    expiry: "",
    cvv: "",
  });

  const [installmentOption, setInstallmentOption] = useState("full"); // full | part
  const [paidAmount, setPaidAmount] = useState(0);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

 const handlePayment = async (e) => {
  e.preventDefault();

  try {
    const amountToPay =
      installmentOption === "full"
        ? totalFee - paidAmount
        : Math.min(maxUpiLimit, totalFee - paidAmount);

    const newPaidAmount = paidAmount + amountToPay;

    if (newPaidAmount > totalFee) {
      setToast({
        message: "⚠️ You’re trying to overpay. Please adjust installments.",
        type: "error",
        visible: true,
      });
      return;
    }

    // 🔹 CALL BACKEND PAYMENT API
    const res = await fetch("http://localhost:5000/payment", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        amountPaid: amountToPay,
        totalFee,
        remaining: totalFee - newPaidAmount,
        paymentMode: installmentOption,
      }),
    });

    if (!res.ok) throw new Error("Payment failed");

    const result = await res.json();

    setPaidAmount(newPaidAmount);

    setToast({
      message: `✅ Paid ₹${amountToPay}. Receipt generated.`,
      type: "success",
      visible: true,
    });

    // 🔹 AUTO DOWNLOAD RECEIPT
    window.open(result.receiptUrl, "_blank");

    // 🔹 FINAL PAYMENT → LOGOUT
    if (newPaidAmount >= totalFee) {
      setTimeout(() => {
        navigate("/login");
      }, 3500);
    }
  } catch (error) {
    console.error("Payment error:", error);
    setToast({
      message: "⚠️ Payment failed. Please try again.",
      type: "error",
      visible: true,
    });
  }
};


  return (
    <div className="min-h-screen bg-gradient-to-tr bg-gray-200 flex items-center justify-center p-8">
       {toast.visible && (
      <Toast
        message={toast.message}
        type={toast.type}
        onClose={() => setToast((t) => ({ ...t, visible: false }))}
      />
    )}

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="w-full max-w-3xl bg-white rounded-3xl shadow-2xl p-10 border border-pink-300"
      >
        <h2 className="text-4xl font-extrabold text-gradient-to-r from-pink-500 to-purple-600 mb-10 text-center select-none">
          Payment Details
        </h2>

        {/* Progress Bar */}
        <div className="flex items-center mb-8">
          <div className="flex-1 h-3 bg-gray-200 rounded-full mr-4 shadow-inner">
            <div
              className="h-3 bg-gradient-to-r from-pink-500 to-purple-600 rounded-full transition-all duration-500"
              style={{ width: `${(paidAmount / totalFee) * 100}%` }}
            ></div>
          </div>
          <span className="text-lg font-semibold text-pink-700 min-w-[3.5rem] text-right select-none">
            {Math.round((paidAmount / totalFee) * 100)}%
          </span>
        </div>

        {/* Fee Summary */}
        <div className="bg-pink-50 p-8 rounded-xl mb-8 shadow-inner border border-pink-200">
          <h3 className="text-2xl font-semibold mb-5 text-pink-700 tracking-wide">
            Fee Summary
          </h3>
          {[
            ["Tuition Fee", tuitionFee],
            ["Registration Fee", registrationFee],
            ["Book Bank Maintenance Fee", bookFee],
            ["Medical Insurance", medicalInsurance],
            ["Miscellaneous", miscellaneous],
          ].map(([label, amount]) => (
            <div key={label} className="flex justify-between text-pink-900 mb-3 font-medium">
              <span>{label}</span>
              <span>₹ {amount}</span>
            </div>
          ))}
          <div className="border-t border-pink-300 pt-4 flex justify-between font-extrabold text-pink-600 text-xl">
            <span>Total</span>
            <span>₹ {totalFee}</span>
          </div>
          <div className="mt-3 text-sm font-semibold text-pink-500 select-none">
            ✅ Paid: ₹{paidAmount} | ⏳ Remaining: ₹{totalFee - paidAmount}
          </div>
        </div>

        {/* Installment Option */}
        <div className="bg-pink-50 rounded-xl p-6 mb-8 border border-pink-200 shadow-inner">
          <h3 className="text-xl font-semibold mb-5 text-pink-700 tracking-wide select-none">
            Choose Payment Option
          </h3>
          <div className="flex gap-10 text-pink-800 font-semibold text-lg">
            <label className="flex items-center gap-4 cursor-pointer hover:text-pink-600 transition">
              <input
                type="radio"
                name="installment"
                value="full"
                checked={installmentOption === "full"}
                onChange={(e) => setInstallmentOption(e.target.value)}
                className="accent-pink-600 w-6 h-6 cursor-pointer"
              />
              Full Payment (₹{totalFee - paidAmount})
            </label>
            <label className="flex items-center gap-4 cursor-pointer hover:text-pink-600 transition">
              <input
                type="radio"
                name="installment"
                value="part"
                checked={installmentOption === "part"}
                onChange={(e) => setInstallmentOption(e.target.value)}
                className="accent-pink-600 w-6 h-6 cursor-pointer"
              />
              Installment (Max ₹{maxUpiLimit})
            </label>
          </div>
        </div>

        {/* Payment Form */}
        <form onSubmit={handlePayment} className="grid gap-8">
          <div>
            <label className="block mb-3 font-bold text-pink-700 text-lg select-none">
              Name on Card
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-5 py-4 rounded-2xl border border-pink-300 focus:outline-none focus:ring-4 focus:ring-pink-400 transition shadow-lg"
              placeholder="Pratibha Maurya"
              required
            />
          </div>

          <div>
            <label className="block mb-3 font-bold text-pink-700 text-lg select-none">
              Card Number
            </label>
            <input
              type="text"
              name="cardNumber"
              value={formData.cardNumber}
              onChange={handleChange}
              className="w-full px-5 py-4 rounded-2xl border border-pink-300 focus:outline-none focus:ring-4 focus:ring-pink-400 transition shadow-lg"
              placeholder="1234 5678 9012 3456"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-8">
            <div>
              <label className="block mb-3 font-bold text-pink-700 text-lg select-none">
                Expiry
              </label>
              <input
                type="text"
                name="expiry"
                value={formData.expiry}
                onChange={handleChange}
                className="w-full px-5 py-4 rounded-2xl border border-pink-300 focus:outline-none focus:ring-4 focus:ring-pink-400 transition shadow-lg"
                placeholder="MM/YY"
                required
              />
            </div>
            <div>
              <label className="block mb-3 font-bold text-pink-700 text-lg select-none">
                CVV
              </label>
              <input
                type="password"
                name="cvv"
                value={formData.cvv}
                onChange={handleChange}
                className="w-full px-5 py-4 rounded-2xl border border-pink-300 focus:outline-none focus:ring-4 focus:ring-pink-400 transition shadow-lg"
                placeholder="***"
                required
              />
            </div>
          </div>

          {/* Buttons */}
          <div className="flex gap-6 mt-10">
            <button
              type="button"
              className="flex-1 bg-pink-300 text-pink-900 py-4 rounded-2xl font-semibold hover:bg-pink-400 transition shadow-md"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 bg-gradient-to-r from-pink-600 to-purple-700 text-white py-4 rounded-2xl font-extrabold shadow-xl hover:from-pink-700 hover:to-purple-800 transition"
            >
              Pay ₹
              {installmentOption === "full"
                ? totalFee - paidAmount
                : Math.min(maxUpiLimit, totalFee - paidAmount)}
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

export default PaymentPage;
