import jwt from "jsonwebtoken";

const verifyToken = (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    return res.status(401).json({ success: false, message: "Chưa đăng nhập" });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next(); // ✅ chuyển sang controller kế tiếp
  } catch (error) {
    return res
      .status(403)
      .json({ success: false, message: "Token không hợp lệ" });
  }
};

export default verifyToken;
