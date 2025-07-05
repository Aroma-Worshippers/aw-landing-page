import axios from "axios";
export const registerUser = (formData, onSuccess, onError) => {
const BASE_URL = import.meta.env.VITE_API_BASE_URL;
  const payload = {
    eventId: "684ba3786a19c918b8309481",
    eventName: "mmc 2025",
    firstName: formData.firstName,
    lastName: formData.lastName,
    email: formData.email,
    phoneNumber: formData.phoneNumber, 
    church: formData.church,
    firstTimer: formData.firstTimer === "Yes",
  };
  axios
    .post(`${BASE_URL}/events/register`, payload)
    .then((res) => {
      console.log("Registration successful:", res);
      if (onSuccess) onSuccess(res);
    })
    .catch((err) => {
      console.error("Registration failed:", err);
      if (onError) onError(err);
    });
};
