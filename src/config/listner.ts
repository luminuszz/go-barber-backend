import { NodeOptions } from '@sentry/node';

interface IListener {
  driver: 'sentry';
  config: NodeOptions;
}

export default {
  driver: process.env.LISTENER_DRIVER,

  config: {
    dsn: process.env.LISTENER_DSN,
  },
};
