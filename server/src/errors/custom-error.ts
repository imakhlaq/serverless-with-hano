class CustomError extends Error {
  readonly statusCode: number;
  readonly message: string;
  readonly path: string;
  private readonly timestamp: Date;

  constructor(statusCode: number, message: string, path: string) {
    super(message);
    this.statusCode = statusCode;
    this.message = message;
    this.path = path;
    this.timestamp = new Date();
  }
}
export default CustomError;
