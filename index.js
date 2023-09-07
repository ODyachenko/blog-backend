import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import multer from 'multer';
import {
  regValidation,
  loginValidation,
  postCreateValidation,
  commentCreateValidation,
} from './validations/validations.js';
import {
  createPost,
  getAll,
  getOne,
  deletePost,
  updatePost,
} from './components/PostController.js';
import { getMe, login, registration } from './components/UserController.js';
import { getComments, createComments } from './components/CommentsContoller.js';
import checkAuth from './utils/checkAuth.js';
import handleValidationErrors from './utils/handleValidationErrors.js';
import cors from 'cors';

// Express settings
const app = express();
app.use(express.json());
app.use('/uploads', express.static('uploads'));
dotenv.config();
app.use(cors());

// Multer storage
const storage = multer.diskStorage({
  destination: (_, __, cb) => {
    cb(null, 'uploads');
  },
  filename: (_, file, cb) => {
    cb(null, file.originalname);
  },
});
const upload = multer({ storage });

// Connect to DB
mongoose
  .connect(process.env.DB_ACCESS_LINK)
  .then(() => console.log('DB connected'))
  .catch((err) => console.log('DB error', err));

// User routes
app.post('/auth/login', loginValidation, handleValidationErrors, login);
app.post(
  '/auth/registration',
  regValidation,
  handleValidationErrors,
  registration
);
app.get('/auth/me', checkAuth, getMe);

// Comments routes
app.get('/comments', getComments);
app.post(
  '/comments',
  checkAuth,
  commentCreateValidation,
  handleValidationErrors,
  createComments
);

// Posts routes
app.get('/posts', getAll);
app.get('/posts/:id', getOne);
app.post(
  '/posts',
  checkAuth,
  postCreateValidation,
  handleValidationErrors,
  createPost
);
app.delete('/posts/:id', checkAuth, deletePost);
app.patch(
  '/posts/:id',
  checkAuth,
  postCreateValidation,
  handleValidationErrors,
  updatePost
);

// Multer route
app.post('/upload', checkAuth, upload.single('image'), (req, res) => {
  res.json({
    url: `/uploads/${req.file.originalname}`,
  });
});

app.listen(4444, (err) => {
  if (err) {
    return console.log(err);
  }
  console.log('Server running');
});
