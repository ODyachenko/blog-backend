import { body } from 'express-validator';

export const regValidation = [
  body('email', 'Incorrect email types').isEmail(),
  body('password', 'Password must be greater than 5 symbols').isLength({
    min: 5,
  }),
  body('fullName', 'Name must be greater than 2 symbols').isLength({ min: 2 }),
  body('avatarUrl', 'Incorrect avatar URL').optional().isURL(),
];
