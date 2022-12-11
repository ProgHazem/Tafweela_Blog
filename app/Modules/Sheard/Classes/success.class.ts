export class SuccessClass {
  public status: boolean
  constructor(public data?: object, public message?: string) {
    this.status = true
    this.data = data || {}
    this.message = message || 'Operation Successed'
  }
}
