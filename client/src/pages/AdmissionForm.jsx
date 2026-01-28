import { useState, useEffect } from "react";
import validateAdmissionForm from "../utils/validateAdmissionForm";
import { motion, AnimatePresence } from "framer-motion";
import { FaRegEye } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";

const AdmissionForm = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    fatherName: "",
    motherName: "",
    dob: "",
    email: "",
    phone: "",
    gender: "",
    nationality: "",
    guardianName: "",
    guardianPhone: "",
    highSchoolRollNo: "",
    interRollNo: "",
    highSchoolMarks: "",
    interMarks: "",
    physicsMarks: "",
    chemistryMarks: "",
    mathMarks: "",
    state: "",
    district:"",
    tahaseel:"",
    pincode: "",
    address: "",
    jeeApplicationNo:"",
    rankType:"",
    rank:"",
    roundNumber:"",
    allotedOption:"",
    allotedInstitue:"",
    allotedCourse: "",
    stream: "",
    allotedCategory: "",
    allotedQuota: "",
    seatGender: "",
  });

  const [isSaved, setIsSaved] = useState(false);
  const [activeTab, setActiveTab] = useState("personal");
  const [errors, setErrors] = useState({});
  const [files, setFiles] = useState({});
  const navigate = useNavigate();

 const handleFileChange = (e, field) => {
  const file = e.target.files[0];
  if (!file) return;

  if (file.type !== "application/pdf") {
    alert("Only PDF files are allowed!");
    e.target.value = ""; // reset input
    return;
  }
  setFiles({ ...files, [field]: file });
};

  const documents = [
    { name: "10th Marksheet", field: "tenth" , optional: true },
    { name: "12th Marksheet", field: "twelfth" , optional: true },
    { name: "Domicile Certificate", field: "domicile" , optional: true },
    { name: "Caste Certificate", field: "caste" , optional: true },
    { name: "Income Certificate", field: "income" , optional: true },
    { name: "Character Certificate", field: "character", optional: true  },
    { name: "Transfer Certificate", field: "transfer", optional: true  },
    { name: "Health Certificate", field: "health" , optional: true },
    {
      name: "Counselling Physical Reporting Certificate",
      field: "counselling",
       optional: true 
    },
    { name: "JEE Admit Card", field: "jeeAdmit", optional: true  },
    { name: "JEE Result", field: "jeeResult", optional: true  },
    { name: "Photo", field: "photo" , optional: true },
    { name: "Signature", field: "sign" , optional: true },
    {
      name: "Migration Certificate (Optional)",
      field: "migration",
      optional: true,
    },
    { name: "Gap Certificate (Optional)", field: "gap", optional: true },
  ];

  // Handle Input Change
  const handleChange = (e) => {
  const { name, value } = e.target;
  setFormData((prev) => ({
    ...prev,
    [name]: value,
  }));
};

  //  for next button
  const tabs = ["personal", "academic", "counseling", "address", "documents"];
  const requiredFields = {
  personal: ["fullName", "fatherName", "motherName", "dob", "email", "phone", "gender", "nationality","guardianName", "guardianPhone"],
  academic: ["highSchoolRollNo", "interRollNo", "highSchoolMarks", "interMarks","physicsMarks","chemistryMarks","mathMarks"],
  counseling: ["jeeApplicationNo","rankType","rank","roundNumber","allotedOption","allotedInstitue","allotedCourse","stream","allotedCategory","allotedQuota","seatGender"],
  address: ["address", "district", "state", "pincode","tahaseel"],
  documents: documents.filter(doc => !doc.optional).map(doc => doc.field), // all required documents
};

  const handleNext = () => {
  if (!isSaved) {
    alert("Please save your details first ❗");
    return;
  }

  const fieldsToCheck = requiredFields[activeTab];
  let errorsForTab = {};

  if (activeTab === "documents") {
    // check files
    fieldsToCheck.forEach((field) => {
      if (!files[field]) {
        errorsForTab[field] = `Please upload ${documents.find(d => d.field === field).name}`;
      }
    });
  } else {
    // check formData fields
    fieldsToCheck.forEach((field) => {
      if (!formData[field] || formData[field].trim() === "") {
        errorsForTab[field] = "This field is required";
      }
    });
  }

  if (Object.keys(errorsForTab).length > 0) {
    setErrors(errorsForTab);
    alert(
      "Please fill/upload all required fields:\n" +
        Object.values(errorsForTab).map(msg => `- ${msg}`).join("\n")
    );
    return; // stop next
  }

  // Clear errors for this tab
  setErrors({});

  // Move to next tab
  const currentIndex = tabs.indexOf(activeTab);
  if (currentIndex < tabs.length - 1) {
    setActiveTab(tabs[currentIndex + 1]);
  } else {
    navigate("/payment");
  }
};



  // fetch data
  const fetchPersonalData = async () => {
  try {
    const res = await fetch("http://localhost:5000/get-personal");
    const data = await res.json();
    return data;
  } catch (err) {
    console.error("Fetch error:", err);
    return {};
  }
};

