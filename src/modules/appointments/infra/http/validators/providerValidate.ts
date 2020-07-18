import { Joi, Segments, celebrate } from 'celebrate';

export const appointmentValidateMonthAvailabilility = celebrate({
  [Segments.PARAMS]: {
    provider_id: Joi.string().uuid().required(),
  },
});

export const appointmentValidateDayAvailabilility = celebrate({
  [Segments.PARAMS]: {
    provider_id: Joi.string().uuid().required(),
  },
});
