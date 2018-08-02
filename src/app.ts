import { httpListener } from '@marblejs/core';
import { bodyParser$ } from '@marblejs/middleware-body';
import { logger$ } from '@marblejs/middleware-logger';
import { api$ } from './controllers/api.controller';

const middlewares = [bodyParser$, logger$];

const effects = [api$];

export const app = httpListener({ middlewares, effects });
