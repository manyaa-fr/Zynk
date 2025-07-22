const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const userModel = require('../models/user');
require('dotenv').config();
const jwt = require('jsonwebtoken');

const app = express();
app.use(express.json());
app.use(cors());

// In-memory store: { [email]: { data: {...}, otp: '1234', expiresAt: 1234567890 } }
const otpSignupStore = {};

// In-memory store for login OTPs: { [email]: { otp: '1234', expiresAt: 1234567890 } }
const loginOtpStore = {};

const generateOtp = () => Math.floor(1000 + Math.random() * 9000).toString();

// Signup: store data, send OTP
const signupWithOtp = async (req, res) => {
  const { name, username, email, password, country, state, city } = req.body;
  if (!name || !username || !email || !password || !country || !state || !city) {
    return res.status(400).json({ success: false, message: 'Please provide all the details' });
  }
  try {
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ success: false, message: 'User already exists' });
    }
    const otp = generateOtp();
    const expiresAt = Date.now() + 5 * 60 * 1000;
    const hashedPassword = await bcrypt.hash(password, 10);
    otpSignupStore[email] = {
      data: { name, username, email, password: hashedPassword, address: { country, state, city } },
      otp,
      expiresAt
    };
    // Send OTP email
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: { user: process.env.EMAIL_USER, pass: process.env.EMAIL_PASS }
    });
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Your Zink OTP',
      text: `Your OTP is: ${otp}`
    });
    res.json({ success: true, message: 'OTP sent to email' });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// Verify OTP and create user
const verifySignupOtp = async (req, res) => {
  const { email, otp } = req.body;
  const record = otpSignupStore[email];
  if (!record) return res.status(400).json({ error: 'No OTP found for this email' });
  if (Date.now() > record.expiresAt) {
    delete otpSignupStore[email];
    return res.status(400).json({ error: 'OTP expired' });
  }
  if (record.otp !== otp) return res.status(400).json({ error: 'Incorrect OTP' });
  try {
    const user = await userModel.create(record.data);
    delete otpSignupStore[email];
    res.json({ success: true, message: 'User created successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Send OTP for login
const sendLoginOtp = async (req, res) => {
  const { email } = req.body;
  try {
    const user = await userModel.findOne({ email });
    if (!user) return res.status(404).json({ error: 'User not found' });
    const otp = generateOtp();
    const expiresAt = Date.now() + 5 * 60 * 1000;
    loginOtpStore[email] = { otp, expiresAt };
    // Send OTP email
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: { user: process.env.EMAIL_USER, pass: process.env.EMAIL_PASS }
    });
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Your Zink Login OTP',
      text: `Your login OTP is: ${otp}`
    });
    res.json({ success: true, message: 'OTP sent to email' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Verify login OTP and issue JWT
const verifyLoginOtp = async (req, res) => {
  const { email, otp } = req.body;
  const record = loginOtpStore[email];
  if (!record) return res.status(400).json({ error: 'No OTP found for this email' });
  if (Date.now() > record.expiresAt) {
    delete loginOtpStore[email];
    return res.status(400).json({ error: 'OTP expired' });
  }
  if (record.otp !== otp) return res.status(400).json({ error: 'Incorrect OTP' });
  try {
    const user = await userModel.findOne({ email });
    if (!user) return res.status(404).json({ error: 'User not found' });
    // Issue JWT
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });
    delete loginOtpStore[email];
    res.json({ success: true, token });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = { signupWithOtp, verifySignupOtp, sendLoginOtp, verifyLoginOtp };