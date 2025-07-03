import axios from "axios";
const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const registerUser = (formdata, onSuccess, onError) => {
  const payload = {
    eventId: "684ba3786a19c918b8309481",
    eventName: "mmc 2025",
    ...formdata,
  };

  axios
    .post(`${BASE_URL}/events/register`, payload)
    .then((res) => {
      console.log("Registration successful:", res.data);
      if (onSuccess) onSuccess(res.data);
    })
    .catch((err) => {
      console.error("Registration failed:", err);
      if (onError) onError(err);
    });
};
