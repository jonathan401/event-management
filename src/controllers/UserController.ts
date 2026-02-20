import { UserRepository } from '../repositories/UserRepository';
import { hashPassword, logger } from '../utils';
import { HTTP_STATUS } from '../utils/constants';

import type { Request, Response } from 'express';

export const createUser = async (req: Request, res: Response) => {
  try {
    const { name, email, password, role, favouriteGenres } = req.body;

    const userRepository = new UserRepository();

    //   hash password
    const hashedUserPassword = await hashPassword(password);

    //   save new user to database
    const savedUser = await userRepository.create({
      name,
      password: hashedUserPassword,
      email,
      role,
      favouriteGenres
    });

    res.status(HTTP_STATUS.CREATED).send({
      status: 'success',
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
