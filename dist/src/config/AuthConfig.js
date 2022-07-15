"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class AuthConfig {
    constructor() {
        this.secret = process.env.SECRET_KEY;
        this.expiresIn = "7d";
    }
}
exports.default = new AuthConfig();
