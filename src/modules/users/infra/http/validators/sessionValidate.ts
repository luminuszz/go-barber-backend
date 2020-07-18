import { Joi, Segments, celebrate } from 'celebrate';

const sessionValidateCreate = celebrate({
  [Segments.BODY]: {
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  },
});

export default sessionValidateCreate;
