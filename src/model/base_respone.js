class BaseResponse {
    code;
    msg;
    data;
    constructor(msg, data, code){
        this.msg = msg;
        this.data = data;
        this.code = code;
    }
}

export default BaseResponse;