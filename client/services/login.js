import axios from "./apiService";

export const userLogin = async (credentials) =>
  axios
    .post("/auth/login", credentials)
    .then((res) => {
      localStorage.setItem("jwt", JSON.stringify(res.data));
      return { success: true, msg: "logged in" };
    })
    .catch((e) => ({
      success: false,
      msg: e.response?.data.message,
    }));