useEffect(() => {
  fetchPersonalData().then((data) => {
    if (Object.keys(data).length > 0) {
      setFormData(data);
      setIsSaved(true);
    }
  });
}, []);

  // Save button
const API_BASE = process.env.NODE_ENV === "production" ? "" : "http://localhost:5000";

const savePersonalData = async (data) => {
  console.log("Attempting savePersonalData, payload keys:", Object.keys(data));
  try {
    const res = await fetch(`${API_BASE}/save-personal`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    // Try to parse JSON safely
    let json = null;
    try { json = await res.json(); } catch (e) { json = null; }

    console.log("save-personal response:", res.status, json);
    return { ok: res.ok, status: res.status, body: json };
  } catch (err) {
    console.error("Network / fetch error in savePersonalData:", err);
    return { ok: false, error: err.message };
  }
};

const handleSave = async () => {
  // quick client-side validation logging (optional)
  console.log("handleSave called. formData keys:", Object.keys(formData));
  const result = await savePersonalData(formData);

  if (result.ok) {
    setIsSaved(true);
    alert("✅ Details saved successfully!");
    // optionally setFormData(result.body.merged) to sync state with saved file
    if (result.body && result.body.merged) setFormData(result.body.merged);
  } else {
    console.error("Save failed:", result);
    alert(
      `❌ Failed to save details. ${result.body?.message || result.error || "Check server logs."}`
    );
  }
};


  // Handle Submit
  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validateAdmissionForm(formData);
    if (Object.keys(validationErrors).length === 0) {
      console.log("Collected JSON Data:", formData);
      alert("Form submitted successfully!");
    } else {
      setErrors(validationErrors);
    }
  };

  // Validation
  const validate = () => {
    let newErrors = {};
    if (!formData.fullName) newErrors.fullName = "Full Name is required";
    if (!formData.dob) newErrors.dob = "Date of Birth is required";
    if (!formData.email.includes("@")) newErrors.email = "Enter a valid email";
    if (formData.phone.length !== 10)
      newErrors.phone = "Phone number must be 10 digits";
    if (!formData.course) newErrors.course = "Select a course";
    return newErrors;
  };

  // progress bar
  const progressBar = ((tabs.indexOf(activeTab) + 1) / tabs.length) * 100;

  const tabConfig = [
    { id: "personal", label: "Personal", icon: "👤" },
    { id: "academic", label: "Academic", icon: "🎓" },
    { id: "counseling", label: "Counseling", icon: "📋" },
    { id: "address", label: "Address", icon: "🏠" },
    { id: "documents", label: "Documents", icon: "📄" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Hero Section */}
      <div className="relative w-full h-80 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-900/90 via-blue-900/80 to-purple-900/90 z-10"></div>
        <div className="absolute inset-0 flex justify-center items-center z-20">
          <motion.h1 
            className="text-6xl md:text-8xl font-bold bg-gradient-to-r from-orange-400 via-amber-300 to-yellow-300 bg-clip-text text-transparent text-center px-4"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Admission Form
          </motion.h1>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-8 -mt-16 relative z-30">
        {/* Progress Card */}
        <motion.div 
          className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg p-6 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-800">Application Progress</h2>
            <span className="text-2xl font-bold text-indigo-600">{Math.round(progressBar)}%</span>
          </div>
          <div className="relative">
            <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full shadow-sm"
                style={{ width: `${progressBar}%` }}
                initial={{ width: 0 }}
                animate={{ width: `${progressBar}%` }}
                transition={{ duration: 0.6, ease: "easeOut" }}
              />
            </div>
          </div>
        </motion.div>

        {/* Tabs Navigation */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-2 mb-8">
          <div className="flex flex-wrap gap-2">
            {tabConfig.map((tab) => (
              <motion.button
                key={tab.id}
                className={`relative flex-1 min-w-[120px] py-4 px-6 rounded-xl font-medium transition-all duration-300 ${
                  activeTab === tab.id
                    ? "bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg"
                    : "text-gray-600 hover:bg-gray-100 hover:text-gray-800"
                }`}
                onClick={() => setActiveTab(tab.id)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="flex items-center justify-center gap-2">
                  <span className="text-lg">{tab.icon}</span>
                  <span className="font-semibold">{tab.label}</span>
                </div>
                {activeTab === tab.id && (
                  <motion.div
                    className="absolute inset-0 rounded-xl bg-white/20"
                    layoutId="activeTab"
                    transition={{ duration: 0.3 }}
                  />
                )}
              </motion.button>
            ))}
          </div>
        </div>

        {/* Form Content */}
        <AnimatePresence mode="wait">
          <motion.div 
            key={activeTab}
            className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl p-8"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            {activeTab === "personal" && (
              <div>
                <div className="flex items-center gap-3 mb-8">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-r from-indigo-500 to-purple-600 flex items-center justify-center">
                    <span className="text-white text-xl">👤</span>
                  </div>
                  <h2 className="text-2xl font-bold text-gray-800">Personal Details</h2>
                </div>
                <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Full Name */}
                  <div className="space-y-2">
                    <label className="block text-sm font-semibold text-gray-700">
                      Full Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleChange}
                      placeholder="Enter your full name"
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl bg-white/70 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 transition-all duration-200 outline-none"
                    />
                  </div>

                  {/* Father Name */}
                  <div className="space-y-2">
                    <label className="block text-sm font-semibold text-gray-700">
                      Father's Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="fatherName"
                      value={formData.fatherName}
                      onChange={handleChange}
                      placeholder="Enter father's name"
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl bg-white/70 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 transition-all duration-200 outline-none"
                    />
                  </div>

                  {/* Mother Name */}
                  <div className="space-y-2">
                    <label className="block text-sm font-semibold text-gray-700">
                      Mother's Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="motherName"
                      value={formData.motherName}
                      onChange={handleChange}
                      placeholder="Enter mother's name"
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl bg-white/70 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 transition-all duration-200 outline-none"
                    />
                  </div>

                  {/* Email */}
                  <div className="space-y-2">
                    <label className="block text-sm font-semibold text-gray-700">
                      Email Address <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="your.email@example.com"
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl bg-white/70 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 transition-all duration-200 outline-none"
                    />
                  </div>

                  {/* Phone */}
                  <div className="space-y-2">
                    <label className="block text-sm font-semibold text-gray-700">
                      Phone Number <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="Enter 10-digit mobile number"
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl bg-white/70 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 transition-all duration-200 outline-none"
                    />
                  </div>

                  {/* Nationality */}
                  <div className="space-y-2">
                    <label className="block text-sm font-semibold text-gray-700">
                      Nationality <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="nationality"
                      value={formData.nationality}
                      onChange={handleChange}
                      placeholder="Indian"
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl bg-white/70 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 transition-all duration-200 outline-none"
                    />
                  </div>

                  {/* Date of Birth */}
                  <div className="space-y-2">
                    <label className="block text-sm font-semibold text-gray-700">
                      Date of Birth <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="date"
                      name="dob"
                      value={formData.dob}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl bg-white/70 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 transition-all duration-200 outline-none"
                    />
                  </div>

                  {/* Marital Status */}
                  <div className="space-y-2">
                    <label className="block text-sm font-semibold text-gray-700">
                      Marital Status <span className="text-red-500">*</span>
                    </label>
                    <select
                      name="marital"
                      value={formData.marital}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl bg-white/70 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 transition-all duration-200 outline-none"
                    >
                      <option value="">Select marital status</option>
                      <option value="yes">Married</option>
                      <option value="no">Unmarried</option>
                    </select>
                  </div>

                  {/* Gender */}
                  <div className="space-y-2">
                    <label className="block text-sm font-semibold text-gray-700">
                      Gender <span className="text-red-500">*</span>
                    </label>
                    <select
                      name="gender"
                      value={formData.gender}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl bg-white/70 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 transition-all duration-200 outline-none"
                    >
                      <option value="">Select gender</option>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                      <option value="other">Other</option>
                    </select>
                  </div>

                  {/* Guardian Name */}
                  <div className="space-y-2">
                    <label className="block text-sm font-semibold text-gray-700">
                      Guardian Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="guardianName"
                      value={formData.guardianName}
                      onChange={handleChange}
                      placeholder="Guardian's name"
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl bg-white/70 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 transition-all duration-200 outline-none"
                    />
                  </div>

                  {/* Guardian Phone */}
                  <div className="space-y-2">
                    <label className="block text-sm font-semibold text-gray-700">
                      Guardian Phone <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="tel"
                      name="guardianPhone"
                      value={formData.guardianPhone}
                      onChange={handleChange}
                      placeholder="Guardian's phone number"
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl bg-white/70 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 transition-all duration-200 outline-none"
                    />
                  </div>
                </form>
                
                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 mt-8 pt-6 border-t border-gray-200">
                  <motion.button
                    type="button"
                    onClick={handleSave}
                    className="flex-1 py-3 px-6 bg-gradient-to-r from-green-600 to-green-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
                    whileTap={{ scale: 0.95 }}
                  >
                    💾 Save Details
                  </motion.button>
                  <motion.button
                    type="button"
                    onClick={handleNext}
                    disabled={!isSaved}
                    className={`flex-1 py-3 px-6 font-semibold rounded-xl shadow-lg transition-all duration-200 ${
                      isSaved 
                        ? "bg-gradient-to-r from-indigo-600 to-purple-600 text-white hover:shadow-xl transform hover:scale-105" 
                        : "bg-gray-300 text-gray-500 cursor-not-allowed"
                    }`}
                    whileTap={isSaved ? { scale: 0.95 } : {}}
                  >
                    Next Step →
                  </motion.button>
                </div>
              </div>
            )}

            {activeTab === "academic" && (
              <div>
                <div className="flex items-center gap-3 mb-8">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-r from-indigo-500 to-purple-600 flex items-center justify-center">
                    <span className="text-white text-xl">🎓</span>
                  </div>
                  <h2 className="text-2xl font-bold text-gray-800">Academic Details</h2>
                </div>
                <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* 10th Roll No */}
                  <div className="space-y-2">
                    <label className="block text-sm font-semibold text-gray-700">
                      10th Roll Number <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="number"
                      name="highSchoolRollNo"
                      value={formData.highSchoolRollNo}
                      onChange={handleChange}
                      placeholder="Enter 10th roll number"
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl bg-white/70 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 transition-all duration-200 outline-none"
                    />
                  </div>

                  {/* 10th Marks */}
                  <div className="space-y-2">
                    <label className="block text-sm font-semibold text-gray-700">
                      10th Marks (%) <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="number"
                      name="highSchoolMarks"
                      value={formData.highSchoolMarks}
                      onChange={handleChange}
                      placeholder="Enter percentage"
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl bg-white/70 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 transition-all duration-200 outline-none"
                    />
                  </div>

                  {/* 12th Roll No */}
                  <div className="space-y-2">
                    <label className="block text-sm font-semibold text-gray-700">
                      12th Roll Number <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="number"
                      name="interRollNo"
                      value={formData.interRollNo}
                      onChange={handleChange}
                      placeholder="Enter 12th roll number"
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl bg-white/70 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 transition-all duration-200 outline-none"
                    />
                  </div>

                  {/* 12th Marks PCM */}
                  <div className="space-y-2">
                    <label className="block text-sm font-semibold text-gray-700">
                      12th PCM Marks (%) <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="number"
                      name="interMarks"
                      value={formData.interMarks}
                      onChange={handleChange}
                      placeholder="Enter PCM percentage"
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl bg-white/70 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 transition-all duration-200 outline-none"
                    />
                  </div>

                  {/* Physics Marks */}
                  <div className="space-y-2">
                    <label className="block text-sm font-semibold text-gray-700">
                      Physics Marks (%) <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="number"
                      name="physicsMarks"
                      value={formData.physicsMarks}
                      onChange={handleChange}
                      placeholder="Enter physics percentage"
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl bg-white/70 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 transition-all duration-200 outline-none"
                    />
                  </div>

                  {/* Chemistry Marks */}
                  <div className="space-y-2">
                    <label className="block text-sm font-semibold text-gray-700">
                      Chemistry Marks (%) <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="number"
                      name="chemistryMarks"
                      value={formData.chemistryMarks}
                      onChange={handleChange}
                      placeholder="Enter chemistry percentage"
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl bg-white/70 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 transition-all duration-200 outline-none"
                    />
                  </div>

                  {/* Math Marks */}
                  <div className="space-y-2">
                    <label className="block text-sm font-semibold text-gray-700">
                      Mathematics Marks (%) <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="number"
                      name="mathMarks"
                      value={formData.mathMarks}
                      onChange={handleChange}
                      placeholder="Enter math percentage"
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl bg-white/70 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 transition-all duration-200 outline-none"
                    />
                  </div>
                </form>
                
                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 mt-8 pt-6 border-t border-gray-200">
                  <motion.button
                    type="button"
                    onClick={handleSave}
                    className="flex-1 py-3 px-6 bg-gradient-to-r from-green-600 to-green-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
                    whileTap={{ scale: 0.95 }}
                  >
                    💾 Save Details
                  </motion.button>
                  <motion.button
                    type="button"
                    onClick={handleNext}
                    disabled={!isSaved}
                    className={`flex-1 py-3 px-6 font-semibold rounded-xl shadow-lg transition-all duration-200 ${
                      isSaved 
                        ? "bg-gradient-to-r from-indigo-600 to-purple-600 text-white hover:shadow-xl transform hover:scale-105" 
                        : "bg-gray-300 text-gray-500 cursor-not-allowed"
                    }`}
                    whileTap={isSaved ? { scale: 0.95 } : {}}
                  >
                    Next Step →
                  </motion.button>
                </div>
              </div>
            )}

            {activeTab === "counseling" && (
              <div>
                <div className="flex items-center gap-3 mb-8">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-r from-indigo-500 to-purple-600 flex items-center justify-center">
                    <span className="text-white text-xl">📋</span>
                  </div>
                  <h2 className="text-2xl font-bold text-gray-800">Counseling Details</h2>
                </div>
                <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* JEE Application No */}
                  <div className="space-y-2">
                    <label className="block text-sm font-semibold text-gray-700">
                      JEE Application Number <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="number"
                      name="jeeApplicationNo"
                      value={formData.jeeApplicationNo}
                      onChange={handleChange}
                      placeholder="Enter JEE application number"
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl bg-white/70 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 transition-all duration-200 outline-none"
                    />
                  </div>

                  {/* Rank Type */}
                  <div className="space-y-2">
                    <label className="block text-sm font-semibold text-gray-700">
                      Rank Type <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="rankType"
                      value={formData.rankType}
                      onChange={handleChange}
                      placeholder="Enter rank type"
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl bg-white/70 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 transition-all duration-200 outline-none"
                    />
                  </div>

                  {/* Rank */}
                  <div className="space-y-2">
                    <label className="block text-sm font-semibold text-gray-700">
                      Rank <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="number"
                      name="rank"
                      value={formData.rank}
                      onChange={handleChange}
                      placeholder="Enter your rank"
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl bg-white/70 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 transition-all duration-200 outline-none"
                    />
                  </div>

                  {/* Round Number */}
                  <div className="space-y-2">
                    <label className="block text-sm font-semibold text-gray-700">
                      Round Number <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="number"
                      name="roundNumber"
                      value={formData.roundNumber}
                      onChange={handleChange}
                      placeholder="Enter round number"
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl bg-white/70 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 transition-all duration-200 outline-none"
                    />
                  </div>

                  {/* Allotted Option */}
                  <div className="space-y-2">
                    <label className="block text-sm font-semibold text-gray-700">
                      Allotted Option <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="number"
                      name="allotedOption"
                      value={formData.allotedOption}
                      onChange={handleChange}
                      placeholder="Enter allotted option"
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl bg-white/70 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 transition-all duration-200 outline-none"
                    />
                  </div>

                  {/* Allotted Institute */}
                  <div className="space-y-2">
                    <label className="block text-sm font-semibold text-gray-700">
                      Allotted Institute <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="allotedInstitue"
                      value={formData.allotedInstitue}
                      onChange={handleChange}
                      placeholder="Enter allotted institute"
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl bg-white/70 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 transition-all duration-200 outline-none"
                    />
                  </div>

                  {/* Allotted Course */}
                  <div className="space-y-2">
                    <label className="block text-sm font-semibold text-gray-700">
                      Allotted Course <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="allotedCourse"
                      value={formData.allotedCourse}
                      onChange={handleChange}
                      placeholder="Enter allotted course"
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl bg-white/70 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 transition-all duration-200 outline-none"
                    />
                  </div>

                  {/* Stream */}
                  <div className="space-y-2">
                    <label className="block text-sm font-semibold text-gray-700">
                      Stream <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="stream"
                      value={formData.stream}
                      onChange={handleChange}
                      placeholder="Enter stream"
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl bg-white/70 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 transition-all duration-200 outline-none"
                    />
                  </div>

                  {/* Allotted Category */}
                  <div className="space-y-2">
                    <label className="block text-sm font-semibold text-gray-700">
                      Allotted Category <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="allotedCategory"
                      value={formData.allotedCategory}
                      onChange={handleChange}
                      placeholder="Enter allotted category"
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl bg-white/70 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 transition-all duration-200 outline-none"
                    />
                  </div>

                  {/* Allotted Quota */}
                  <div className="space-y-2">
                    <label className="block text-sm font-semibold text-gray-700">
                      Allotted Quota <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="allotedQuota"
                      value={formData.allotedQuota}
                      onChange={handleChange}
                      placeholder="Enter allotted quota"
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl bg-white/70 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 transition-all duration-200 outline-none"
                    />
                  </div>

                  {/* Seat Gender */}
                  <div className="space-y-2">
                    <label className="block text-sm font-semibold text-gray-700">
                      Seat Gender <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="seatGender"
                      value={formData.seatGender}
                      onChange={handleChange}
                      placeholder="Enter seat gender"
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl bg-white/70 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 transition-all duration-200 outline-none"
                    />
                  </div>
                </form>
                
                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 mt-8 pt-6 border-t border-gray-200">
                  <motion.button
                    type="button"
                    onClick={handleSave}
                    className="flex-1 py-3 px-6 bg-gradient-to-r from-green-600 to-green-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
                    whileTap={{ scale: 0.95 }}
                  >
                    💾 Save Details
                  </motion.button>
                  <motion.button
                    type="button"
                    onClick={handleNext}
                    disabled={!isSaved}
                    className={`flex-1 py-3 px-6 font-semibold rounded-xl shadow-lg transition-all duration-200 ${
                      isSaved 
                        ? "bg-gradient-to-r from-indigo-600 to-purple-600 text-white hover:shadow-xl transform hover:scale-105" 
                        : "bg-gray-300 text-gray-500 cursor-not-allowed"
                    }`}
                    whileTap={isSaved ? { scale: 0.95 } : {}}
                  >
                    Next Step →
                  </motion.button>
                </div>
              </div>
            )}

            {activeTab === "address" && (
              <div>
                <div className="flex items-center gap-3 mb-8">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-r from-indigo-500 to-purple-600 flex items-center justify-center">
                    <span className="text-white text-xl">🏠</span>
                  </div>
                  <h2 className="text-2xl font-bold text-gray-800">Address Details</h2>
                </div>
                <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* State */}
                  <div className="space-y-2">
                    <label className="block text-sm font-semibold text-gray-700">
                      State <span className="text-red-500">*</span>
                    </label>
                    <select
                      name="state"
                      value={formData.state}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl bg-white/70 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 transition-all duration-200 outline-none"
                    >
                      <option value="">Select State</option>
                      <option value="andhra-pradesh">Andhra Pradesh</option>
                      <option value="arunachal-pradesh">Arunachal Pradesh</option>
                      <option value="assam">Assam</option>
                      <option value="bihar">Bihar</option>
                      <option value="chhattisgarh">Chhattisgarh</option>
                      <option value="goa">Goa</option>
                      <option value="gujarat">Gujarat</option>
                      <option value="haryana">Haryana</option>
                      <option value="himachal-pradesh">Himachal Pradesh</option>
                      <option value="jharkhand">Jharkhand</option>
                      <option value="karnataka">Karnataka</option>
                      <option value="kerala">Kerala</option>
                      <option value="madhya-pradesh">Madhya Pradesh</option>
                      <option value="maharashtra">Maharashtra</option>
                      <option value="manipur">Manipur</option>
                      <option value="meghalaya">Meghalaya</option>
                      <option value="mizoram">Mizoram</option>
                      <option value="nagaland">Nagaland</option>
                      <option value="odisha">Odisha</option>
                      <option value="punjab">Punjab</option>
                      <option value="rajasthan">Rajasthan</option>
                      <option value="sikkim">Sikkim</option>
                      <option value="tamil-nadu">Tamil Nadu</option>
                      <option value="telangana">Telangana</option>
                      <option value="tripura">Tripura</option>
                      <option value="uttar-pradesh">Uttar Pradesh</option>
                      <option value="uttarakhand">Uttarakhand</option>
                      <option value="west-bengal">West Bengal</option>
                    </select>
                  </div>

                  {/* District */}
                  <div className="space-y-2">
                    <label className="block text-sm font-semibold text-gray-700">
                      District <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="district"
                      value={formData.district}
                      onChange={handleChange}
                      placeholder="Enter district name"
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl bg-white/70 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 transition-all duration-200 outline-none"
                    />
                  </div>

                  {/* Tehsil */}
                  <div className="space-y-2">
                    <label className="block text-sm font-semibold text-gray-700">
                      Tehsil <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="tahaseel"
                      value={formData.tahaseel}
                      onChange={handleChange}
                      placeholder="Enter tehsil name"
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl bg-white/70 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 transition-all duration-200 outline-none"
                    />
                  </div>

                  {/* Pincode */}
                  <div className="space-y-2">
                    <label className="block text-sm font-semibold text-gray-700">
                      Pincode <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="number"
                      name="pincode"
                      value={formData.pincode}
                      onChange={handleChange}
                      placeholder="Enter 6-digit pincode"
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl bg-white/70 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 transition-all duration-200 outline-none"
                    />
                  </div>

                  {/* Address */}
                  <div className="space-y-2 md:col-span-2">
                    <label className="block text-sm font-semibold text-gray-700">
                      Full Address <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                      placeholder="Enter complete address with house/flat number, street, locality"
                      rows={4}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl bg-white/70 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 transition-all duration-200 outline-none resize-none"
                    />
                  </div>
                </form>
                
                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 mt-8 pt-6 border-t border-gray-200">
                  <motion.button
                    type="button"
                    onClick={handleSave}
                    className="flex-1 py-3 px-6 bg-gradient-to-r from-green-600 to-green-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
                    whileTap={{ scale: 0.95 }}
                  >
                    💾 Save Details
                  </motion.button>
                  <motion.button
                    type="button"
                    onClick={handleNext}
                    disabled={!isSaved}
                    className={`flex-1 py-3 px-6 font-semibold rounded-xl shadow-lg transition-all duration-200 ${
                      isSaved 
                        ? "bg-gradient-to-r from-indigo-600 to-purple-600 text-white hover:shadow-xl transform hover:scale-105" 
                        : "bg-gray-300 text-gray-500 cursor-not-allowed"
                    }`}
                    whileTap={isSaved ? { scale: 0.95 } : {}}
                  >
                    Next Step →
                  </motion.button>
                </div>
              </div>
            )}

            {activeTab === "documents" && (
              <div>
                <div className="flex items-center gap-3 mb-8">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-r from-indigo-500 to-purple-600 flex items-center justify-center">
                    <span className="text-white text-xl">📄</span>
                  </div>
                  <h2 className="text-2xl font-bold text-gray-800">Document Uploads</h2>
                </div>
                
                <div className="space-y-4">
                  {documents.map((doc) => (
                    <motion.div
                      key={doc.field}
                      className="bg-white/50 border-2 border-gray-200 rounded-xl p-6 hover:border-indigo-300 transition-all duration-200"
                      whileHover={{ y: -2 }}
                    >
                      <div className="flex flex-col md:flex-row md:items-center gap-4">
                        {/* Document Label */}
                        <div className="flex-1">
                          <label className="text-base font-semibold text-gray-800">
                            {doc.name}
                            {!doc.optional && <span className="text-red-500 ml-1">*</span>}
                          </label>
                          {doc.optional && (
                            <span className="text-sm text-gray-500 ml-2">(Optional)</span>
                          )}
                        </div>

                        {/* File Input */}
                        <div className="flex-1">
                          <input
                            type="file"
                            accept="application/pdf"
                            required={!doc.optional}
                            className={`w-full px-4 py-3 border-2 rounded-xl bg-white/80 transition-all duration-200 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-indigo-50 file:text-indigo-700 file:font-medium hover:file:bg-indigo-100 ${
                              errors[doc.field] 
                                ? "border-red-300 focus:border-red-500 focus:ring-red-200" 
                                : "border-gray-300 focus:border-indigo-500 focus:ring-indigo-200"
                            }`}
                            onChange={(e) => handleFileChange(e, doc.field)}
                          />
                        </div>

                        {/* View Button */}
                        {files[doc.field] && (
                          <motion.a
                            href={URL.createObjectURL(files[doc.field])}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center justify-center w-12 h-12 bg-indigo-100 hover:bg-indigo-200 text-indigo-600 rounded-xl transition-colors duration-200"
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.95 }}
                          >
                            <FaRegEye className="w-5 h-5" />
                          </motion.a>
                        )}
                      </div>

                      {/* Error Message */}
                      {errors[doc.field] && (
                        <motion.p
                          className="text-red-500 text-sm mt-2 flex items-center gap-1"
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                        >
                          ⚠️ {errors[doc.field]}
                        </motion.p>
                      )}

                      {/* Success Indicator */}
                      {files[doc.field] && (
                        <motion.p
                          className="text-green-600 text-sm mt-2 flex items-center gap-1"
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                        >
                          ✅ File uploaded successfully
                        </motion.p>
                      )}
                    </motion.div>
                  ))}
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 mt-8 pt-6 border-t border-gray-200">
                  <motion.button
                    type="button"
                    onClick={handleSave}
                    className="flex-1 py-3 px-6 bg-gradient-to-r from-green-600 to-green-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
                    whileTap={{ scale: 0.95 }}
                  >
                    💾 Save Documents
                  </motion.button>
                  <motion.button
                    type="button"
                    onClick={handleNext}
                    disabled={!isSaved}
                    className={`flex-1 py-3 px-6 font-semibold rounded-xl shadow-lg transition-all duration-200 ${
                      isSaved 
                        ? "bg-gradient-to-r from-indigo-600 to-purple-600 text-white hover:shadow-xl transform hover:scale-105" 
                        : "bg-gray-300 text-gray-500 cursor-not-allowed"
                    }`}
                    whileTap={isSaved ? { scale: 0.95 } : {}}
                  >
                    Complete Application 🎉
                  </motion.button>
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default AdmissionForm;