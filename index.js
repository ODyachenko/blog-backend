import express from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

const app = express();
app.use(express.json());
dotenv.config();

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
