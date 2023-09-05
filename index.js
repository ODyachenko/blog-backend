import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import multer from 'multer';
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
import handleValidationErrors from './utils/handleValidationErrors.js';

const app = express();
app.use(express.json());
app.use('/uploads', express.static('uploads'));
dotenv.config();

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

// User authorization
app.post('/auth/login', loginValidation, handleValidationErrors, login);

// User Registration/Validation
app.post(
  '/auth/registration',
  regValidation,
  handleValidationErrors,
  registration
);

// Information about authorized user
app.get('/auth/me', checkAuth, getMe);

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
