import { api } from "../../utils/axios";

const logout = async () => {
  try {
    await api.post("/api/auth/logout", {}, { withCredentials: true });
  } catch (err) {
    console.error("Logout failed:", err);
  }
};

export default logout