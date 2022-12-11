export class ErrorClass {
  public timeStamp: string
  public status: boolean

  constructor(
    public statusCode: number,
    public errors: string[] | string,
    public errorType: string | undefined,
    public path: string | null
  ) {
    this.statusCode = statusCode
    this.status = false
    this.errors = errors
    this.path = path
    this.errorType = errorType
    this.timeStamp = new Date().toISOString()
  }
}
