/* eslint-disable import/prefer-default-export */
interface IAuthConfig {
  jwt: {
    secret: string;
    expiresIn: string;
  };
}

const authConfig = {
  jwt: {
    secret: process.env.APP_SECRET || 'default',
    expiresIn: '7d',
  },
} as IAuthConfig;

export default authConfig;
