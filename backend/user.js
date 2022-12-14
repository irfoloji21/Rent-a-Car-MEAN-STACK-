const express = require("express");
const router = express.Router();

const User = require("./models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

router.post("/signup", (req, res, next) => {
  bcrypt.hash(req.body.password, 10).then((hash) => {
    const user = new User({
      email: req.body.email,
      password: hash,
      isAdmin: 0,
    });
    user
      .save()
      .then((result) => {
        res.status(201).json({
          message: "User created!",
          result: result,
        });
      })
      .catch((err) => {
        res.status(500).json({
          error: err,
        });
      });
  });
});

router.post("/login", (req, res, next) => {
  let fetchedUser;
  User.findOne({ email: req.body.email })
    .then((user) => {
      fetcheduser = user;
      if (!user) {
        return res.status(401).json({
          message: "Auth failed",
        });
      }
      return bcrypt.compare(req.body.password, user.password);
    })
    .then((result) => {
      if (!result) {
        return res.status(401).json({
          message: "Auth failed",
        });
      }
      const administrator = fetcheduser.isAdmin;
      const token = jwt.sign({email: fetcheduser.email, userId: fetcheduser._id}, 'secret-long', {expiresIn: '1h'});
      res.status(200).json({
        token: token,
        expiresIn: 3600,
        admin: administrator, 
      });
    })
    .catch((err) => {
      console.log(err); 
    });
});

module.exports = router;
