import {z} from "zod";
import {Gender} from "@workspace/db/generated/prisma/esm/enums";

export const gender = z.enum(Gender);