import {z} from 'zod';

export const resourceType = z.enum(['image', 'video', 'raw']);