// RegistrationPage.jsx
//Update firstTime to boolean (radio), take out locatiom, expectation and 

import React, { useState } from "react";
import { registerUser } from "../services/api";

export default function RegistrationPage() {
  const [errors, setErrors] = useState({});
  const validateForm = () => {
    const newErrors = {};
    if (!formData.firstName.trim())
      newErrors.firstName = "First name is required";
    if (!formData.lastName.trim()) newErrors.lastName = "Last name is required";
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Enter a valid email";
    }
    if (!formData.phone.trim()) newErrors.phone = "Phone number is required";
    if (!formData.location.trim()) newErrors.location = "Location is required";
    if (!formData.expectation.trim())
      newErrors.expectation = "Tell us your expectation";

    return newErrors;
  };

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    church: "",
    firstTime: "",
    location: "",
    expectation: "",
    about: "",
  });

  const [submitted, setSubmitted] = useState(false);
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formErrors = validateForm();

    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }
    setErrors({});
    try {
      const response = await registerUser(formData);
      console.log(response);

      if (response.success) {
        setSubmitted(true);
        window.scrollTo({ top: 0, behavior: "smooth" });
        setFormData({
          firstName: "",
          lastName: "",
          email: "",
          phone: "",
          church: "",
          firstTime: "",
          location: "",
          expectation: "",
          about: "",
        });

        setTimeout(() => setSubmitted(false), 2000);
      }
    } catch (err) {
      console.error("Registration failed:", err);
      alert("Something went wrong.");
    }
  };
  return (
    <>
      <section className="min-h-screen text-black bg-white">
        <main className="max-w-6xl px-8 py-2 mx-auto">
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

          <h2 className="mb-4 text-xl font-semibold">
            To register for MMC, kindly fill out your details below.
          </h2>

          <form onSubmit={handleSubmit}>
            <section className="grid gap-6 mb-6 md:grid-cols-2">
              <div>
                <label
                  htmlFor="firstName"
                  className="block mb-2 text-2xl font-medium "
                >
                  First name
                </label>
                <input
                  type="text"
                  name="firstName"
                  id="firstName"
                  className={`text-gray-900 text-2xl rounded-lg focus:outline-none focus:border-[#00B425]  block w-full p-2.5 border ${
                    errors.firstName ? "border-red-500" : "border-gray-300"
                  }`}
                  placeholder="John"
                  required
                  value={formData.firstName}
                  onChange={handleChange}
                />
                {errors.firstName && (
                  <p className="mt-1 text-sm text-red-500">
                    {errors.firstName}
                  </p>
                )}
              </div>
              <div>
                <label
                  htmlFor="lastName"
                  className="block mb-2 text-2xl font-medium "
                >
                  Last name
                </label>
                <input
                  type="text"
                  name="lastName"
                  id="lastName"
                  className={`text-gray-900 text-2xl rounded-lg focus:outline-none focus:border-[#00B425]  block w-full p-2.5 border ${
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
              <div>
                <label
                  htmlFor="email"
                  className="block mb-2 text-2xl font-medium"
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
                  className={`text-gray-900 text-2xl rounded-lg focus:outline-none focus:border-[#00B425]  block w-full p-2.5 border ${
                    errors.email ? "border-red-500" : "border-gray-300"
                  }`}
                />
                {errors.email && (
                  <p className="mt-1 text-sm text-red-500">{errors.email}</p>
                )}
              </div>
              <div>
                <label
                  htmlFor="church"
                  className="block mb-2 text-2xl font-medium"
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
                  className={`text-gray-900 text-2xl rounded-lg focus:outline-none focus:border-[#00B425]  block w-full p-2.5 border ${
                    errors.church ? "border-red-500" : "border-gray-300"
                  }`}
                />
                {errors.church && (
                  <p className="mt-1 text-sm text-red-500">{errors.church}</p>
                )}
              </div>
              <div>
                <label
                  htmlFor="phone"
                  className="block mb-2 text-2xl font-medium"
                >
                  Phone number
                </label>
                <input
                  type="tel"
                  id="phone"
                  c
                  className={`text-gray-900 text-2xl rounded-lg focus:outline-none focus:border-[#00B425]  block w-full p-2.5 border ${
                    errors.phone ? "border-red-500" : "border-gray-300"
                  }`}
                  name="phone"
                  placeholder="Phone Number"
                  value={formData.phone}
                  onChange={handleChange}
                />
                {errors.phone && (
                  <p className="mt-1 text-sm text-red-500">{errors.phone}</p>
                )}
              </div>
              <div>
                <label
                  htmlFor="expectation"
                  className="block mb-2 text-2xl font-medium"
                >
                  What are your expectations from the event?
                </label>
                <input
                  type="text"
                  name="expectation"
                  id="expectation"
                  placeholder="What do you expect from the event?"
                  value={formData.expectation}
                  onChange={handleChange}
                  className={`text-gray-900 text-2xl rounded-lg focus:outline-none focus:border-[#00B425]  block w-full p-2.5 border ${
                    errors.expectation ? "border-red-500" : "border-gray-300"
                  }`}
                  required
                />
                {errors.expectation && (
                  <p className="mt-1 text-sm text-red-500">
                    {errors.expectation}
                  </p>
                )}
              </div>
              <div>
                <label
                  htmlFor="location"
                  className="block mb-2 text-2xl font-medium"
                >
                  Location
                </label>
                <input
                  type="text"
                  name="location"
                  id="location"
                  placeholder="Location"
                  value={formData.location}
                  onChange={handleChange}
                  required
                  className={`text-gray-900 text-2xl rounded-lg focus:outline-none focus:border-[#00B425]  block w-full p-2.5 border ${
                    errors.location ? "border-red-500" : "border-gray-300"
                  }`}
                />
                {errors.location && (
                  <p className="mt-1 text-sm text-red-500">{errors.location}</p>
                )}
              </div>
              <div>
                <label
                  htmlFor="firstTime"
                  className="block mb-2 text-2xl font-medium"
                >
                  Is this your first time attending?
                </label>
                <input
                  type="text"
                  name="firstTime"
                  id="firstTime"
                  placeholder="Is this your first time attending?"
                  value={formData.firstTime}
                  onChange={handleChange}
                  required
                  className={`text-gray-900 text-2xl rounded-lg focus:outline-none focus:border-[#00B425]  block w-full p-2.5 border ${
                    errors.firstTime ? "border-red-500" : "border-gray-300"
                  }`}
                />
                {errors.firstTime && (
                  <p className="mt-1 text-sm text-red-500">
                    {errors.firstTime}
                  </p>
                )}
              </div>
              <div>
                <label
                  htmlFor="about"
                  className="block mb-2 text-2xl font-medium"
                >
                  How did you hear about the event?
                </label>
                <input
                  type="text"
                  name="about"
                  id="about"
                  placeholder="How did you hear about the event?"
                  value={formData.about}
                  onChange={handleChange}
                  required
                  className={`text-gray-900 text-2xl rounded-lg focus:outline-none focus:border-[#00B425]  block w-full p-2.5 border ${
                    errors.about ? "border-red-500" : "border-gray-300"
                  }`}
                />
                {errors.about && (
                  <p className="mt-1 text-sm text-red-500">{errors.about}</p>
                )}
              </div>
            </section>
            <button
              type="submit"
              className="text-white bg-[#00B425]  hover:bg-green-800 hover:cursor-pointer focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-2xl w-full px-5 py-2.5 text-center"
            >
              Submit
            </button>
          </form>
        </main>
      </section>
    </>
  );
}
