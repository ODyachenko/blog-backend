import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import checkAuth from './utils/checkAuth.js';
import {
  regValidation,
  loginValidation,
  postCreateValidation,
} from './validations/validations.js';
import { getMe, login, registration } from './components/UserController.js';
import {
  createPost,
  getAll,
  getOne,
  deletePost,
  updatePost,
} from './components/PostController.js';

const app = express();
app.use(express.json());
dotenv.config();

// Connect to DB
mongoose
  .connect(process.env.DB_ACCESS_LINK)
  .then(() => console.log('DB connected'))
  .catch((err) => console.log('DB error', err));

// User authorization
app.post('/auth/login', loginValidation, login);

// User Registration/Validation
app.post('/auth/registration', regValidation, registration);

// Information about authorized user
app.get('/auth/me', checkAuth, getMe);

// Posts addresses
app.get('/posts', getAll);
app.get('/posts/:id', getOne);
app.post('/posts', checkAuth, postCreateValidation, createPost);
app.delete('/posts/:id', checkAuth, deletePost);
app.patch('/posts/:id', updatePost);

app.listen(4444, (err) => {
  if (err) {
    return console.log(err);
  }
  console.log('Server running');
});
