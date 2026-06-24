import axios from "axios";
const EVENT_ID = "6a2cda72a40f4e6c213ab50c";
const EVENT_NAME = "mmc 2026";

const BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "https://aw-api.onrender.com";

const api = axios.create({
  baseURL: BASE_URL,
  withCredentials: true, 
});

export default api;

export const registerUser = (formData, onSuccess, onError) => {
  const payload = {
    eventId: EVENT_ID,
    eventName: EVENT_NAME,
    firstName: formData.firstName,
    lastName: formData.lastName,
    email: formData.email,
    phoneNumber: formData.phoneNumber,
    church: formData.church,
    firstTimer: formData.firstTimer === "Yes",
  };

  api
    .post("/events/register", payload)
    .then((res) => {
      console.log("Registration successful:", res);
      if (onSuccess) onSuccess(res);
    })
    .catch((err) => {
      console.error("Registration failed:", err);
      if (onError) onError(err);
    });
};

export function fetchAttendance(page, searchKey) {
  let url = `/events/attendance/${EVENT_ID}`;
  const params = [];
  if (page) params.push(`page=${page}`);
  if (searchKey?.trim()) {
    params.push(`searchKey=${encodeURIComponent(searchKey.trim())}`);
  }
  if (params.length > 0) {
    url += "?" + params.join("&");
  }
  return api.get(url);
}

// ✅ Mark Attendance
export const markAttendance = (payload) => {
  return api.post("/events/attendance", {
    ...payload,
    eventId: EVENT_ID,
    eventName: EVENT_NAME,
  });
};

// ✅ Login
export const loginAdmin = (username, password) => {
  return api.post("/auth/login", { username, password });
};

// ✅ Create Admin
export const createAdmin = (username, password) => {
  return api.post("/auth/createAdmin", { username, password });
};
