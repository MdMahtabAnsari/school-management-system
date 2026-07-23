import { createAccessControl } from "better-auth/plugins/access";
import { defaultStatements } from "better-auth/plugins/organization/access";

// ============================================================================
// STATEMENT
// One resource per domain area (roughly one per schema section). Keep actions
// verb-based and specific rather than generic CRUD where the domain has a
// distinct workflow action (e.g. "collectPayment" vs a generic "update" on fee).
// ============================================================================

const statement = {
  // Better Auth's own org/member/invitation/team permissions
  ...defaultStatements,

  // Section 2 — Academic structure (Board, GradeLevel, AcademicYear, ClassSection, Timetable)
  academicStructure: ["create", "read", "update", "delete"],
  timetable: ["create", "read", "update", "delete"],

  // Section 3 — Students
  // manageActivities covers House/HouseMembership, Club/ClubMembership,
  // Certificate issuance, and SiblingLink confirmation — folded in here rather
  // than given separate resources, since they're all extensions of the same
  // student record and are managed by the same roles (registrar/principal/admin).
  // Split these out into their own resources later if a role needs to manage
  // activities but NOT core student records (e.g. a dedicated "activities coordinator").
  student: ["create", "read", "update", "delete", "transfer", "promote", "manageActivities"],
  studentDocument: ["create", "read", "update", "delete"],
  disciplinaryRecord: ["create", "read", "update", "delete"],
  healthRecord: ["create", "read", "update", "delete"],

  // Section 4 — Guardians
  guardian: ["create", "read", "update", "delete", "linkStudent"],

  // Section 5 — Staff
  staff: ["create", "read", "update", "delete"],
  employeeRecord: ["create", "read", "update", "delete"],
  performanceReview: ["create", "read", "update", "delete"],

  // Section 6 — Attendance
  studentAttendance: ["mark", "read", "update", "delete"],
  staffAttendance: ["mark", "read", "update", "delete"],
  leaveRequest: ["create", "read", "approve", "reject"],

  // Section 7 — Examination
  exam: ["create", "read", "update", "delete"],
  examResult: ["create", "read", "update", "delete", "publish"],

  // Section 8 — Fees
  feeStructure: ["create", "read", "update", "delete"],
  invoice: ["create", "read", "update", "cancel"],
  receipt: ["create", "read", "refund"],
  feeDiscount: ["create", "read", "approve"],

  // Section 9 — Transport
  transport: ["create", "read", "update", "delete", "assignStudent"],

  // Section 10 — Hostel
  hostel: ["create", "read", "update", "delete", "allocateRoom"],

  // Section 11 — Library
  library: ["create", "read", "update", "delete", "issueBook", "returnBook"],

  // Section 12/13 — Inventory & Finance
  inventory: ["create", "read", "update", "delete"],
  ledger: ["create", "read", "update"],

  // Section 14 — Payroll
  payroll: ["create", "read", "update", "generatePayslip"],

  // Section 15 — Communication
  // notice = published announcements; communication = MessageLog/MessageTemplate
  // (SMS/WhatsApp/email sends) — kept separate since audience and workflow differ
  // (one is broadcast content, the other is a transactional send log).
  notice: ["create", "read", "update", "delete", "publish"],
  communication: ["send", "read"],

  // Section 16 — Homework & learning
  homework: ["create", "read", "update", "delete"],
  homeworkSubmission: ["create", "read", "grade"],
  lessonPlan: ["create", "read", "update", "delete"],

  // Section 17 — Events
  schoolEvent: ["create", "read", "update", "delete"],

  // Section 20/21 — Documents, tokens, audit
  document: ["create", "read", "update", "delete"],
  apiToken: ["create", "read", "revoke"],
  auditLog: ["read"],
  report: ["read", "export"],
} as const;

export const ac = createAccessControl(statement);

// ============================================================================
// ROLES — one per SchoolRole enum value. Grouped by access tier.
// ============================================================================

// Full-access tiers -----------------------------------------------------

/** Platform-level (cross-org) admin. Matches Role.ADMIN. */
export const admin = ac.newRole({
  ...statement,
});

