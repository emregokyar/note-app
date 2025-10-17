import BASE_API from "./base.js";

const register = async (profile) => {
  const res = await BASE_API.post("/register", profile);
  return res.data;
};

const logout = async () => {
  const res = await BASE_API.get("/logout");
  return res.data;
};

const googleLoginReq = async () => {
  const res = await BASE_API.get("/auth/google");
  return res.data;
};

const googleLoginRes = async () => {
  const res = await BASE_API.get("/auth/google/home");
  return res.data;
};

const localLogin = async (profile) => {
  const res = await BASE_API.post("/login", profile);
  return res.data;
};

export { register, logout, googleLoginReq, googleLoginRes, localLogin };
