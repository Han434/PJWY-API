import { tokenType } from "../constants/tokenType";

type SignTokenType = {
    payload: Object;
    jwtTokenType : string;
    noExpired: boolean;
}

const signToken = ({payload = {}, jwtTokenType, noExpired} : SignTokenType) => {
    const secret = jwtTokenType === tokenType.Access ? "" : ""
}