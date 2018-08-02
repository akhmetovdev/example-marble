import { HttpError, HttpStatus } from '@marblejs/core';
import { Observable, of } from 'rxjs';
import { Message } from '../models/message.model';

class MessageService {
  messages: Message[] = [];

  get = (id: string = ''): Message | undefined => {
    if (!id.length) {
      throw new HttpError('ID_REQUIRED', HttpStatus.BAD_REQUEST);
    }

    return this.messages.find(m => m.id === id);
  };

  get$ = (id: string): Observable<Message | undefined> => {
    return of(this.get(id));
  };

  getAll$ = (): Observable<Message[]> => {
    return of(this.messages);
  };

  create$ = (message: Message): Observable<Message | undefined> => {
    if (this.get(message.id)) {
      throw new HttpError('ID_MUST_BE_UNIQUE', HttpStatus.BAD_REQUEST);
    }

    this.messages = [...this.messages, message];

    return this.get$(message.id);
  };

  update$ = (message: Message): Observable<Message | undefined> => {
    this.messages = this.messages.map(m => {
      return m.id === message.id ? { ...message } : m;
    });

    return this.get$(message.id);
  };

  remove$ = (id: string): Observable<undefined> => {
    this.get(id);

    this.messages = this.messages.filter(m => m.id !== id);

    return of(undefined);
  };
}

export const messageService = new MessageService();
