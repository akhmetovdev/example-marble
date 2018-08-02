import {
  combineRoutes,
  EffectFactory,
  HttpError,
  HttpStatus
} from '@marblejs/core';
import { mapTo, switchMap } from 'rxjs/operators';
import { message$ } from './message.controller';
import { messages$ } from './messages.controller';

const root$ = EffectFactory.matchPath('/')
  .matchType('GET')
  .use(req$ =>
    req$.pipe(
      mapTo({
        body: 'Marble.js API v1'
      })
    )
  );

const notFound$ = EffectFactory.matchPath('*')
  .matchType('GET')
  .use(req$ =>
    req$.pipe(
      switchMap(() => {
        throw new HttpError('NOT_FOUND', HttpStatus.NOT_FOUND);
      })
    )
  );

export const api$ = combineRoutes('/api/v1', [
  root$,
  message$,
  messages$,
  notFound$
]);
