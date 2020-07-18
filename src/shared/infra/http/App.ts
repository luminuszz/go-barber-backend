import 'reflect-metadata';

import express from 'express';
import 'express-async-errors';
import cors from 'cors';
import { createConnections } from 'typeorm';

import uploadConfig from '@Config/upload';
import globalError from '@shared/errors/globalError';
import routes from './routes';

import '@shared/container';

class App {
  public express: express.Application;

  public constructor() {
    this.express = express();
    this.middlewares();
    this.database();
    this.routes();
    this.globalErrors();
  }

  private database(): void {
    createConnections();
  }

  private middlewares(): void {
    this.express.use(cors());
    this.express.use(express.json());
  }

  private routes(): void {
    this.express.use('/files', express.static(uploadConfig.tmpFolder));
    this.express.use(routes);
  }

  globalErrors(): void {
    this.express.use(globalError);
  }
}

export default new App().express;
