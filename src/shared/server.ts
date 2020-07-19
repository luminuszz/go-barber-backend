/* eslint-disable no-console */
import app from '@shared/infra/http/App';

app.listen(process.env.PORT, () =>
  console.log(`🚀 server Running on port ${process.env.PORT} `),
);
