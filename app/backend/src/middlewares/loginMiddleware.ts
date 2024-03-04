import * as Joi from 'joi';
import { NextFunction, Request, Response } from 'express';
import IUser from '../Interfaces/User/IUser';

export default class LoginValidations {
  private static messageEmptyField = 'All fields must be filled';
  private static messageInvalidField = 'Invalid email or password';

  private static loginSchema = Joi.object({
    email: Joi.string().email().required().messages({
      'string.email': LoginValidations.messageInvalidField,
      'string.empty': LoginValidations.messageEmptyField,
      'any.required': LoginValidations.messageEmptyField,
    }),
    password: Joi.string().min(6).required().messages({
      'string.min': LoginValidations.messageInvalidField,
      'string.empty': LoginValidations.messageEmptyField,
      'any.required': LoginValidations.messageEmptyField,
    }),
  });

  private static validateLoginFields(body: IUser) {
    const { error } = LoginValidations.loginSchema.validate(body);
    if (error) return error.details[0].message;
  }

  static validateLogin(req: Request, res: Response, next: NextFunction): Response | void {
    const message = LoginValidations.validateLoginFields(req.body);

    if (message) {
      if (message === LoginValidations.messageInvalidField) {
        return res.status(401).json({ message });
      }
      return res.status(400).json({ message });
    }

    next();
  }
}
