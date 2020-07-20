import 'reflect-metadata';

import 'dotenv/config';

import { errors } from 'celebrate';

import express from 'express';
import 'express-async-errors';
import * as Sentry from '@sentry/node';

import cors from 'cors';

import { createConnections } from 'typeorm';

import uploadConfig from '@Config/upload';
import listnerConfig from '@Config/listner';
import globalError from '@shared/errors/globalError';
import rateLimiter from './middlewares/rateLimiter';
import routes from './routes';

import '@shared/container';

class App {
  public express: express.Application;

  public constructor() {
    this.express = express();
    this.listener();
    this.middlewares();
    this.database();
    this.routes();
    this.globalErrors();
  }

  public listener(): void {
    Sentry.init(listnerConfig.config);
  }

  private database(): void {
    createConnections();
  }

  private middlewares(): void {
    this.express.use(rateLimiter);
    this.express.use(cors());
    this.express.use(express.json());
    this.express.use(Sentry.Handlers.requestHandler());
  }

  private routes(): void {
    this.express.use('/files', express.static(uploadConfig.tmpFolder));
    this.express.use(routes);
  }

  private globalErrors(): void {
    this.express.use(errors());
    this.express.use(globalError);
  }
}

export default new App().express;
