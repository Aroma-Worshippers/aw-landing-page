import axios from "axios";
const BASE_URL = import.meta.env.VITE_API_BASE_URL;

// Registration function
export const registerUser = (formData, onSuccess, onError) => {
  const payload = {
    eventId: "6869a1bae4d091c65d16712a",
    eventName: "mmc 2025",
    firstName: formData.firstName,
    lastName: formData.lastName,
    email: formData.email,
    phoneNumber: formData.phoneNumber,
    church: formData.church,
    firstTimer: formData.firstTimer === "Yes",
  };

  axios
    .post(`${BASE_URL}/register`, payload)
    .then((res) => {
      console.log("Registration successful:", res);
      if (onSuccess) onSuccess(res);
    })
    .catch((err) => {
      console.error("Registration failed:", err);
      if (onError) onError(err);
    });
};

// Fetch attendance with server-side pagination and search by name
export const fetchAttendance = (eventId, page = 1, search = "") => {
  return axios.get(`${BASE_URL}/attendance/${eventId}`, {
    params: { page, search },
    headers: {
      Authorization: `Bearer ${sessionStorage.getItem("token")}`,
    },
  });
};

// Mark attendance
export const markAttendance = (payload) => {
  return axios.post(`${BASE_URL}/attendance`, payload, {
    headers: {
      Authorization: `Bearer ${sessionStorage.getItem("token")}`,
    },
  });
};

// Admin login (expects token in response)
export const loginAdmin = (username, password) => {
  return axios.post(`${BASE_URL}/login`, { username, password });
};