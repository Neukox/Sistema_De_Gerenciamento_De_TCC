"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getJwtConfig = getJwtConfig;
function getJwtConfig() {
    return {
        secret: process.env.JWT_SECRET || 'default_secret',
        expiresIn: '1h',
    };
}
