class CustomError extends Error {
  private readonly timestamp: Date;

  constructor(
    readonly statusCode: number,
    readonly message: string,
    readonly path: string,
  ) {
    super(message);
    this.timestamp = new Date();
  }
}
