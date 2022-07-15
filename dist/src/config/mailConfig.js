"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Mail {
    constructor() {
        this.host = process.env.EMAIL_HOST;
        this.port = +process.env.EMAIL_PORT;
        this.user = process.env.EMAIL_USER;
        this.password = process.env.EMAIL_PASS;
    }
}
exports.default = new Mail();
