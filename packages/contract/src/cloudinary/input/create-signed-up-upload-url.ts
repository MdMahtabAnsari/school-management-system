import { z } from 'zod';
import { resourceType } from '../../enum/resource-type.js';
import { signedUploadUrlSchema } from './signed-upload-url-options.js';

export const createSignedUploadUrlSchema = z.object({
    publicId: z.string(),
    resourceType: resourceType,
    options: signedUploadUrlSchema.optional(),
});

export type CreateSignedUploadUrlInput = z.infer<typeof createSignedUploadUrlSchema>;