import User from "../models/User.js"; // Thêm .js
import bcrypt from "bcryptjs";

class App {
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
    await User.create({
      username,
      password,
      confirmPassword,
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
    if (user.password != password) {
      return res.status(400).json({ success: false, message: "Sai mật khẩu" });
    }
    return res
      .status(200)
      .json({ success: true, message: "Đăng nhập thành công" });
  }
}

export default new App();
