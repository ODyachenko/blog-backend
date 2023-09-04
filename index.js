import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import checkAuth from './utils/checkAuth.js';
import { regValidation } from './validations/registration.js';
import { getMe, login, registration } from './components/UserController.js';

const app = express();
app.use(express.json());
dotenv.config();

// Connect to DB
mongoose
  .connect(process.env.DB_ACCESS_LINK)
  .then(() => console.log('DB connected'))
  .catch((err) => console.log('DB error', err));

// User authorization
app.post('/auth/login', login);

// User Registration/Validation
app.post('/auth/registration', regValidation, registration);

// Information about authorized user
app.get('/auth/me', checkAuth, getMe);

app.listen(4444, (err) => {
  if (err) {
    return console.log(err);
  }
  console.log('Server running');
});
