var express = require('express');
var router = express.Router();

const UserModel = require('../models/user.model');

const path = require('path');
const nodemailer = require('nodemailer');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { verify } = require('crypto');

require("dotenv").config();

/* GET users listing. */
router.get('/', (req, res) => {
  res.send('respond with a resource');
});

router.post('/register', async (req, res) => {
  const { email, pwd } = req.body;
  try {
    let user = await UserModel.findOne({ email });
    if (user) {
      return res.status(400).send({message: "Email is used"});
    }

    const verifyToken = jwt.sign(
      { email },
      process.env.JWT_SECRET,
      { expiresIn: '1h' });

      let newUser = new UserModel({
        email,
        pwd,
        role: 'user',
        active: false,
        verifyToken: verifyToken
      });

      await newUser.save();

      //send activation mail
      const transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS,
        }
      });

      const link = `${req.protocol}://${req.get('host')}/api/users/verify/${verifyToken}`;

      await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: email,
        subject: 'Activation Account',
        html: `<h2>Activation Enail</h2><p>Please click the link below to activate</p><a href=${link}>Activate</a>`
      });

      res.status(200).send('Registered new account successfully. Check email to verify');
  } catch (err) {
    console.log(err);
    res.status(500).send({message: 'Internal Server Error'});
  }
});

router.get('/verify/:token', async(req, res) => {
  const token = req.params.token;
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    //console.log(decoded);

    const user = await UserModel.findOne({email: decoded.email});
    if(!user) {
      return res.status(400).send("Token not valid");
    }
    if(user.active) {
      return res.status(400).send("Account already activated");
    }
    user.active = true;
    user.verify_token = null;
    await user.save();

    return res.status(200).send('Account activated successfully');
  } catch (err) {
    console.log(err);
    res.status(500).send({ message: 'Internal Server Error' });
  }
});

router.post('/login', async (req, res) => {
  const {email, pwd} = req.body;

  try {
    const user = await UserModel.findOne({email});
    if (!user) {
      return res.status(400).send("Invalid email or password");
    }

    if (!user.active) {
      return res.status(400).send("Account not activated. Please check your email");
    }

    const isMatched = await bcrypt.compare(pwd, user.pwd);
    if (!isMatched) {
      return res.status(400).send("Invalid email or password");
    }
    
    const token = jwt.sign(
      {id: user._id},
      process.env.JWT_SECRET,
      { expiresIn: '12h'});
    res.status(200).json({
      message: 'Login successfully',
      token: token
    });
  } catch (err) {
    console.log(err);
    res.status(500).send({ message: 'Internal Server Error.' });
  }
});


module.exports = router;
