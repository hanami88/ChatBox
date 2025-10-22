import User from "../models/User.js";

class userController {
  chat(req, res) {
    res.send("ok");
  }
}

export default new userController();
