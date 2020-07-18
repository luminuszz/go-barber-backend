import { Joi, Segments, celebrate } from 'celebrate';

const userValidateCreate = celebrate({
  [Segments.BODY]: {
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().required(),
    password_confirmation: Joi.string().required().valid(Joi.ref('password')),
  },
});

export default userValidateCreate;
