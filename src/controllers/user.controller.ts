import { Request, Response, NextFunction } from "express"
import logger from "../config/Logger";
import userServices from "../services/user.services";
import { decrypted, encoded, generateOTP } from "../utils/general.utils";
import createToken from "../utils/token.util";
import { jsonWebToken } from "../constants/jsonWebToken";
import { createAuthRefreshToken, removeAuthRefreshToken } from "../services/refreshToken.services";
import { CustomTokenRequest } from "../types/tokenType";
import passwordReset from "../services/passwordReset.services";
import { sendResetOtpEmail } from "../utils/email.utils";

export const userSignUp = async (req: Request, res: Response) => {
    try {
       const {userName, emailAddress, password} = req.body;

       const hashedPassword = await encoded(password);

       const isEmailTaken = await userServices.getUser(emailAddress);
       if (isEmailTaken) {
         return res.status(409).json({
           success: false,
           error:
             "Sorry, the email is already in use. Please choose a different one.",
         });
       }

       const user = await userServices.createUser({
        userName,
        emailAddress,
        password : hashedPassword,
       });

       if(user) {
        const {password, ...rest} = user.toObject();

        const accessToken = await createToken({user: {...rest}}, String(jsonWebToken.access_token_secret), jsonWebToken.access_token_expired); 

        const refreshToken = await createToken({user : {...rest}}, String(jsonWebToken.refresh_token_secret), jsonWebToken.refresh_token_expired);

        await userServices.updateUser(String(user._id), {refreshToken});


        res.status(200).json({
            success: true,
            message : `User ${user.userName} is signup successfully.`,
            user : rest,
            accessToken : accessToken
        })

        await createAuthRefreshToken(refreshToken, accessToken, String(user._id));
       } else {
        return res.status(500).json({message : "Something went wrong"});
       }

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message : "Internal Server Error"
        })
    }
}

export const userSignIn = async (req : Request, res : Response) => {
    try {
        const {userName, emailAddress, password} = req.body;
        if(!(userName && emailAddress && password)) {
            return res.status(400).json({message : "Username , email and password must be provided."})
        }

        const user = await userServices.getUser(emailAddress);

        if(!user) {
            return res.status(404).json({message : "User not found."})
        }

        const isCorrectPassword = await decrypted(password, String(user.password));

        if(!isCorrectPassword) {
            return res.status(400).json({message : "Incorrect password."})
        }

        if(user) {
            const {password, refreshToken, ...rest} = user;

            const accessToken = await createToken({user: {...rest}}, String(jsonWebToken.access_token_secret), jsonWebToken.access_token_expired);
    
            const newRefreshToken = await createToken({user: {...rest}}, String(jsonWebToken.refresh_token_secret), jsonWebToken.refresh_token_expired);

            // remove old refresh token
            await removeAuthRefreshToken(String(user._id));

            // store new refresh token
            await createAuthRefreshToken(newRefreshToken, accessToken, String(user._id));

            // update user with new refresh token
            await userServices.updateUser(String(user._id), {refreshToken : newRefreshToken});

            return res.status(200).json({
                success: true,
                message : `Hello, Welcome ${user.userName}.`,
                user: rest,
                accessToken,
            })
        }
    } catch (error) {
        logger.error(error);
        return res.status(500).json({
            message : "Internal Server Error"
        })
    }
}


export const userLogout = async (req : CustomTokenRequest, res: Response) => {
    try {
        const user = await userServices.getUserById(req.user?._id);

        if(user) {
            await removeAuthRefreshToken(String(req.user?._id));
            return res.status(200).json({success: true, message : "Logout successfully"});
        } else {
            return res.status(404).json({message: "Logout failed."})
        }
    } catch (error) {
        logger.error(error);
        return res.status(500).json({message: "Internal Server Error."})
    }
}

export const changePassword = async (req : CustomTokenRequest, res: Response) => {
    try {
        const {password, newPassword} = req.body;

        const user = await userServices.getUserById(req.user?._id);
        if(!user) {
            return res.status(404).json({
                message : "User not found."
            })
        }
        // check if current password is correct
        const isCorrectPassword = await decrypted(password, user.password);
        if(!isCorrectPassword) {
            return res.status(400).json({
                message : "Incorrect Password"
            })
        }

        const hashedPassword = await encoded(newPassword);
        await userServices.updateUser(String(user._id), {password: hashedPassword});

        return res.status(200).json({
            message : "Password change successfully"
        })

    } catch (error) {
        return res.status(500).json({
            message: "Internal Server Error"
    })
    }
}


export const forgetPassword = async (req: CustomTokenRequest, res: Response) => {
    try {
        const {emailAddress} = req.body;
        if(!emailAddress) {
            return res.status(400).json({
                message: "Email is required."
            })
        }

        const user = await userServices.getUserById(req.user?._id);
        if(!user) {
            return res.status(404).json({
                message: "User not found."
            });
        }

        const otp = generateOTP();

        await passwordReset.createPasswordReset(emailAddress, otp);

        await sendResetOtpEmail(emailAddress, otp);

        return res.status(200).json({
            message : "Password reset email has been sent."
        })
    } catch (error) {
        logger.error(error);
        return res.status(500).json({
            message: "Internal Server Error"
        });
    }
}


export const resetPassword = async (req: CustomTokenRequest, res: Response) => {
    try {
        const { emailAddress, otp, newPassword } = req.body;
        const user = await userServices.getUserById(req.user._id)

        if(!user) {
            return res.status(404).json({
                message: "User not found."
            })
        }

        if (!emailAddress || !otp || !newPassword) {
            return res.status(400).json({
                message: "Email, token, and new password are required."
            });
        }

        // Verify the token
        const resetRecord = await passwordReset.getResetRecord(emailAddress, otp);
        if (!resetRecord) {
            return res.status(400).json({
                message: "Invalid or expired token."
            });
        }

        // Hash the new password and update the user record
        const hashedPassword = await encoded(newPassword);
        await userServices.updateUser(String(user._id), {password : hashedPassword})
        // Optionally delete the token record
        await passwordReset.deleteRecord(emailAddress, otp);

        return res.status(200).json({
            message: "Password has been reset successfully."
        });
    } catch (error) {
        logger.error(error);
        return res.status(500).json({
            message: "Internal Server Error"
        });
    }
};


export const getUserInfo = async (req : Request, res : Response) => {
    try {
        const user = await userServices.getUserById(req.params?.id);

    if(!user) {
        return res.status(404).json({
            message : "User not found."
        })
    }

    const {password, refreshToken, ...rest} = user;

    return res.status(200).json({
        success: true,
        data : {
            user : {...rest}
        },
        message : "Getting user info successfully"
    })
    } catch (error) {
        logger.error(error);
        return res.status(500).json({
            message: "Internal Server Error"
        });
    }
}