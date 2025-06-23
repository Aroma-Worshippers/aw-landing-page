// This is a mock up. Update when backend is ready
// Remember to update the .env file also


const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const registerUser = async (data) => {
  const res = await fetch(`${BASE_URL}/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("API error");

  return res.json();
};
