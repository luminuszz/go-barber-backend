/* eslint-disable import/prefer-default-export */
const authConfig = {
  jwt: {
    secret: process.env.APP_SECRET,
    expiresIn: '7d',
  },
};

export default authConfig;
