import BaseResponse from "./base_respone.js";

class ErrorResponse extends BaseResponse {
    constructor(code, msg) {
        super();
        this.data = null;
        this.code = code;
        this.msg = msg;
    }
}

export default ErrorResponse;