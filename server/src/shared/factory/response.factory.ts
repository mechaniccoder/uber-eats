export class Response<T> {
  static create<T>(ok: boolean, error?: string, data?: T) {
    return new Response<T>(ok, error, data)
  }

  constructor(public ok: boolean, public error?: string, public data?: T) {}
}
