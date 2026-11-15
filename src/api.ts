export const API_URL = import.meta.env.VITE_API_URL as string;

export class HttpError extends Error {
  status: number;

  constructor(status: number, message: string) {
    super(message);
    this.status = status;
  }
}
