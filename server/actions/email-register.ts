'use server'
import { RegisterSchema } from "@/types/register-schema"
import { createSafeActionClient } from "next-safe-action"
import bcrpt from 'bcrypt'
import { db } from ".."
import { eq } from "drizzle-orm"
import { users } from "../schema"
import { generateEmailVerificationToken } from "./tokens"
import { sendVerificationEmail } from "./email"

const action = createSafeActionClient()

export const emailRegister = action(RegisterSchema, async ({email, name, password}) => {
    const hashedPassword = await bcrpt.hash(password, 10);


    const existingUser = await db.query.users.findFirst({
        where: eq(users.email, email)
    })


    if(existingUser){
        if(!existingUser.emailVerified){
            const verificationToken = await generateEmailVerificationToken(email);
            await sendVerificationEmail(verificationToken[0].email, verificationToken[0].token)
            return {success: "email confirmation sent"}
        }   
        return {error: "email already in use"}     
    }

    await db.insert(users).values({
        name,
        email,
        password: hashedPassword,
    })  

    const verificationToken = await generateEmailVerificationToken(email);
    await sendVerificationEmail(verificationToken[0].email, verificationToken[0].token)

    return {success: "Confirmation Email Sent!"}
}) 
