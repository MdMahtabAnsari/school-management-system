import {z} from "zod";


export const role = z.enum([
  'owner',
  'admin',
  'principal',
  'vicePrincipal',
  'registrar',
  'teacher',
  'accountant',
  'librarian',
  'receptionist',
  'transportManager',
  'hostelWarden',
  'nurse',
  'hr',
  'security',
  'supportStaff',
  'member',
  'guardian'
]);