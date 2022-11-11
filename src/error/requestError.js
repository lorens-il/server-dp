class RequestError extends Error {
    status;
    constructor(status, message) {
        super();
        this.status = status;
        this.message = message;
    }
    static badRequest(message) {
        return new RequestError(404, message);
    }
    static internal(message) {
        return new RequestError(500, message);
    }
    static forbidden(message) {
        return new RequestError(403, message);
    }
}
export default RequestError;
