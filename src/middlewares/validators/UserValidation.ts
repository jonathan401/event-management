import { body } from 'express-validator';

import { UserRole } from '../../entities/User';
import { UserRepository } from '../../repositories/UserRepository';

export const newUserValidation = [
  body('name').trim().notEmpty().withMessage('Name field must not be empty'),
  body('email')
    .isEmail()
    .withMessage('Invalid email provided')
    .custom(async (value) => {
      const userRepository = new UserRepository();
      const userEmail = await userRepository.findOne({
        where: { email: value }
      });

      if (userEmail) throw new Error('Email already exists');
    }),
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
  body('role')
    .default(UserRole.USER)
    .trim()
    .toUpperCase()
    .isIn([UserRole.USER, UserRole.ADMIN])
    .withMessage('role must be USER or ADMIN'),
  body('favouriteGenres').optional().isArray().withMessage('Genres must be an array'),
  body('favouriteGenres.*').optional().isString().withMessage('Each genre must be a string')
];
