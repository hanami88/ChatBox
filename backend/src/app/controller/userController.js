import User from "../models/User.js";
import Message from "../models/Message.js";
import Room from "../models/Room.js";
class userController {
  async timkiem(req, res) {
    try {
      const query = req.query.query || "";
      const users = await User.find({
        name: { $regex: query, $options: "i" },
      });
      res.status(200).json({ users });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }
  async message(req, res) {
    const { receiverId } = req.body;
    const userId = req.id;
    const room = await Room.findOne({
      isGroup: false, // Direct chat (1-1)
      members: {
        $all: [userId, receiverId],
        $size: 2, // Đảm bảo chỉ có 2 người
      },
    });
    if (!room) {
      return res.status(200).json({ success: false, message: null });
    }
    const message = await Message.find({
      roomId: room._id,
    }).populate("sender");
    return res.status(200).json({ success: false, message: message });
  }

  async themban(req, res) {
    try {
      const userid = req.id;
      const { friendid } = req.body;
      const user = await User.findById(userid);
      const friend = await User.findById(friendid);
      if (!user || !friend) {
        return res.status(404).json({
          success: false,
          message: "Không tìm thấy người dùng",
        });
      }
      user.friends.push(friendid);
      friend.friends.push(userid);
      await user.save();
      await friend.save();
      return res.status(200).json({
        success: true,
        message: "Thêm bạn thành công",
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: "Lỗi máy chủ",
      });
    }
  }

  async xoaban(req, res) {
    try {
      console.log("cacscacsacacsacacsacacsacacsacacsacacsacacsacacsacacsaa");
      const userid = req.id;
      const { friendid } = req.body;
      const user = await User.findById(userid);
      const friend = await User.findById(friendid);
      if (!user || !friend) {
        return res.status(404).json({
          success: false,
          message: "Không tìm thấy người dùng",
        });
      }
      // Xóa friendid khỏi danh sách bạn của user
      user.friends = user.friends.filter(
        (id) => id.toString() !== friendid.toString()
      );

      // Xóa userid khỏi danh sách bạn của friend
      friend.friends = friend.friends.filter(
        (id) => id.toString() !== userid.toString()
      );

      await user.save();
      await friend.save();
      return res.status(200).json({
        success: true,
        message: "Xóa bạn thành công",
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: "Lỗi máy chủ",
      });
    }
  }
}

export default new userController();
