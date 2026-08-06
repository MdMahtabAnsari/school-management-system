import {z} from 'zod';

export const createSignedUploadUrlSchema = z.object({
  url:z.url(),
    publicId:z.string(),
    apiKey:z.string().optional(),
    timestamp:z.string(),
    eager:z.string().optional(),
    folder:z.string().optional(),
    signature:z.string(),
});

export type CreateSignedUploadUrlOutput = z.infer<typeof createSignedUploadUrlSchema>;
  