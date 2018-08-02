import { combineRoutes, EffectFactory } from '@marblejs/core';
import { map, mapTo, switchMap } from 'rxjs/operators';
import { Message } from '../models/message.model';
import { messageService } from '../services/message.service';

const get$ = EffectFactory.matchPath('/:id')
  .matchType('GET')
  .use(req$ =>
    req$.pipe(
      map(req => req.params.id),
      switchMap(messageService.get$),
      map(message => ({ body: { message } }))
    )
  );

const update$ = EffectFactory.matchPath('/:id')
  .matchType('PUT')
  .use(req$ =>
    req$.pipe(
      map(req => new Message({ ...req.body, id: req.params.id })),
      switchMap(messageService.update$),
      map(message => ({ body: { message } }))
    )
  );

const remove$ = EffectFactory.matchPath('/:id')
  .matchType('DELETE')
  .use(req$ =>
    req$.pipe(
      map(req => req.params.id),
      switchMap(messageService.remove$),
      mapTo({ body: {} })
    )
  );

export const message$ = combineRoutes('/message', {
  effects: [get$, update$, remove$]
});
