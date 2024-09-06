'use server'
import { LoginSchema } from '@/types/login-schema';
import { createSafeActionClient } from 'next-safe-action'
import { db } from '..';
import { eq } from 'drizzle-orm';
import { generateEmailVerificationToken, genereateTwoFactorToken, getTwoFactorTokenByEmail } from './tokens';
import { sendTwoFactorTokenByEmail, sendVerificationEmail } from './email';
import { signIn } from "../auth"
import { AuthError } from 'next-auth';
import { twoFactorTokens, users } from "../schema"


const action = createSafeActionClient();

export const emailSignin = action(LoginSchema, async({email, password, code}) => {

    try {
        
        const existingUser = await db.query.users.findFirst({
            where: eq(users.email, email)
        })

        if(existingUser?.email !== email){
            return {error: "Email not found"}
        }

        //If the user is not verified
        if(!existingUser.emailVerified){
            const verificationToken = await generateEmailVerificationToken(existingUser.email);
            await sendVerificationEmail(verificationToken[0].email, verificationToken[0].token)
            return {success: "Confirmation Email sent"}
        }

        if(existingUser.twoFactorEnabled && existingUser.email){
            if(code){
                const twoFactorToken = await getTwoFactorTokenByEmail(existingUser.email)
                if(!twoFactorToken){
                    return {error: "invalid token"}
                }
                if(twoFactorToken.token !== code){
                    return {error:"invalid token"}
                }
                const hasExpired = new Date(twoFactorToken.expires) < new Date();
                if(hasExpired){
                    return {error: "Token has expired"}
                }
                await db.delete(twoFactorTokens).where(eq(twoFactorTokens.id, twoFactorToken.id))

            }else{
                const token =await genereateTwoFactorToken(existingUser.email);

                if(!token){
                    return {error: "Failed to generate Two Factor Auth Token"}   
                }    
                await sendTwoFactorTokenByEmail(token[0].email, token[0].token);
                return {twoFactor: "Two Factor token sent"}
            }
        }

        await signIn("credentials", {
            email,
            password,
            redirectTo: "/",
        })

        return {sucess: email}

    } catch (error) {
        if(error instanceof AuthError){
            switch(error.type){
                case "CredentialsSignin":
                    return {error: "Email or Password incorrect"}
                case "AccessDenied":
                    return {error: error.name}
                case "OAuthSignInError":
                    return {error: error.name}
                default:
                    return {error: "Something went wrong"}
            }   
        }
        throw error
    }

})
