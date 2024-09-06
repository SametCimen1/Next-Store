import * as z from 'zod';
export const reviewSchema = z.object({
    rating: z.number().min(1, {message: "Please add at least 1 star"}).max(5, {message:"Please add no more than 5 stars"}),
    comment: z.string().min(10, {message: 'please add at least 10 characters for this review'}),
    productID: z.number(),
})