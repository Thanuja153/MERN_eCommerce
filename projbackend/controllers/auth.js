const User = require("../models/user");
const { check, validationResult } = require("express-validator");
var jwt = require("jsonwebtoken");
var expressJwt = require("express-jwt");

exports.signup = (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({
      error: errors.array()[0].msg,
    });
  }
  const user = new User(req.body);
  user.save((err, user) => {
    if (err) {
      return res.status(400).json({
        err: "Not able to save user in DB",
      });
    }

    res.json({
      name: user.name,
      email: user.email,
      id: user.id,
    });
  });
};
exports.signin = (req, res) => {
  const errors = validationResult(req);
  const { email, password } = req.body;
  if (!errors.isEmpty()) {
    return res.status(422).json({
      error: errors.array()[0].msg,
    });
  }

  User.findOne({ email }, (err, user) => {
    if (err || !user) {
      return res.status(400).json({
        error: "User doesnot exist",
      });
    }
    if (!user.authenticate(password)) {
      return res.status(402).json({
        error: "email and password do not match",
      });
    }
    //create token
    const token = jwt.sign({ _id: user._id }, process.env.SECRET);
    //putting the token into users cookie
    res.cookie("token", token, { expire: new Date() + 9999 });

    //send response to front end
    const { _id, name, email, role } = user;
    return res.json({ token, user: { _id, name, email, role } });
  });
};
exports.signout = (req, res) => {
  res.clearCookie("token");
  // res.send("User Signout Success");
  res.json({ message: " User signedout Successfully" });
};

//protected Routes
exports.isSignedIn = expressJwt({
  secret: process.env.SECRET,
  algorithms: ["HS256"],
  userProperty: "auth",
});

//custom middlewares
exports.isAuthenticated = (req, res, next) => {
  let checker = req.profile && req.auth && req.profile._id == req.auth._id;
  if (!checker) {
    return res.status(403).json({
      error: "Access Denied",
    });
  }
  next();
};
exports.isAdmin = (req, res, next) => {
  if (req.profile.role === 0) {
    return res.status(403).json({
      error: "You are not Admin, Access Denied",
    });
  }
  next();
};
