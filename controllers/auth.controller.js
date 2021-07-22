const usersModel = require("../models/users.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

async function signUp(req, res) {
  try {
    const pwd = await bcrypt.hash(req.body.pwd, 10)
    const user = await usersModel.create({
      name: req.body.name,
      email: req.body.email,
      pwd
    });

    const token = jwt.sign(
      {
        name: user.name,
        id: user._id,
        email: user.email,
        admin: user.admin,
      },
      process.env.SECRET
    );

    return res.json({
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
      token: token,
    });
  } catch (error) {
    res.status(403).json(error);
  }
}

async function login(req, res) {
  try {
    const user = await usersModel.findOne({ email: req.body.email })

    if (!user) return res.status(403).json("Can not find the email");

    bcrypt.compare(req.body.pwd, user.pwd, (err, result) => {
      if (!result) {
        return res.status(403).json({ error: `wrong password for ${req.body.email}` })
      }
      const token = jwt.sign({
        name: user.name,
        email: user.email,
        id: user._id,
        admin: user.admin,
      }, process.env.SECRET);

      console.log(token)
      return res.json({
        user: {
          name: user.name,
          email: user.email,
          id: user._id,
        },
        token: token,
      })
    })
  } catch (error) {
    res.status(403).json(error);
  }
}

module.exports = {
  signUp,
  login,
};
