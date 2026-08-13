"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendResponse = void 0;
const express_1 = require("express");
const sendResponse = (res, statusCode, success, message, data) => {
    return res.status(statusCode).json({
        success,
        message,
        data,
    });
};
exports.sendResponse = sendResponse;
//# sourceMappingURL=response.js.map