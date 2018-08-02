import { combineRoutes, EffectFactory } from '@marblejs/core';
import { switchMap, map } from 'rxjs/operators';
import { Message } from '../models/message.model';
import { messageService } from '../services/message.service';

const getAll$ = EffectFactory.matchPath('/')
  .matchType('GET')
  .use(req$ =>
    req$.pipe(
      switchMap(messageService.getAll$),
      map(messages => ({ body: { messages } }))
    )
  );

const create$ = EffectFactory.matchPath('/')
  .matchType('POST')
  .use(req$ =>
    req$.pipe(
      map(req => new Message(req.body)),
      switchMap(messageService.create$),
      map(message => ({ body: { message } }))
    )
  );

export const messages$ = combineRoutes('/messages', {
  effects: [getAll$, create$]
});
