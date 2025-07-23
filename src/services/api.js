import axios from "axios";

const BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "https://aw-api.onrender.com";

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

// ✅ Fetch Attendance (no token)
export function fetchAttendance(eventId, page, search) {
  let url = `${BASE_URL}/events/attendance/${eventId}`;

  const params = [];
  if (page) params.push(`page=${page}`);
  if (search && search.trim())
    params.push(`search=${encodeURIComponent(search.trim())}`);

  if (params.length > 0) {
    url += "?" + params.join("&");
  }

  return axios.get(url);
}



// ✅ Mark Attendance (no token)
export const markAttendance = (payload) => {
  return axios.post(`${BASE_URL}/events/attendance`, payload);
};

// ✅ Login (no token storage, just message)
export const loginAdmin = (username, password) => {
  return axios.post(`${BASE_URL}/auth/login`, { username, password });
};

// ✅ Create Admin (optional)
export const createAdmin = (username, password) => {
  return axios.post(`${BASE_URL}/auth/createAdmin`, { username, password });
};