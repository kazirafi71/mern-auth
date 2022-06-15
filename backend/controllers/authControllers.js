const UserModel = require("../models/UserModel");
var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

const generate_authToken = async (userInfo) => {
  var token = await jwt.sign(
    { email: userInfo._email, name: userInfo.fillName },
    process.env.SECRET_KEY
  );

  return token;
};

module.exports.register__Controller = async (req, res) => {
  try {
    const { fullName, email, password, phone_number } = req.body;
    if (!fullName || !email || !password) {
      return res
        .status(404)
        .json({ error: "Please provide all required information." });
    }

    const checkUser = await UserModel.findOne({ email });
    if (checkUser) {
      return res.status(404).json({ error: "Email already exists" });
    } else {
      var hash_password = bcrypt.hashSync(password, 12);
      const newUser = await UserModel({
        fullName,
        email,
        password: hash_password,
        phone_number,
      });

      const userData = await newUser.save();
      const auth_token = await generate_authToken(userData);
      return res
        .status(200)
        .json({ success: "Registration success", token: auth_token });
    }
  } catch (error) {
    // console.log(error);
    return res.status(404).json({ error: "Something went wrong" });
  }
};

module.exports.login__controller = async (req, res) => {
  try {
    const { fullName, email, password } = req.body;
    if (!email || !password) {
      return res
        .status(404)
        .json({ error: "Please provide all required information." });
    }
    const checkUser = await UserModel.findOne({ email });
    if (!checkUser) {
      return res.status(404).json({ error: "User not exists" });
    }

    bcrypt.compare(password, checkUser.password, function (err, res) {
      if (err) {
        return res.status(404).json({ error: "Invalid credential" });
      }
    });

    const auth_token = await generate_authToken(checkUser);
    return res
      .status(200)
      .json({ success: "Login success", token: auth_token });
  } catch (error) {
    console.log(error);
    return res.status(404).json({ error: "Something went wrong" });
  }
};

module.exports.googleLogin__controller = async (req, res) => {
  try {
    const { fullName, email } = req.body;
    if (!fullName || !email) {
      return res
        .status(404)
        .json({ error: "Please provide all required information" });
    }
    const checkUser = await UserModel.findOne({ email });
    if (!checkUser) {
      return res.status(404).json({ error: "User not exists" });
    }

    const auth_token = await generate_authToken(checkUser);
    return res
      .status(200)
      .json({ success: "Login success", token: auth_token });
  } catch (error) {
    console.log(error);
    return res.status(404).json({ error: "Something went wrong" });
  }
};
