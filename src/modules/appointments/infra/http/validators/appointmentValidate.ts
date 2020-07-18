import { Joi, Segments, celebrate } from 'celebrate';

const appointmentValidateIndex = celebrate({
  [Segments.BODY]: {
    provider_id: Joi.string().uuid().required(),
    date: Joi.date(),
  },
});

export default appointmentValidateIndex;
