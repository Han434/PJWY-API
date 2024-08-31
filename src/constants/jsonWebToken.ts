
export const jsonWebToken = Object.freeze({
   access_token_secret : process.env.ACCESS_TOKEN_SECRET,
   refresh_token_secret : process.env.REFRESH_TOKEN_SECRET,

   access_token_expired : process.env.ACCESS_TOKEN_EXPIRED, // min
   refresh_token_expired : process.env.REFRESH_TOKEN_EXPIRED // days
})