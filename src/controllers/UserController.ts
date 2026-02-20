import { UserRepository } from '../repositories/UserRepository';
import { hashPassword, logger } from '../utils';
import { HTTP_STATUS } from '../utils/constants';

import type { Request, Response } from 'express';

export const createUser = async (req: Request, res: Response) => {
  try {
    const { name, email, password, role, favoriteGenres } = req.body;

    const userRepository = new UserRepository();

    const userExists = await userRepository.findOne({
      where: {
        email
      }
    });

    if (userExists) {
      return res.status(HTTP_STATUS.CONFLICT).send({
        status: 'error',
        message: 'User already exists'
      });
    }
    //   hash password
    const hashedUserPassword = await hashPassword(password);

    //   save new user to database
    const savedUser = await userRepository.create({
      name,
      password: hashedUserPassword,
      email,
      role,
      favoriteGenres
    });

    res.status(HTTP_STATUS.CREATED).send({
      message: 'User created successfully',
      data: {
        id: savedUser.id,
        name: savedUser.name,
        role: savedUser.role
      }
    });
  } catch (error) {
    logger.error('An error occurred', error);
    res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).send({
      status: 'error',
      message: 'Internal server error'
    });
  }
};
