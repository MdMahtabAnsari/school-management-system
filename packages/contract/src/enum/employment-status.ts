import {z} from "zod";
import {EnrollmentStatus} from "@workspace/db/generated/prisma/esm/enums"

export const employmentStatus = z.enum(EnrollmentStatus);
