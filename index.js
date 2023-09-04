import express from 'express';
import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { regValidation } from './validations/registration.js';
import { validationResult } from 'express-validator';

const app = express();
app.use(express.json());
dotenv.config();

// Connect to DB
mongoose
  .connect(process.env.DB_ACCESS_LINK)
  .then(() => console.log('DB connected'))
  .catch((err) => console.log('DB error', err));

// User Registration
app.post('/auth/registration', regValidation, (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json(errors.array());
  }
  res.json({
    success: true,
  });
});

app.listen(4444, (err) => {
  if (err) {
    return console.log(err);
  }
  console.log('Server running');
});
