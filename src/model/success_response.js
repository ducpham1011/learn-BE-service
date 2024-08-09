import BaseResponse from "./base_respone.js";

class SuccessResponse extends BaseResponse {
    constructor(msg, data) {
        super();
        this.code = 200;
        this.msg = msg;
        this.data = data;
    }
}

export default SuccessResponse;