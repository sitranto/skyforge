export default class Response {
    constructor(status: number, message: any) {
        this.status = status
        this.message = message
    }

    public status: number
    public message: any
}