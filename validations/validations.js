import { body } from 'express-validator';

export const regValidation = [
  body('email', 'Incorrect email types').isEmail(),
  body('password', 'Password must be greater than 5 symbols').isLength({
    min: 5,
  }),
  body('fullName', 'Name must be greater than 2 symbols').isLength({ min: 2 }),
  body('avatarUrl', 'Incorrect avatar URL').optional().isString(),
];

export const loginValidation = [
  body('email', 'Incorrect email types').isEmail(),
  body('password', 'Password must be greater than 5 symbols').isLength({
    min: 5,
  }),
];

export const postCreateValidation = [
  body('title', 'Enter an article title').isLength({ min: 3 }).isString(),
  body('text', 'Enter an article text').isLength({ min: 10 }).isString(),
  body('tags', 'Incorrect tags format').optional().isArray(),
  body('imageUrl', 'Incorrect image URL').optional().isString(),
  body('comments', 'test').optional().isArray(),
];

export const commentCreateValidation = [
  body('text', 'Enter an comment text').isLength({ min: 10 }).isString(),
];
