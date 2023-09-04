import express from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import mongoose from 'mongoose';

const app = express();
app.use(express.json());
dotenv.config();

// Connect to DB
mongoose
  .connect(process.env.DB_ACCESS_LINK)
  .then(() => console.log('DB connected'))
  .catch((err) => console.log('DB error', err));

app.get('/', (req, res) => {
  res.send('Hello world');
});

app.post('/auth/login', (req, res) => {
  console.log(req.body);

  const token = jwt.sign(
    {
      name: req.body.name,
      email: req.body.email,
    },
    process.env.AUTH_KEY
  );

  res.json({
    success: true,
    token,
  });
});

app.listen(4444, (err) => {
  if (err) {
    return console.log(err);
  }
  console.log('Server running');
});
