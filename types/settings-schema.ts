import * as z from 'zod';

export const SettingSchema = z.object({
    name: z.optional(z.string()),
    image: z.optional(z.string()),
    isTwoFactorEnabled: z.optional(z.boolean()),
    email: z.optional(z.string().email()),
    password: z.optional(z.string().min(8)),
    newPassword: z.optional(z.string().min(8))
}).refine((data) => {
    if(data.password && !data.newPassword){
        return false;
    }
    return true
}, {message: "new password is required", path:['newPassword']})
   