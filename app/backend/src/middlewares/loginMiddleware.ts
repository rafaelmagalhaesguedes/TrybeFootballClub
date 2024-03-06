import * as Joi from 'joi';
import { NextFunction, Request, Response } from 'express';
import IUser from '../Interfaces/User/IUser';

class LoginMiddleware {
  private static messageEmptyField = 'All fields must be filled';
  private static messageInvalidField = 'Invalid email or password';

  private static loginSchema = Joi.object({
    email: Joi.string().email().required().messages({
      'string.email': LoginMiddleware.messageInvalidField,
      'string.empty': LoginMiddleware.messageEmptyField,
      'any.required': LoginMiddleware.messageEmptyField,
    }),
    password: Joi.string().min(6).required().messages({
      'string.min': LoginMiddleware.messageInvalidField,
      'string.empty': LoginMiddleware.messageEmptyField,
      'any.required': LoginMiddleware.messageEmptyField,
    }),
  });

  private static validateLoginFields(body: IUser) {
    const { error } = LoginMiddleware.loginSchema.validate(body);
    if (error) return error.details[0].message;
  }

  public static validateLogin(req: Request, res: Response, next: NextFunction): Response | void {
    const message = LoginMiddleware.validateLoginFields(req.body);

    if (message) {
      if (message === LoginMiddleware.messageInvalidField) {
        return res.status(401).json({ message });
      }
      return res.status(400).json({ message });
    }

    next();
  }
}

export default LoginMiddleware.validateLogin;
