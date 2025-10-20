import User from "../models/User.js"; // Thêm .js
import bcrypt from "bcryptjs";

class App {
  async dangky(req, res) {
    const { username, password, confirmPassword } = req.body;
    if (password != confirmPassword) {
      return res
        .status(400)
        .json({ success: false, message: "Mật khẩu không khớp" });
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
    try {
      const { username, password } = req.body;

      if (!username || !password) {
        return res.status(400).json({
          success: false,
          message: "Vui lòng điền đầy đủ thông tin",
        });
      }

      // Tìm user
      const user = await User.findOne({ username });
      if (!user) {
        return res.status(401).json({
          success: false,
          message: "Tên đăng nhập hoặc mật khẩu không đúng",
        });
      }

      // So sánh password
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        return res.status(401).json({
          success: false,
          message: "Tên đăng nhập hoặc mật khẩu không đúng",
        });
      }

      res.status(200).json({
        success: true,
        message: "Đăng nhập thành công",
        user: {
          id: user._id,
          username: user.username,
        },
      });
    } catch (error) {
      console.error("Lỗi đăng nhập:", error);
      res.status(500).json({
        success: false,
        message: "Lỗi server",
      });
    }
  }
}

export default new App();