/** SchoolRole.SCHOOL_ADMIN — full access within their own organization. */
export const schoolAdmin = ac.newRole({
  ...statement,
});

/**
 * SchoolRole.PRINCIPAL — near-full access; excluded from raw payroll/ledger edits.
 * Defined as a plain object (not read back via ac.newRole().statements) so it can
 * be reused for vicePrincipal without depending on newRole()'s internal return shape.
 */
const principalPermissions = {
  organization: ["update"],
  member: ["create", "update", "delete"],
  invitation: ["create", "cancel"],
  academicStructure: ["create", "read", "update", "delete"],
  timetable: ["create", "read", "update", "delete"],
  student: ["create", "read", "update", "delete", "transfer", "promote", "manageActivities"],
  studentDocument: ["create", "read", "update", "delete"],
  disciplinaryRecord: ["create", "read", "update", "delete"],
  healthRecord: ["read"],
  guardian: ["create", "read", "update", "linkStudent"],
  staff: ["create", "read", "update"],
  employeeRecord: ["read"],
  performanceReview: ["create", "read", "update"],
  studentAttendance: ["read", "update"],
  staffAttendance: ["read"],
  leaveRequest: ["read", "approve", "reject"],
  exam: ["create", "read", "update", "delete"],
  examResult: ["read", "publish"],
  feeStructure: ["read"],
  invoice: ["read"],
  receipt: ["read"],
  feeDiscount: ["read", "approve"],
  transport: ["read"],
  hostel: ["read"],
  library: ["read"],
  inventory: ["read"],
  ledger: ["read"],
  payroll: ["read"],
  notice: ["create", "read", "update", "delete", "publish"],
  communication: ["send", "read"],
  homework: ["read"],
  homeworkSubmission: ["read"],
  lessonPlan: ["read"],
  schoolEvent: ["create", "read", "update", "delete"],
  document: ["create", "read", "update", "delete"],
  auditLog: ["read"],
  report: ["read", "export"],
} as const;

export const principal = ac.newRole(principalPermissions);

/** SchoolRole.VICE_PRINCIPAL — same shape as principal, narrower defaults left to app config. */
export const vicePrincipal = ac.newRole(principalPermissions);

/** SchoolRole.REGISTRAR — owns admissions, enrollment, records, documents. */
export const registrar = ac.newRole({
  academicStructure: ["read"],
  timetable: ["read"],
  student: ["create", "read", "update", "transfer", "promote", "manageActivities"],
  studentDocument: ["create", "read", "update", "delete"],
  disciplinaryRecord: ["create", "read", "update"],
  healthRecord: ["read"],
  guardian: ["create", "read", "update", "linkStudent"],
  staff: ["read"],
  studentAttendance: ["read"],
  exam: ["read"],
  examResult: ["read"],
  feeStructure: ["read"],
  invoice: ["read"],
  transport: ["read"],
  hostel: ["read"],
  library: ["read"],
  notice: ["create", "read"],
  communication: ["send", "read"],
  document: ["create", "read", "update", "delete"],
  report: ["read", "export"],
});

// Teaching & academic -----------------------------------------------------

/** SchoolRole.TEACHER — own class(es)/subjects scope enforced at the app layer. */
export const teacher = ac.newRole({
  academicStructure: ["read"],
  timetable: ["read"],
  student: ["read"],
  studentDocument: ["read"],
  disciplinaryRecord: ["create", "read"],
  healthRecord: ["read"],
  guardian: ["read"],
  studentAttendance: ["mark", "read", "update"],
  leaveRequest: ["create", "read"],
  exam: ["read"],
  examResult: ["create", "read", "update"],
  homework: ["create", "read", "update", "delete"],
  homeworkSubmission: ["read", "grade"],
  lessonPlan: ["create", "read", "update", "delete"],
  notice: ["read"],
  document: ["create", "read"],
  schoolEvent: ["read"],
});

// Finance & operations -----------------------------------------------------

