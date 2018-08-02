export class Message {
  id: string;
  body: string;

  constructor({ id = '', body = '' }: { id: string; body: string }) {
    if (!id.length) {
      throw new Error('ID required');
    }

    this.id = id;
    this.body = body;
  }
}
