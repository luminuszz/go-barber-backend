/* eslint-disable no-console */
import app from '@shared/infra/http/App';

const port = 3333;

app.listen(port, () => console.log('server Running on '));
