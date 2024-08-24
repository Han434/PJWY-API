"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tokenType_1 = require("../constants/tokenType");
const signToken = ({ payload = {}, jwtTokenType, noExpired }) => {
    const secret = jwtTokenType === tokenType_1.tokenType.Access ? "" : "";
};
