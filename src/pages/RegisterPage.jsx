import React, { useState, useEffect } from "react";
import { registerUser } from "../services/api";
import axios from "axios";
import SEO from "../components/SEO";
import { mmcEventJsonLd } from "../config/siteConfig";

export default function RegistrationPage() {
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const BASE_URL = import.meta.env.VITE_API_BASE_URL;

  const scrollToFirstError = (errors) => {
    const firstErrorField = Object.keys(errors)[0];

    const element = document.querySelector(`[name="${firstErrorField}"]`);

    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });

      element.focus();
    }
  };

  useEffect(() => {
    axios
      .get(`${BASE_URL}/`)
      .then(() => console.log("Backend is awake"))
      .catch(() => console.log("Could not ping backend"));
  }, [BASE_URL]);

  useEffect(() => {
    requestAnimationFrame(() => {
      window.scrollTo({ top: 0, left: 0, behavior: "instant" });
    });
  }, []);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    church: "",
    firstTimer: "",
  });

  const validateForm = () => {
    const newErrors = {};
    if (!formData.firstName.trim())
      newErrors.firstName = "First name is required";
    if (!formData.lastName.trim()) newErrors.lastName = "Last name is required";
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Enter a valid email address";
    }
    if (!formData.phoneNumber.trim())
      newErrors.phoneNumber = "Phone number is required";
    if (!formData.church.trim()) newErrors.church = "Church name is required";
    if (!formData.firstTimer) newErrors.firstTimer = "Please select an option";
    return newErrors;
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    // Clear error for this field when user types
    if (errors[e.target.name]) {
      setErrors({ ...errors, [e.target.name]: "" });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const formErrors = validateForm();
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      scrollToFirstError(formErrors);
      return;
    }

    setErrors({});
    setLoading(true);

    registerUser(
      formData,
      (res) => {
        if (res.status === 201 && res.data.data) {
          setSubmitted(true);
          window.scrollTo({ top: 0, behavior: "smooth" });
          setFormData({
            firstName: "",
            lastName: "",
            email: "",
            phoneNumber: "",
            church: "",
            firstTimer: "",
          });
          setTimeout(() => setSubmitted(false), 5000);
          setErrorMessage("");
        } else {
          setErrorMessage("Registration failed. Please try again.");
        }
        setLoading(false);
      },
      (error) => {
        console.error("Registration failed:", error);
        window.scrollTo({ top: 0, behavior: "smooth" });
        const serverMsg =
          error.response?.data?.message ||
          "Something went wrong. Please try again.";
        setErrorMessage(serverMsg);
        setTimeout(() => setErrorMessage(""), 5000);
        setLoading(false);
      }
    );
  };

  return (
    <>
      <SEO
        title="Register for MMC 2026"
        description="Register for the Music Ministers' Conference (MMC) 2026, July 24th-26th in Enugu, Nigeria."
        path="/register"
        jsonLd={mmcEventJsonLd()}
      />
      <section className="py-8 bg-white">
        <main className="max-w-4xl px-4 py-6 mx-auto md:px-6">
          <div className="mb-6 ">
            <h2 className="text-2xl font-bold text-gray-800 md:text-3xl">
              Secure Your Spot
            </h2>
            <p className="mt-2 text-sm text-gray-600 md:text-base">
              Registration is quick and easy. Once submitted, you'll receive
              your confirmation and event details via email.
            </p>
          </div>
          <div className="mb-8 overflow-hidden rounded-lg shadow-md">
            <img
              src="/assets/mmclandscape.png"
              alt="MMC 2026 Conference Flyer"
              className="w-full object-cover max-h-[300px] md:max-h-[400px]"
              loading="eager"
            />
          </div>

          {/* Success Message */}
          {submitted && (
            <div className="px-4 py-3 mb-6 text-sm text-green-700 bg-green-100 border border-green-400 rounded-lg md:text-base">
              ✅ Registration successful! We'll send you more details via email.
            </div>
          )}

          {/* Error Message */}
          {errorMessage && (
            <div className="px-4 py-3 mb-6 text-sm text-red-700 bg-red-100 border border-red-400 rounded-lg md:text-base">
              ❌ {errorMessage}
            </div>
          )}

          {/* Registration Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid gap-5 md:grid-cols-2">
              {/* First Name */}
              <div>
                <label
                  htmlFor="firstName"
                  className="block mb-2 text-sm font-semibold text-gray-700 md:text-base"
                >
                  First name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="firstName"
                  id="firstName"
                  className={`w-full px-4 py-2.5 text-base border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00B425] focus:border-transparent transition ${
                    errors.firstName ? "border-red-500" : "border-gray-300"
                  }`}
                  placeholder="Enter your first name"
                  value={formData.firstName}
                  onChange={handleChange}
                />
                {errors.firstName && (
                  <p className="mt-1 text-xs text-red-500">
                    {errors.firstName}
                  </p>
                )}
              </div>

              {/* Last Name */}
              <div>
                <label
                  htmlFor="lastName"
                  className="block mb-2 text-sm font-semibold text-gray-700 md:text-base"
                >
                  Last name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="lastName"
                  id="lastName"
                  className={`w-full px-4 py-2.5 text-base border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00B425] focus:border-transparent transition ${
                    errors.lastName ? "border-red-500" : "border-gray-300"
                  }`}
                  placeholder="Enter your last name"
                  value={formData.lastName}
                  onChange={handleChange}
                />
                {errors.lastName && (
                  <p className="mt-1 text-xs text-red-500">{errors.lastName}</p>
                )}
              </div>

              {/* Email */}
              <div>
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-semibold text-gray-700 md:text-base"
                >
                  Email address <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  className={`w-full px-4 py-2.5 text-base border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00B425] focus:border-transparent transition ${
                    errors.email ? "border-red-500" : "border-gray-300"
                  }`}
                  placeholder="you@example.com"
                  value={formData.email}
                  onChange={handleChange}
                />
                {errors.email && (
                  <p className="mt-1 text-xs text-red-500">{errors.email}</p>
                )}
              </div>

              {/* Phone Number */}
              <div>
                <label
                  htmlFor="phoneNumber"
                  className="block mb-2 text-sm font-semibold text-gray-700 md:text-base"
                >
                  Phone number <span className="text-red-500">*</span>
                </label>
                <input
                  type="tel"
                  name="phoneNumber"
                  id="phoneNumber"
                  className={`w-full px-4 py-2.5 text-base border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00B425] focus:border-transparent transition ${
                    errors.phoneNumber ? "border-red-500" : "border-gray-300"
                  }`}
                  placeholder="0803 123 4567"
                  value={formData.phoneNumber}
                  onChange={handleChange}
                />
                {errors.phoneNumber && (
                  <p className="mt-1 text-xs text-red-500">
                    {errors.phoneNumber}
                  </p>
                )}
              </div>

              {/* Church */}
              <div>
                <label
                  htmlFor="church"
                  className="block mb-2 text-sm font-semibold text-gray-700 md:text-base"
                >
                  Church / Ministry <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="church"
                  id="church"
                  className={`w-full px-4 py-2.5 text-base border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00B425] focus:border-transparent transition ${
                    errors.church ? "border-red-500" : "border-gray-300"
                  }`}
                  placeholder="Name of your church"
                  value={formData.church}
                  onChange={handleChange}
                />
                {errors.church && (
                  <p className="mt-1 text-xs text-red-500">{errors.church}</p>
                )}
              </div>

              {/* First Timer */}
              <div>
                <label className="block mb-2 text-sm font-semibold text-gray-700 md:text-base">
                  First time attending MMC?{" "}
                  <span className="text-red-500">*</span>
                </label>
                <div className="flex gap-6">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="firstTimer"
                      value="Yes"
                      checked={formData.firstTimer === "Yes"}
                      onChange={handleChange}
                      className="w-4 h-4 text-[#00B425]"
                    />
                    <span className="text-base">Yes</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="firstTimer"
                      value="No"
                      checked={formData.firstTimer === "No"}
                      onChange={handleChange}
                      className="w-4 h-4 text-[#00B425]"
                    />
                    <span className="text-base">No</span>
                  </label>
                </div>
                {errors.firstTimer && (
                  <p className="mt-1 text-xs text-red-500">
                    {errors.firstTimer}
                  </p>
                )}
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className={`w-full md:w-auto px-10 py-4 text-lg font-bold text-white rounded-xl transition-all duration-200 mx-auto block ${
                loading
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-[#00B425] hover:bg-[#009620] hover:shadow-xl hover:scale-[1.02] cursor-pointer"
              }`}
            >
              {loading ? (
                <div className="flex items-center justify-center gap-2">
                  <svg
                    className="w-5 h-5 text-white animate-spin"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 000 16z"
                    />
                  </svg>
                  <span>Registering...</span>
                </div>
              ) : (
                "Register Now"
              )}
            </button>
          </form>
        </main>
      </section>
    </>
  );
}