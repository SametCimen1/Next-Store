import *  as z from 'zod'

export const RegisterSchema = z.object({
    email: z.string().email(),
    password: z.string().min(8, {
        message: "Password Must be at least 8 characters long"
    }),
    name: z.string().min(2, {message:"Please add a name with at least 3 characters"})
})