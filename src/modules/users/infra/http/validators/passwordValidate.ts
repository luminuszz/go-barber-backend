import { Joi, Segments, celebrate } from 'celebrate';

export const passwordValidateForgot = celebrate({
  [Segments.BODY]: {
    email: Joi.string().email().required(),
  },
});

export const passwordValidateReset = celebrate({
  [Segments.BODY]: {
    token: Joi.string().uuid().required(),
    password: Joi.string().required(),
    password_confirmation: Joi.string().required().valid(Joi.ref('password')),
  },
});
