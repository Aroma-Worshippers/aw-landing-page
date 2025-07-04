import React, { useState } from "react";
import { registerUser } from "../services/api";

export default function RegistrationPage() {
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false); 
  const [errorMessage, setErrorMessage] = useState(false);

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
    if (!formData.firstName.trim()) newErrors.firstName = "First name is required";
    if (!formData.lastName.trim()) newErrors.lastName = "Last name is required";
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Enter a valid email";
    }
    if (!formData.phoneNumber.trim()) newErrors.phoneNumber = "Phone number is required";
    return newErrors;
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const formErrors = validateForm();
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }
    setErrors({});
    setLoading(true);
    registerUser(
      formData,
      (res) => {
        const user = res.data.data;
        if (res.status === 201 && user) {
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
        setFormData({
          firstName: "",
          lastName: "",
          email: "",
          phoneNumber: "",
          church: "",
          firstTimer: "",
        });
        setLoading(false);
      }
    );
  };

  return (
    <section className="text-black bg-white">
      <main className="max-w-6xl py-2 mx-auto">
        <div className="mb-6">
          <img
            src="/assets/MMC.png"
            alt="Flyer"
            className="w-full max-h-[400px] object-contain"
          />
        </div>
        {submitted && (
          <div className="px-4 py-3 mb-6 text-green-700 bg-green-100 border border-green-400 rounded">
            Registration successful
          </div>
        )}
        {errorMessage && (
          <div className="px-4 py-3 mb-6 text-red-700 bg-red-100 border border-red-400 rounded">
            {errorMessage}
          </div>
        )}
        <form onSubmit={handleSubmit} className="p-4">
          <section className="grid gap-6 mx-4 mb-8 md:grid-cols-2">
            {/* First Name */}
            <div>
              <label
                htmlFor="firstName"
                className="block mb-2 text-xl font-medium md:text-2xl"
              >
                First name
              </label>
              <input
                type="text"
                name="firstName"
                id="firstName"
                className={`text-gray-900 text-2xl rounded-lg focus:outline-none focus:border-[#00B425] placeholder:text-sm md:text-lg  block w-full p-2.5 border ${
                  errors.firstName ? "border-red-500" : "border-gray-300"
                }`}
                placeholder="John"
                required
                value={formData.firstName}
                onChange={handleChange}
              />
              {errors.firstName && (
                <p className="mt-1 text-sm text-red-500">{errors.firstName}</p>
              )}
            </div>

            {/* Last Name */}
            <div>
              <label
                htmlFor="lastName"
                className="block mb-2 text-xl font-medium md:text-2xl"
              >
                Last name
              </label>
              <input
                type="text"
                name="lastName"
                id="lastName"
                className={`text-gray-900 text-2xl rounded-lg focus:outline-none focus:border-[#00B425] placeholder:text-sm md:text-lg  block w-full p-2.5 border ${
                  errors.lastName ? "border-red-500" : "border-gray-300"
                }`}
                placeholder="Doe"
                required
                value={formData.lastName}
                onChange={handleChange}
              />
              {errors.lastName && (
                <p className="mt-1 text-sm text-red-500">{errors.lastName}</p>
              )}
            </div>

            {/* Email */}
            <div>
              <label
                htmlFor="email"
                className="block mb-2 text-xl font-medium md:text-2xl"
              >
                Email address
              </label>
              <input
                type="email"
                name="email"
                id="email"
                placeholder="Email Address"
                value={formData.email}
                onChange={handleChange}
                className={`text-gray-900 text-2xl rounded-lg focus:outline-none focus:border-[#00B425] placeholder:text-sm md:text-lg  block w-full p-2.5 border ${
                  errors.email ? "border-red-500" : "border-gray-300"
                }`}
              />
              {errors.email && (
                <p className="mt-1 text-sm text-red-500">{errors.email}</p>
              )}
            </div>

            {/* Church */}
            <div>
              <label
                htmlFor="church"
                className="block mb-2 text-xl font-medium md:text-2xl"
              >
                Church
              </label>
              <input
                type="text"
                name="church"
                id="church"
                placeholder="Name of Church"
                value={formData.church}
                onChange={handleChange}
                required
                className={`text-gray-900 text-2xl rounded-lg focus:outline-none focus:border-[#00B425] placeholder:text-sm md:text-lg  block w-full p-2.5 border ${
                  errors.church ? "border-red-500" : "border-gray-300"
                }`}
              />
              {errors.church && (
                <p className="mt-1 text-sm text-red-500">{errors.church}</p>
              )}
            </div>

            {/* Phone Number */}
            <div>
              <label
                htmlFor="phoneNumber"
                className="block mb-2 text-xl font-medium md:text-2xl"
              >
                Phone number
              </label>
              <input
                type="tel"
                id="phoneNumber"
                name="phoneNumber"
                placeholder="Phone Number"
                value={formData.phoneNumber}
                onChange={handleChange}
                className={`text-gray-900 text-2xl rounded-lg focus:outline-none focus:border-[#00B425] placeholder:text-sm md:text-lg  block w-full p-2.5 border ${
                  errors.phoneNumber ? "border-red-500" : "border-gray-300"
                }`}
              />
              {errors.phoneNumber && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.phoneNumber}
                </p>
              )}
            </div>

            {/* First Timer (Radio) */}
            <div>
              <label
                htmlFor="firstTimer"
                className="block mb-2 text-xl font-medium md:text-2xl"
              >
                Is this your first time attending?
              </label>
              <div>
                <input
                  type="radio"
                  name="firstTimer"
                  id="firstTimerYes"
                  value="Yes"
                  checked={formData.firstTimer === "Yes"}
                  onChange={handleChange}
                  required
                />
                <label
                  htmlFor="firstTimerYes"
                  className="inline-block ml-4 text-lg"
                >
                  Yes
                </label>
              </div>
              <div>
                <input
                  type="radio"
                  name="firstTimer"
                  id="firstTimerNo"
                  value="No"
                  checked={formData.firstTimer === "No"}
                  onChange={handleChange}
                  required
                />
                <label
                  htmlFor="firstTimerNo"
                  className="inline-block ml-4 text-lg"
                >
                  No
                </label>
              </div>
            </div>
          </section>

          <button
            type="submit"
            disabled={loading}
            className={`text-white font-medium rounded-lg text-2xl w-full md:w-70 m-auto inline-block px-5 py-2.5 text-center 
    ${
      loading
        ? "bg-gray-400 cursor-wait"
        : "bg-[#00B425] hover:bg-green-800 hover:cursor-pointer"
    }
  `}
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
                <span>Submitting...</span>
              </div>
            ) : (
              "Submit"
            )}
          </button>
        </form>
      </main>
    </section>
  );
}