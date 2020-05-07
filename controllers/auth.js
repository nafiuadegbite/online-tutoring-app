const User = require("../models/user");
const Category = require("../models/category");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.signUp = (req, res, next) => {
  const { firstname, lastname, email, password, role } = req.body;
  if (!(email || password || firstname || lastname)) {
    res.status(400).send({
      status: false,
      message: "All fields are required"
    });
    return;
  }
  User.findOne({ email }).then(user => {
    if (user) {
      return res
        .status(423)
        .send({ status: false, message: "This email already exists" });
    }
  });
  bcrypt
    .hash(password, 12)
    .then(password => {
      let user = new User({
        firstname,
        lastname,
        email,
        password,
        role
      });
      return user.save();
    })
    .then(() =>
      res
        .status(200)
        .send({ status: true, message: "User registered successfully" })
    )
    .catch(err => console.log(err));
};

exports.logIn = (req, res, next) => {
  const { email, password } = req.body;
  User.findOne({ email })
    .then(user => {
      if (!user) {
        return res
          .status(404)
          .send("User not found, please provide valid credentials");
      }
      bcrypt.compare(password, user.password).then(valid => {
        if (!valid) {
          return res
            .status(403)
            .send(
              "Incorrect username or password, please review details and try again"
            );
        }
        const token = jwt.sign(
          { email: user.email, _id: user._id },
          "somesecretkey",
          { expiresIn: "1hr" }
        );
        res.status(200).send({
          _id: user._id,
          token,
          role
        });
      });
    })
    .catch(err => console.log(err));
};

exports.getUsers = async (req, res, next) => {
  const users = await User.find({});
  res.status(200).json({
    data: users
  });
};
