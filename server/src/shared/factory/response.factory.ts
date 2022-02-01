export class Response<T> {
  static create<T>(ok: boolean, error?: string, data?: T) {
    return new Response<T>(ok, error, data)
  }

  error?: string

  constructor(private ok: boolean, error?: string, private data?: T) {
    if (error) {
      this.error = error
    }
  }
}
