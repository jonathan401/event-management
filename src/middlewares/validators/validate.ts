import { validationResult } from 'express-validator';

import type { NextFunction, Request, Response } from 'express';

export const validate = (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    res.status(400).send({
      status: 'error',
      message: 'Validation error',
      errors: errors.array().map((error) => error.msg)
    });
  }

  next();
};