/** SchoolRole.ACCOUNTANT — fees, payroll, ledger, inventory purchases. */
export const accountant = ac.newRole({
  student: ["read"],
  guardian: ["read"],
  feeStructure: ["create", "read", "update", "delete"],
  invoice: ["create", "read", "update", "cancel"],
  receipt: ["create", "read", "refund"],
  feeDiscount: ["create", "read"],
  inventory: ["create", "read", "update", "delete"],
  ledger: ["create", "read", "update"],
  payroll: ["create", "read", "update", "generatePayslip"],
  staff: ["read"],
  employeeRecord: ["read"],
  report: ["read", "export"],
});

/** SchoolRole.LIBRARIAN */
export const librarian = ac.newRole({
  student: ["read"],
  staff: ["read"],
  library: ["create", "read", "update", "delete", "issueBook", "returnBook"],
});

/**
 * SchoolRole.RECEPTIONIST — front-desk enquiry/admission intake, notices.
 * Added "update" on student: front desk needs to move a record from
 * ENQUIRY -> APPLIED and fill in details as an enquiry progresses, not just
 * create-and-walk-away.
 */
export const receptionist = ac.newRole({
  student: ["create", "read", "update"],
  guardian: ["create", "read"],
  staff: ["read"],
  notice: ["read"],
  communication: ["read"],
  document: ["create", "read"],
});

/** SchoolRole.TRANSPORT_MANAGER */
export const transportManager = ac.newRole({
  student: ["read"],
  staff: ["read"],
  transport: ["create", "read", "update", "delete", "assignStudent"],
});

/** SchoolRole.HOSTEL_WARDEN — own hostel scope enforced at the app layer. */
export const hostelWarden = ac.newRole({
  student: ["read"],
  hostel: ["read", "update", "allocateRoom"],
  disciplinaryRecord: ["create", "read"],
  healthRecord: ["read"],
});

/** SchoolRole.NURSE */
export const nurse = ac.newRole({
  student: ["read"],
  healthRecord: ["create", "read", "update", "delete"],
  staffAttendance: ["read"],
});

/** SchoolRole.HR — staff lifecycle + payroll structures, not day-to-day academics. */
export const hr = ac.newRole({
  staff: ["create", "read", "update", "delete"],
  employeeRecord: ["create", "read", "update", "delete"],
  performanceReview: ["create", "read", "update"],
  staffAttendance: ["read", "update"],
  leaveRequest: ["read", "approve", "reject"],
  payroll: ["create", "read", "update", "generatePayslip"],
  document: ["create", "read", "update"],
  report: ["read", "export"],
});

/** SchoolRole.SECURITY — gate/visitor logs; read-only on identity data. */
export const security = ac.newRole({
  student: ["read"],
  staff: ["read"],
  studentAttendance: ["read"],
  notice: ["read"],
});

/** SchoolRole.SUPPORT_STAFF — minimal, mostly notice/document read access. */
export const supportStaff = ac.newRole({
  notice: ["read"],
  document: ["read"],
});

// Portal users -----------------------------------------------------

/**
 * SchoolRole.STUDENT — self-scoped reads, enforced by row-level ownership at
 * the app layer. Added feeDiscount:read to match the guardian role — a
 * student should be able to see their own scholarship/discount status.
 */
export const student = ac.newRole({
  student: ["read"],
  studentAttendance: ["read"],
  exam: ["read"],
  examResult: ["read"],
  homework: ["read"],
  homeworkSubmission: ["create", "read"],
  invoice: ["read"],
  receipt: ["read"],
  feeDiscount: ["read"],
  library: ["read"],
  transport: ["read"],
  hostel: ["read"],
  notice: ["read"],
  document: ["read"],
  schoolEvent: ["read"],
});

/** SchoolRole.GUARDIAN — self-scoped reads for linked students only (app-layer enforced). */
export const guardian = ac.newRole({
  student: ["read"],
  studentAttendance: ["read"],
  exam: ["read"],
  examResult: ["read"],
  homework: ["read"],
  homeworkSubmission: ["read"],
  invoice: ["read"],
  receipt: ["read"],
  feeDiscount: ["read"],
  transport: ["read"],
  hostel: ["read"],
  notice: ["read"],
  document: ["read"],
  schoolEvent: ["read"],
  disciplinaryRecord: ["read"],
  healthRecord: ["read"],
});