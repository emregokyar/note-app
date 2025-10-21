import BASE_API from "./base";

const getUserInfo = async () => {
  const res = await BASE_API.get("/user");
  console.log(res.data);

  return res.data;
};

export default getUserInfo;
