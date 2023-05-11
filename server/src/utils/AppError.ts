/**
 * AppError class to handle errors in the application
 * @param message 
 * @param errorStatusCode
 */
export class AppError extends Error {
  constructor(public message: string, public statusCode: number) {
    super(message);
    this.statusCode = statusCode;
  }
}
