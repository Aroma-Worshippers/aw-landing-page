import axios from "axios";

const BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "https://aw-api.onrender.com";

const api = axios.create({
  baseURL: BASE_URL,
  withCredentials: true, // ✅ send cookies with every request
});

export default api;

// ✅ Register user
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

// ✅ Fetch Attendance
export function fetchAttendance(eventId, page, search) {
  let url = `/events/attendance/${eventId}`;
  const params = [];
  if (page) params.push(`page=${page}`);
  if (search && search.trim())
    params.push(`search=${encodeURIComponent(search.trim())}`);

  if (params.length > 0) {
    url += "?" + params.join("&");
  }

  return api.get(url); // ✅ uses api instance (sends cookie)
}

// ✅ Mark Attendance
export const markAttendance = (payload) => {
  return api.post("/events/attendance", payload);
};

// ✅ Login
export const loginAdmin = (username, password) => {
  return api.post("/auth/login", { username, password });
};

// ✅ Create Admin
export const createAdmin = (username, password) => {
  return api.post("/auth/createAdmin", { username, password });
};
