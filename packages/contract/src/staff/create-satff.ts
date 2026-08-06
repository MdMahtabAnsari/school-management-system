import {z} from "zod";
import {role} from '../enum/role.js';
import {gender} from '../enum/gender.js';
import {employmentStatus} from '../enum/employment-status.js';

export const createStaffSchema = z.object({
    userId: z.string(),
    role: role,
    employeeId: z.string(),
    // firstName and lastName should only contain letters and space but space should not be at the start or end of the string and there should not be multiple spaces in between words
    firstName: z.string().regex(/^[A-Za-z]+(?: [A-Za-z]+)*$/, { message: "First name should only contain letters and space but space should not be at the start or end of the string and there should not be multiple spaces in between words" }),
    lastName: z.string().regex(/^[A-Za-z]+(?: [A-Za-z]+)*$/, { message: "Last name should only contain letters and space but space should not be at the start or end of the string and there should not be multiple spaces in between words" }),
    department: z.string().optional(),
    designation: z.string().optional(),
    phone: z.string().regex(/^\+?[1-9]\d{1,14}$/, { message: "Phone number should be a valid E.164 format" }).optional(),
    email:z.email().optional(),
    photoUrl:z.url().optional(),
    dateOfBirth:z.string().optional(),
    gender:gender.optional(),
    qualifications:z.string().optional(),
    experienceYears:z.string().regex(/^\d+$/, { message: "Experience years should be a valid number" }).optional(),
    employmentStatus:employmentStatus,

})


export type CreateStaffInput = z.infer<typeof createStaffSchema>;
