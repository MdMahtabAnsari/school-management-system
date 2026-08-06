import {z} from 'zod';

export const signedUploadUrlSchema = z.object({
    folder: z.string().optional(),
    eager: z.string().optional(),
});