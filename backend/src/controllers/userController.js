const getUserInfo = async (req, res) => {
  try {
    return res.status(200).json({ user: req.user });
  } catch (err) {
    console.log(err);
    return res.status(404).json({ message: "Something went wrong." });
  }
};

export { getUserInfo };
