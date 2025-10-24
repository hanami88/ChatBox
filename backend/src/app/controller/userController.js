import User from "../models/User.js";
import Message from "../models/Message.js";
class userController {
  chat(req, res) {
    res.send("ok");
  }
  message(req, res) {
    const messages = Message.findBy;
  }
}

export default new userController();
