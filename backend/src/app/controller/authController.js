import User from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

class authController {
  async dangky(req, res) {
    const { username, password, confirmPassword } = req.body;
    if (await User.findOne({ username: username })) {
      return res
        .status(400)
        .json({ success: false, message: "Tên đăng nhập đã tồn tại" });
    }
    if (password != confirmPassword) {
      return res
        .status(400)
        .json({ success: false, message: "Mật khẩu không khớp" });
    }
    if (password.length < 8) {
      return res
        .status(400)
        .json({ success: false, message: "Mật khẩu phải có ít nhất 8 kí tự" });
    }
    if (username.length < 5) {
      return res.status(400).json({
        success: false,
        message: "Tên đăng nhập phải có ít nhất 8 kí tự",
      });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    await User.create({
      username,
      password: hashedPassword,
    });
    res.status(200).json({
      success: true,
      message: "Đăng ký thành công",
      user: { username },
    });
  }

  async dangnhap(req, res) {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "Tên đăng nhập không tồn tại" });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ success: false, message: "Sai mật khẩu" });
    }
    const token = jwt.sign(
      { id: user._id, username: user.username },
      process.env.JWT_SECRET,
      { expiresIn: "10m" }
    );
    res.cookie("token", token, {
      httpOnly: true,
      maxAge: 10 * 60 * 1000,
    });
    return res
      .status(200)
      .json({ success: true, message: "Đăng nhập thành công", user: user });
  }
  async xacnhandangnhap(req, res) {
    const user = await User.findById(req.id);
    console.log(user);
    res.status(200).json({
      success: true,
      message: "Đã đăng nhập",
      user: user,
    });
  }
}

export default new authController();
