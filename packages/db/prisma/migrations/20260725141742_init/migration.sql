-- CreateEnum
CREATE TYPE "Role" AS ENUM ('ADMIN', 'SCHOOL_ADMIN', 'USER');

-- CreateEnum
CREATE TYPE "SchoolRole" AS ENUM ('ADMIN', 'SCHOOL_ADMIN', 'PRINCIPAL', 'VICE_PRINCIPAL', 'REGISTRAR', 'TEACHER', 'ACCOUNTANT', 'LIBRARIAN', 'RECEPTIONIST', 'TRANSPORT_MANAGER', 'HOSTEL_WARDEN', 'NURSE', 'HR', 'SECURITY', 'SUPPORT_STAFF', 'STUDENT', 'GUARDIAN');

-- CreateEnum
CREATE TYPE "Gender" AS ENUM ('MALE', 'FEMALE', 'OTHER');

-- CreateEnum
CREATE TYPE "BloodGroup" AS ENUM ('A_POS', 'A_NEG', 'B_POS', 'B_NEG', 'AB_POS', 'AB_NEG', 'O_POS', 'O_NEG', 'UNKNOWN');

-- CreateEnum
CREATE TYPE "StudentStatus" AS ENUM ('ENQUIRY', 'APPLIED', 'ADMITTED', 'ACTIVE', 'SUSPENDED', 'TRANSFERRED_OUT', 'GRADUATED', 'WITHDRAWN', 'ALUMNI');

-- CreateEnum
CREATE TYPE "EnrollmentStatus" AS ENUM ('ACTIVE', 'PROMOTED', 'DETAINED', 'TRANSFERRED', 'WITHDRAWN', 'COMPLETED');

-- CreateEnum
CREATE TYPE "EmploymentStatus" AS ENUM ('ACTIVE', 'ON_LEAVE', 'SUSPENDED', 'RESIGNED', 'TERMINATED', 'RETIRED');

-- CreateEnum
CREATE TYPE "AttendanceStatus" AS ENUM ('PRESENT', 'ABSENT', 'LATE', 'HALF_DAY', 'ON_LEAVE', 'HOLIDAY', 'EXCUSED');

-- CreateEnum
CREATE TYPE "LeaveStatus" AS ENUM ('PENDING', 'APPROVED', 'REJECTED', 'CANCELLED');

-- CreateEnum
CREATE TYPE "InvoiceStatus" AS ENUM ('DRAFT', 'ISSUED', 'PARTIALLY_PAID', 'PAID', 'OVERDUE', 'CANCELLED', 'REFUNDED');

-- CreateEnum
CREATE TYPE "PaymentMode" AS ENUM ('CASH', 'CHEQUE', 'BANK_TRANSFER', 'UPI', 'CARD', 'ONLINE_GATEWAY', 'DD');

-- CreateEnum
CREATE TYPE "DocumentCategory" AS ENUM ('STUDENT', 'STAFF', 'SCHOOL', 'FINANCE', 'ADMISSION', 'OTHER');

-- CreateEnum
CREATE TYPE "BoardType" AS ENUM ('CBSE', 'ICSE', 'ISC', 'STATE_BOARD', 'IB', 'IGCSE', 'CUSTOM');

-- CreateEnum
CREATE TYPE "RelationType" AS ENUM ('FATHER', 'MOTHER', 'GUARDIAN', 'GRANDFATHER', 'GRANDMOTHER', 'UNCLE', 'AUNT', 'SIBLING', 'OTHER');

-- CreateEnum
CREATE TYPE "ExamCategory" AS ENUM ('UNIT_TEST', 'MID_TERM', 'FINAL_TERM', 'PRACTICAL', 'INTERNAL_ASSESSMENT', 'BOARD_EXAM', 'SURPRISE_TEST');

-- CreateEnum
CREATE TYPE "AssetCondition" AS ENUM ('NEW', 'GOOD', 'FAIR', 'DAMAGED', 'DISPOSED');

-- CreateEnum
CREATE TYPE "NoticeAudience" AS ENUM ('ALL', 'STUDENTS', 'GUARDIANS', 'STAFF', 'TEACHERS', 'SPECIFIC_CLASS');

-- CreateEnum
CREATE TYPE "MessageChannel" AS ENUM ('SMS', 'EMAIL', 'WHATSAPP', 'PUSH', 'IN_APP');

-- CreateTable
CREATE TABLE "user" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "emailVerified" BOOLEAN NOT NULL DEFAULT false,
    "image" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "twoFactorEnabled" BOOLEAN DEFAULT false,
    "username" TEXT,
    "displayUsername" TEXT,
    "role" "Role",
    "banned" BOOLEAN DEFAULT false,
    "banReason" TEXT,
    "banExpires" TIMESTAMP(3),

    CONSTRAINT "user_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "session" (
    "id" TEXT NOT NULL,
    "expiresAt" TIMESTAMP(3) NOT NULL,
    "token" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "ipAddress" TEXT,
    "userAgent" TEXT,
    "userId" TEXT NOT NULL,
    "impersonatedBy" TEXT,
    "activeOrganizationId" TEXT,
    "activeTeamId" TEXT,

    CONSTRAINT "session_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "account" (
    "id" TEXT NOT NULL,
    "accountId" TEXT NOT NULL,
    "providerId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "accessToken" TEXT,
    "refreshToken" TEXT,
    "idToken" TEXT,
    "accessTokenExpiresAt" TIMESTAMP(3),
    "refreshTokenExpiresAt" TIMESTAMP(3),
    "scope" TEXT,
    "password" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "account_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "verification" (
    "id" TEXT NOT NULL,
    "identifier" TEXT NOT NULL,
    "value" TEXT NOT NULL,
    "expiresAt" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "verification_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "twoFactor" (
    "id" TEXT NOT NULL,
    "secret" TEXT NOT NULL,
    "backupCodes" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "verified" BOOLEAN DEFAULT true,
    "failedVerificationCount" INTEGER DEFAULT 0,
    "lockedUntil" TIMESTAMP(3),

    CONSTRAINT "twoFactor_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "organization" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "logo" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL,
    "metadata" TEXT,

    CONSTRAINT "organization_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "organizationRole" (
    "id" TEXT NOT NULL,
    "organizationId" TEXT NOT NULL,
    "role" "SchoolRole" NOT NULL,
    "permission" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),

    CONSTRAINT "organizationRole_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "team" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "organizationId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL,
    "updatedAt" TIMESTAMP(3),

    CONSTRAINT "team_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "teamMember" (
    "id" TEXT NOT NULL,
    "teamId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3),

    CONSTRAINT "teamMember_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "member" (
    "id" TEXT NOT NULL,
    "organizationId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "role" "SchoolRole" NOT NULL DEFAULT 'STUDENT',
    "createdAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "member_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "invitation" (
    "id" TEXT NOT NULL,
    "organizationId" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "role" "SchoolRole",
    "teamId" TEXT,
    "status" TEXT NOT NULL DEFAULT 'pending',
    "expiresAt" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "inviterId" TEXT NOT NULL,

    CONSTRAINT "invitation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "board" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "type" "BoardType" NOT NULL,
    "organizationId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "board_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "gradeLevel" (
    "id" TEXT NOT NULL,
    "organizationId" TEXT NOT NULL,
    "boardId" TEXT,
    "name" TEXT NOT NULL,
    "sequence" INTEGER NOT NULL,
    "stageLabel" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "gradeLevel_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "academicYear" (
    "id" TEXT NOT NULL,
    "organizationId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "startDate" TIMESTAMP(3) NOT NULL,
    "endDate" TIMESTAMP(3) NOT NULL,
    "isCurrent" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "academicYear_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "term" (
    "id" TEXT NOT NULL,
    "organizationId" TEXT NOT NULL,
    "academicYearId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "startDate" TIMESTAMP(3) NOT NULL,
    "endDate" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "term_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "campus" (
    "id" TEXT NOT NULL,
    "organizationId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "address" TEXT,
    "isPrimary" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "campus_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "classSection" (
    "id" TEXT NOT NULL,
    "organizationId" TEXT NOT NULL,
    "academicYearId" TEXT NOT NULL,
    "gradeLevelId" TEXT NOT NULL,
    "campusId" TEXT,
    "name" TEXT NOT NULL,
    "stream" TEXT,
    "capacity" INTEGER NOT NULL DEFAULT 40,
    "currentCount" INTEGER NOT NULL DEFAULT 0,
    "classTeacherId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "classSection_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "subject" (
    "id" TEXT NOT NULL,
    "organizationId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "isElective" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "subject_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "subjectGroup" (
    "id" TEXT NOT NULL,
    "organizationId" TEXT NOT NULL,
    "classSectionId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "isElectiveGroup" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "subjectGroup_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "subjectGroupSubject" (
    "id" TEXT NOT NULL,
    "subjectGroupId" TEXT NOT NULL,
    "subjectId" TEXT NOT NULL,

    CONSTRAINT "subjectGroupSubject_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "period" (
    "id" TEXT NOT NULL,
    "organizationId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "startTime" TEXT NOT NULL,
    "endTime" TEXT NOT NULL,
    "sequence" INTEGER NOT NULL,

    CONSTRAINT "period_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "timetable" (
    "id" TEXT NOT NULL,
    "organizationId" TEXT NOT NULL,
    "academicYearId" TEXT NOT NULL,
    "name" TEXT NOT NULL DEFAULT 'Default Timetable',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "timetable_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "timetableSlot" (
    "id" TEXT NOT NULL,
    "timetableId" TEXT NOT NULL,
    "classSectionId" TEXT NOT NULL,
    "periodId" TEXT NOT NULL,
    "subjectId" TEXT,
    "teacherId" TEXT,
    "weekday" INTEGER NOT NULL,

    CONSTRAINT "timetableSlot_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "holiday" (
    "id" TEXT NOT NULL,
    "organizationId" TEXT NOT NULL,
    "academicYearId" TEXT,
    "name" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "isWorkingDay" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "holiday_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "studentProfile" (
    "id" TEXT NOT NULL,
    "organizationId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "admissionNumber" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "dateOfBirth" TIMESTAMP(3) NOT NULL,
    "gender" "Gender" NOT NULL,
    "bloodGroup" "BloodGroup" DEFAULT 'UNKNOWN',
    "nationalIdMasked" TEXT,
    "category" TEXT,
    "religion" TEXT,
    "caste" TEXT,
    "photoUrl" TEXT,
    "previousSchool" TEXT,
    "status" "StudentStatus" NOT NULL DEFAULT 'ACTIVE',
    "admissionDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),
    "createdById" TEXT,
    "updatedById" TEXT,

    CONSTRAINT "studentProfile_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "studentEnrollment" (
    "id" TEXT NOT NULL,
    "organizationId" TEXT NOT NULL,
    "studentId" TEXT NOT NULL,
    "academicYearId" TEXT NOT NULL,
    "classSectionId" TEXT NOT NULL,
    "rollNumber" TEXT NOT NULL,
    "status" "EnrollmentStatus" NOT NULL DEFAULT 'ACTIVE',
    "enrolledAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "studentEnrollment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "sectionTransferLog" (
    "id" TEXT NOT NULL,
    "enrollmentId" TEXT NOT NULL,
    "fromClassSectionId" TEXT NOT NULL,
    "toClassSectionId" TEXT NOT NULL,
    "fromRollNumber" TEXT NOT NULL,
    "toRollNumber" TEXT NOT NULL,
    "reason" TEXT,
    "transferredAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "transferredBy" TEXT,

    CONSTRAINT "sectionTransferLog_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "studentPromotion" (
    "id" TEXT NOT NULL,
    "organizationId" TEXT NOT NULL,
    "fromEnrollmentId" TEXT NOT NULL,
    "toEnrollmentId" TEXT,
    "outcome" "EnrollmentStatus" NOT NULL,
    "remarks" TEXT,
    "processedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "studentPromotion_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "studentDocument" (
    "id" TEXT NOT NULL,
    "organizationId" TEXT NOT NULL,
    "studentId" TEXT NOT NULL,
    "documentId" TEXT NOT NULL,

    CONSTRAINT "studentDocument_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "emergencyContact" (
    "id" TEXT NOT NULL,
    "studentId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "relation" "RelationType" NOT NULL,
    "phone" TEXT NOT NULL,
    "altPhone" TEXT,
    "priority" INTEGER NOT NULL DEFAULT 1,

    CONSTRAINT "emergencyContact_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "studentMedicalInfo" (
    "id" TEXT NOT NULL,
    "studentId" TEXT NOT NULL,
    "allergies" TEXT,
    "chronicConditions" TEXT,
    "medications" TEXT,
    "doctorName" TEXT,
    "doctorPhone" TEXT,
    "insuranceInfo" TEXT,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "studentMedicalInfo_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "siblingLink" (
    "id" TEXT NOT NULL,
    "primaryId" TEXT NOT NULL,
    "siblingId" TEXT NOT NULL,
    "confirmedBy" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "siblingLink_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "house" (
    "id" TEXT NOT NULL,
    "organizationId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "colorCode" TEXT,

    CONSTRAINT "house_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "houseMembership" (
    "id" TEXT NOT NULL,
    "studentId" TEXT NOT NULL,
    "houseId" TEXT NOT NULL,
    "assignedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "houseMembership_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "club" (
    "id" TEXT NOT NULL,
    "organizationId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,

    CONSTRAINT "club_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "clubMembership" (
    "id" TEXT NOT NULL,
    "studentId" TEXT NOT NULL,
    "clubId" TEXT NOT NULL,
    "joinedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "clubMembership_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "certificate" (
    "id" TEXT NOT NULL,
    "organizationId" TEXT NOT NULL,
    "studentId" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "serialNumber" TEXT NOT NULL,
    "issuedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "issuedBy" TEXT,
    "fileUrl" TEXT,

    CONSTRAINT "certificate_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "guardian" (
    "id" TEXT NOT NULL,
    "organizationId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "altPhone" TEXT,
    "email" TEXT,
    "occupation" TEXT,
    "annualIncome" DECIMAL(12,2),
    "address" TEXT,
    "city" TEXT,
    "state" TEXT,
    "pincode" TEXT,
    "photoUrl" TEXT,
    "preferredChannel" "MessageChannel" DEFAULT 'SMS',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "guardian_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "studentGuardian" (
    "id" TEXT NOT NULL,
    "studentId" TEXT NOT NULL,
    "guardianId" TEXT NOT NULL,
    "relation" "RelationType" NOT NULL,
    "isPrimaryContact" BOOLEAN NOT NULL DEFAULT false,
    "hasPortalAccess" BOOLEAN NOT NULL DEFAULT true,
    "hasLegalCustody" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "studentGuardian_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "staffProfile" (
    "id" TEXT NOT NULL,
    "organizationId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "employeeId" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "department" TEXT,
    "designation" TEXT,
    "phone" TEXT NOT NULL,
    "email" TEXT,
    "photoUrl" TEXT,
    "dateOfBirth" TIMESTAMP(3),
    "gender" "Gender",
    "qualification" TEXT,
    "experienceYears" INTEGER,
    "joiningDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "status" "EmploymentStatus" NOT NULL DEFAULT 'ACTIVE',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "staffProfile_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "employeeRecord" (
    "id" TEXT NOT NULL,
    "organizationId" TEXT NOT NULL,
    "staffId" TEXT NOT NULL,
    "panMasked" TEXT,
    "aadhaarMasked" TEXT,
    "pfNumber" TEXT,
    "esiNumber" TEXT,
    "bankAccountMasked" TEXT,
    "bankIfsc" TEXT,
    "bankName" TEXT,
    "salaryStructureId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "employeeRecord_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "staffDocument" (
    "id" TEXT NOT NULL,
    "organizationId" TEXT NOT NULL,
    "staffId" TEXT NOT NULL,
    "documentId" TEXT NOT NULL,

    CONSTRAINT "staffDocument_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "performanceReview" (
    "id" TEXT NOT NULL,
    "organizationId" TEXT NOT NULL,
    "staffId" TEXT NOT NULL,
    "reviewPeriod" TEXT NOT NULL,
    "rating" INTEGER NOT NULL,
    "remarks" TEXT,
    "reviewedBy" TEXT,
    "reviewedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "performanceReview_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "studentAttendance" (
    "id" TEXT NOT NULL,
    "organizationId" TEXT NOT NULL,
    "studentId" TEXT NOT NULL,
    "date" DATE NOT NULL,
    "status" "AttendanceStatus" NOT NULL,
    "periodId" TEXT,
    "markedBy" TEXT,
    "biometricRef" TEXT,
    "remarks" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "studentAttendance_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "staffAttendance" (
    "id" TEXT NOT NULL,
    "organizationId" TEXT NOT NULL,
    "staffId" TEXT NOT NULL,
    "date" DATE NOT NULL,
    "status" "AttendanceStatus" NOT NULL,
    "checkIn" TIMESTAMP(3),
    "checkOut" TIMESTAMP(3),
    "biometricRef" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "staffAttendance_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "leaveRequest" (
    "id" TEXT NOT NULL,
    "organizationId" TEXT NOT NULL,
    "staffId" TEXT NOT NULL,
    "academicYearId" TEXT,
    "startDate" DATE NOT NULL,
    "endDate" DATE NOT NULL,
    "reason" TEXT,
    "status" "LeaveStatus" NOT NULL DEFAULT 'PENDING',
    "approvedBy" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "leaveRequest_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "examType" (
    "id" TEXT NOT NULL,
    "organizationId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "category" "ExamCategory" NOT NULL,
    "weightagePct" DECIMAL(5,2),

    CONSTRAINT "examType_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "examSession" (
    "id" TEXT NOT NULL,
    "organizationId" TEXT NOT NULL,
    "academicYearId" TEXT NOT NULL,
    "termId" TEXT,
    "examTypeId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "startDate" TIMESTAMP(3) NOT NULL,
    "endDate" TIMESTAMP(3) NOT NULL,
    "resultPublished" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "examSession_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "examSubject" (
    "id" TEXT NOT NULL,
    "examSessionId" TEXT NOT NULL,
    "subjectId" TEXT NOT NULL,
    "maxMarksTheory" DECIMAL(6,2) NOT NULL DEFAULT 100,
    "maxMarksPractical" DECIMAL(6,2),
    "maxMarksInternal" DECIMAL(6,2),
    "passMarks" DECIMAL(6,2) NOT NULL DEFAULT 33,
    "examDate" TIMESTAMP(3),

    CONSTRAINT "examSubject_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "examResult" (
    "id" TEXT NOT NULL,
    "organizationId" TEXT NOT NULL,
    "examSubjectId" TEXT NOT NULL,
    "studentId" TEXT NOT NULL,
    "marksTheory" DECIMAL(6,2),
    "marksPractical" DECIMAL(6,2),
    "marksInternal" DECIMAL(6,2),
    "totalMarks" DECIMAL(6,2),
    "grade" TEXT,
    "isAbsent" BOOLEAN NOT NULL DEFAULT false,
    "enteredBy" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "examResult_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "gradeScale" (
    "id" TEXT NOT NULL,
    "organizationId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "minPercentage" DECIMAL(5,2) NOT NULL,
    "maxPercentage" DECIMAL(5,2) NOT NULL,
    "grade" TEXT NOT NULL,
    "gradePoint" DECIMAL(4,2),

    CONSTRAINT "gradeScale_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "feeCategory" (
    "id" TEXT NOT NULL,
    "organizationId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "isRefundable" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "feeCategory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "feeStructure" (
    "id" TEXT NOT NULL,
    "organizationId" TEXT NOT NULL,
    "academicYearId" TEXT NOT NULL,
    "gradeLevelId" TEXT,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "feeStructure_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "feeStructureItem" (
    "id" TEXT NOT NULL,
    "feeStructureId" TEXT NOT NULL,
    "feeCategoryId" TEXT NOT NULL,
    "amount" DECIMAL(12,2) NOT NULL,
    "installmentNumber" INTEGER NOT NULL DEFAULT 1,
    "dueDate" TIMESTAMP(3),

    CONSTRAINT "feeStructureItem_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "invoice" (
    "id" TEXT NOT NULL,
    "organizationId" TEXT NOT NULL,
    "studentId" TEXT NOT NULL,
    "invoiceNumber" TEXT NOT NULL,
    "totalAmount" DECIMAL(12,2) NOT NULL,
    "discountAmount" DECIMAL(12,2) NOT NULL DEFAULT 0,
    "fineAmount" DECIMAL(12,2) NOT NULL DEFAULT 0,
    "paidAmount" DECIMAL(12,2) NOT NULL DEFAULT 0,
    "status" "InvoiceStatus" NOT NULL DEFAULT 'ISSUED',
    "dueDate" TIMESTAMP(3) NOT NULL,
    "issuedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "invoice_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "invoiceLineItem" (
    "id" TEXT NOT NULL,
    "invoiceId" TEXT NOT NULL,
    "feeStructureItemId" TEXT,
    "description" TEXT NOT NULL,
    "amount" DECIMAL(12,2) NOT NULL,

    CONSTRAINT "invoiceLineItem_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "receipt" (
    "id" TEXT NOT NULL,
    "organizationId" TEXT NOT NULL,
    "invoiceId" TEXT NOT NULL,
    "receiptNumber" TEXT NOT NULL,
    "amountPaid" DECIMAL(12,2) NOT NULL,
    "paymentMode" "PaymentMode" NOT NULL,
    "transactionRef" TEXT,
    "paidAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "refundedAmount" DECIMAL(12,2) NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "receipt_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "studentFeeDiscount" (
    "id" TEXT NOT NULL,
    "organizationId" TEXT NOT NULL,
    "studentId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "discountType" TEXT NOT NULL,
    "value" DECIMAL(12,2) NOT NULL,
    "academicYearId" TEXT,
    "approvedBy" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "studentFeeDiscount_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "transportRoute" (
    "id" TEXT NOT NULL,
    "organizationId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "transportRoute_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "transportStop" (
    "id" TEXT NOT NULL,
    "routeId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "sequence" INTEGER NOT NULL,
    "pickupTime" TEXT,
    "dropTime" TEXT,

    CONSTRAINT "transportStop_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "vehicle" (
    "id" TEXT NOT NULL,
    "organizationId" TEXT NOT NULL,
    "vehicleNumber" TEXT NOT NULL,
    "capacity" INTEGER NOT NULL,
    "gpsDeviceId" TEXT,

    CONSTRAINT "vehicle_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "vehicleAssignment" (
    "id" TEXT NOT NULL,
    "organizationId" TEXT NOT NULL,
    "vehicleId" TEXT NOT NULL,
    "routeId" TEXT NOT NULL,
    "driverId" TEXT,
    "effectiveFrom" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "effectiveTo" TIMESTAMP(3),

    CONSTRAINT "vehicleAssignment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "studentTransportAssignment" (
    "id" TEXT NOT NULL,
    "organizationId" TEXT NOT NULL,
    "studentId" TEXT NOT NULL,
    "routeId" TEXT NOT NULL,
    "stopId" TEXT NOT NULL,
    "effectiveFrom" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "effectiveTo" TIMESTAMP(3),

    CONSTRAINT "studentTransportAssignment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "hostel" (
    "id" TEXT NOT NULL,
    "organizationId" TEXT NOT NULL,
    "campusId" TEXT,
    "name" TEXT NOT NULL,
    "wardenId" TEXT,

    CONSTRAINT "hostel_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "hostelRoom" (
    "id" TEXT NOT NULL,
    "organizationId" TEXT NOT NULL,
    "hostelId" TEXT NOT NULL,
    "roomNumber" TEXT NOT NULL,
    "capacity" INTEGER NOT NULL,

    CONSTRAINT "hostelRoom_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "hostelBed" (
    "id" TEXT NOT NULL,
    "roomId" TEXT NOT NULL,
    "bedNumber" TEXT NOT NULL,

    CONSTRAINT "hostelBed_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "hostelRoomAllocation" (
    "id" TEXT NOT NULL,
    "organizationId" TEXT NOT NULL,
    "studentId" TEXT NOT NULL,
    "bedId" TEXT NOT NULL,
    "checkInDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "checkOutDate" TIMESTAMP(3),

    CONSTRAINT "hostelRoomAllocation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "book" (
    "id" TEXT NOT NULL,
    "organizationId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "author" TEXT,
    "publisher" TEXT,
    "isbn" TEXT,
    "category" TEXT,
    "rack" TEXT,
    "shelf" TEXT,
    "totalCopies" INTEGER NOT NULL DEFAULT 1,
    "availableCopies" INTEGER NOT NULL DEFAULT 1,

    CONSTRAINT "book_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "libraryCard" (
    "id" TEXT NOT NULL,
    "organizationId" TEXT NOT NULL,
    "studentId" TEXT NOT NULL,
    "cardNumber" TEXT NOT NULL,
    "issuedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "isActive" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "libraryCard_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "bookIssue" (
    "id" TEXT NOT NULL,
    "organizationId" TEXT NOT NULL,
    "bookId" TEXT NOT NULL,
    "borrowerType" TEXT NOT NULL,
    "borrowerId" TEXT NOT NULL,
    "issuedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "dueDate" TIMESTAMP(3) NOT NULL,
    "returnedAt" TIMESTAMP(3),
    "fineAmount" DECIMAL(8,2) NOT NULL DEFAULT 0,

    CONSTRAINT "bookIssue_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "vendor" (
    "id" TEXT NOT NULL,
    "organizationId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "phone" TEXT,
    "email" TEXT,
    "address" TEXT,

    CONSTRAINT "vendor_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "asset" (
    "id" TEXT NOT NULL,
    "organizationId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "assetTag" TEXT NOT NULL,
    "category" TEXT,
    "condition" "AssetCondition" NOT NULL DEFAULT 'NEW',
    "purchaseId" TEXT,
    "purchaseDate" TIMESTAMP(3),
    "purchaseValue" DECIMAL(12,2),

    CONSTRAINT "asset_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "assetAssignment" (
    "id" TEXT NOT NULL,
    "assetId" TEXT NOT NULL,
    "assignedTo" TEXT NOT NULL,
    "assignedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "returnedAt" TIMESTAMP(3),

    CONSTRAINT "assetAssignment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "assetMaintenance" (
    "id" TEXT NOT NULL,
    "assetId" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "cost" DECIMAL(12,2),
    "performedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "assetMaintenance_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "purchase" (
    "id" TEXT NOT NULL,
    "organizationId" TEXT NOT NULL,
    "vendorId" TEXT NOT NULL,
    "purchaseOrderNumber" TEXT NOT NULL,
    "totalAmount" DECIMAL(12,2) NOT NULL,
    "purchasedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "purchase_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ledgerEntry" (
    "id" TEXT NOT NULL,
    "organizationId" TEXT NOT NULL,
    "entryType" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "amount" DECIMAL(12,2) NOT NULL,
    "description" TEXT NOT NULL,
    "referenceType" TEXT,
    "referenceId" TEXT,
    "postedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ledgerEntry_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "budget" (
    "id" TEXT NOT NULL,
    "organizationId" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "allocatedAmount" DECIMAL(12,2) NOT NULL,
    "spentAmount" DECIMAL(12,2) NOT NULL DEFAULT 0,
    "fiscalYear" TEXT NOT NULL,

    CONSTRAINT "budget_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "salaryStructure" (
    "id" TEXT NOT NULL,
    "organizationId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "basicPay" DECIMAL(12,2) NOT NULL,
    "allowancesJson" TEXT,

    CONSTRAINT "salaryStructure_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "payslip" (
    "id" TEXT NOT NULL,
    "organizationId" TEXT NOT NULL,
    "staffId" TEXT NOT NULL,
    "salaryStructureId" TEXT,
    "month" INTEGER NOT NULL,
    "year" INTEGER NOT NULL,
    "grossPay" DECIMAL(12,2) NOT NULL,
    "totalDeductions" DECIMAL(12,2) NOT NULL DEFAULT 0,
    "netPay" DECIMAL(12,2) NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'GENERATED',
    "generatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "payslip_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "notice" (
    "id" TEXT NOT NULL,
    "organizationId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "body" TEXT NOT NULL,
    "audience" "NoticeAudience" NOT NULL DEFAULT 'ALL',
    "publishedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdBy" TEXT,

    CONSTRAINT "notice_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "messageTemplate" (
    "id" TEXT NOT NULL,
    "organizationId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "channel" "MessageChannel" NOT NULL,
    "body" TEXT NOT NULL,

    CONSTRAINT "messageTemplate_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "messageLog" (
    "id" TEXT NOT NULL,
    "organizationId" TEXT NOT NULL,
    "channel" "MessageChannel" NOT NULL,
    "recipientType" TEXT NOT NULL,
    "recipientId" TEXT NOT NULL,
    "templateId" TEXT,
    "content" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'SENT',
    "sentAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "messageLog_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "homework" (
    "id" TEXT NOT NULL,
    "organizationId" TEXT NOT NULL,
    "classSectionId" TEXT NOT NULL,
    "subjectId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "assignedDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "dueDate" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "homework_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "homeworkSubmission" (
    "id" TEXT NOT NULL,
    "homeworkId" TEXT NOT NULL,
    "studentId" TEXT NOT NULL,
    "attachmentUrl" TEXT,
    "submittedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "gradedById" TEXT,
    "score" DECIMAL(6,2),
    "teacherRemarks" TEXT,

    CONSTRAINT "homeworkSubmission_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "lessonPlan" (
    "id" TEXT NOT NULL,
    "organizationId" TEXT NOT NULL,
    "classSectionId" TEXT NOT NULL,
    "subjectId" TEXT NOT NULL,
    "teacherId" TEXT NOT NULL,
    "topic" TEXT NOT NULL,
    "syllabusRef" TEXT,
    "plannedDate" TIMESTAMP(3) NOT NULL,
    "materialUrl" TEXT,

    CONSTRAINT "lessonPlan_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "schoolEvent" (
    "id" TEXT NOT NULL,
    "organizationId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "eventType" TEXT,
    "startDate" TIMESTAMP(3) NOT NULL,
    "endDate" TIMESTAMP(3),
    "location" TEXT,

    CONSTRAINT "schoolEvent_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "disciplinaryRecord" (
    "id" TEXT NOT NULL,
    "organizationId" TEXT NOT NULL,
    "studentId" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "raisedById" TEXT,
    "actionTaken" TEXT,
    "recordedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "disciplinaryRecord_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "healthRecord" (
    "id" TEXT NOT NULL,
    "organizationId" TEXT NOT NULL,
    "studentId" TEXT NOT NULL,
    "visitType" TEXT NOT NULL,
    "notes" TEXT,
    "visitedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "attendedBy" TEXT,

    CONSTRAINT "healthRecord_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "documentRecord" (
    "id" TEXT NOT NULL,
    "organizationId" TEXT NOT NULL,
    "category" "DocumentCategory" NOT NULL,
    "name" TEXT NOT NULL,
    "fileUrl" TEXT NOT NULL,
    "uploadedBy" TEXT,
    "uploadedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "documentRecord_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "apiToken" (
    "id" TEXT NOT NULL,
    "organizationId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "tokenHash" TEXT NOT NULL,
    "scopes" TEXT,
    "lastUsedAt" TIMESTAMP(3),
    "expiresAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "revokedAt" TIMESTAMP(3),

    CONSTRAINT "apiToken_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "auditLog" (
    "id" TEXT NOT NULL,
    "organizationId" TEXT NOT NULL,
    "actorId" TEXT,
    "action" TEXT NOT NULL,
    "entityType" TEXT NOT NULL,
    "entityId" TEXT NOT NULL,
    "changesJson" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "auditLog_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "user_email_key" ON "user"("email");

-- CreateIndex
CREATE UNIQUE INDEX "user_username_key" ON "user"("username");

-- CreateIndex
CREATE INDEX "session_userId_idx" ON "session"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "session_token_key" ON "session"("token");

-- CreateIndex
CREATE INDEX "account_userId_idx" ON "account"("userId");

-- CreateIndex
CREATE INDEX "verification_identifier_idx" ON "verification"("identifier");

-- CreateIndex
CREATE INDEX "twoFactor_secret_idx" ON "twoFactor"("secret");

-- CreateIndex
CREATE INDEX "twoFactor_userId_idx" ON "twoFactor"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "organization_slug_key" ON "organization"("slug");

-- CreateIndex
CREATE INDEX "organizationRole_organizationId_idx" ON "organizationRole"("organizationId");

-- CreateIndex
CREATE INDEX "organizationRole_role_idx" ON "organizationRole"("role");

-- CreateIndex
CREATE INDEX "team_organizationId_idx" ON "team"("organizationId");

-- CreateIndex
CREATE INDEX "teamMember_teamId_idx" ON "teamMember"("teamId");

-- CreateIndex
CREATE INDEX "teamMember_userId_idx" ON "teamMember"("userId");

-- CreateIndex
CREATE INDEX "member_organizationId_idx" ON "member"("organizationId");

-- CreateIndex
CREATE INDEX "member_userId_idx" ON "member"("userId");

-- CreateIndex
CREATE INDEX "invitation_organizationId_idx" ON "invitation"("organizationId");

-- CreateIndex
CREATE INDEX "invitation_email_idx" ON "invitation"("email");

-- CreateIndex
CREATE INDEX "board_organizationId_idx" ON "board"("organizationId");

-- CreateIndex
CREATE UNIQUE INDEX "board_name_organizationId_key" ON "board"("name", "organizationId");

-- CreateIndex
CREATE INDEX "gradeLevel_organizationId_idx" ON "gradeLevel"("organizationId");

-- CreateIndex
CREATE INDEX "gradeLevel_organizationId_sequence_idx" ON "gradeLevel"("organizationId", "sequence");

-- CreateIndex
CREATE UNIQUE INDEX "gradeLevel_organizationId_name_key" ON "gradeLevel"("organizationId", "name");

-- CreateIndex
CREATE INDEX "academicYear_organizationId_idx" ON "academicYear"("organizationId");

-- CreateIndex
CREATE INDEX "academicYear_organizationId_isCurrent_idx" ON "academicYear"("organizationId", "isCurrent");

-- CreateIndex
CREATE UNIQUE INDEX "academicYear_organizationId_name_key" ON "academicYear"("organizationId", "name");

-- CreateIndex
CREATE INDEX "term_organizationId_idx" ON "term"("organizationId");

-- CreateIndex
CREATE UNIQUE INDEX "term_academicYearId_name_key" ON "term"("academicYearId", "name");

-- CreateIndex
CREATE INDEX "campus_organizationId_idx" ON "campus"("organizationId");

-- CreateIndex
CREATE INDEX "classSection_organizationId_idx" ON "classSection"("organizationId");

-- CreateIndex
CREATE INDEX "classSection_organizationId_academicYearId_idx" ON "classSection"("organizationId", "academicYearId");

-- CreateIndex
CREATE UNIQUE INDEX "classSection_academicYearId_gradeLevelId_name_key" ON "classSection"("academicYearId", "gradeLevelId", "name");

-- CreateIndex
CREATE INDEX "subject_organizationId_idx" ON "subject"("organizationId");

-- CreateIndex
CREATE UNIQUE INDEX "subject_organizationId_code_key" ON "subject"("organizationId", "code");

-- CreateIndex
CREATE INDEX "subjectGroup_organizationId_idx" ON "subjectGroup"("organizationId");

-- CreateIndex
CREATE INDEX "subjectGroup_classSectionId_idx" ON "subjectGroup"("classSectionId");

-- CreateIndex
CREATE UNIQUE INDEX "subjectGroupSubject_subjectGroupId_subjectId_key" ON "subjectGroupSubject"("subjectGroupId", "subjectId");

-- CreateIndex
CREATE INDEX "period_organizationId_idx" ON "period"("organizationId");

-- CreateIndex
CREATE UNIQUE INDEX "period_organizationId_sequence_key" ON "period"("organizationId", "sequence");

-- CreateIndex
CREATE INDEX "timetable_organizationId_idx" ON "timetable"("organizationId");

-- CreateIndex
CREATE INDEX "timetableSlot_teacherId_weekday_idx" ON "timetableSlot"("teacherId", "weekday");

-- CreateIndex
CREATE UNIQUE INDEX "timetableSlot_classSectionId_periodId_weekday_key" ON "timetableSlot"("classSectionId", "periodId", "weekday");

-- CreateIndex
CREATE INDEX "holiday_organizationId_idx" ON "holiday"("organizationId");

-- CreateIndex
CREATE UNIQUE INDEX "holiday_organizationId_date_key" ON "holiday"("organizationId", "date");

-- CreateIndex
CREATE INDEX "studentProfile_organizationId_idx" ON "studentProfile"("organizationId");

-- CreateIndex
CREATE INDEX "studentProfile_organizationId_status_idx" ON "studentProfile"("organizationId", "status");

-- CreateIndex
CREATE INDEX "studentProfile_dateOfBirth_idx" ON "studentProfile"("dateOfBirth");

-- CreateIndex
CREATE UNIQUE INDEX "studentProfile_organizationId_admissionNumber_key" ON "studentProfile"("organizationId", "admissionNumber");

-- CreateIndex
CREATE UNIQUE INDEX "studentProfile_organizationId_userId_key" ON "studentProfile"("organizationId", "userId");

-- CreateIndex
CREATE INDEX "studentEnrollment_organizationId_idx" ON "studentEnrollment"("organizationId");

-- CreateIndex
CREATE INDEX "studentEnrollment_organizationId_academicYearId_idx" ON "studentEnrollment"("organizationId", "academicYearId");

-- CreateIndex
CREATE UNIQUE INDEX "studentEnrollment_classSectionId_rollNumber_key" ON "studentEnrollment"("classSectionId", "rollNumber");

-- CreateIndex
CREATE UNIQUE INDEX "studentEnrollment_studentId_academicYearId_key" ON "studentEnrollment"("studentId", "academicYearId");

-- CreateIndex
CREATE INDEX "sectionTransferLog_enrollmentId_idx" ON "sectionTransferLog"("enrollmentId");

-- CreateIndex
CREATE INDEX "studentPromotion_organizationId_idx" ON "studentPromotion"("organizationId");

-- CreateIndex
CREATE UNIQUE INDEX "studentDocument_documentId_key" ON "studentDocument"("documentId");

-- CreateIndex
CREATE INDEX "studentDocument_organizationId_idx" ON "studentDocument"("organizationId");

-- CreateIndex
CREATE INDEX "studentDocument_studentId_idx" ON "studentDocument"("studentId");

-- CreateIndex
CREATE INDEX "emergencyContact_studentId_idx" ON "emergencyContact"("studentId");

-- CreateIndex
CREATE UNIQUE INDEX "studentMedicalInfo_studentId_key" ON "studentMedicalInfo"("studentId");

-- CreateIndex
CREATE UNIQUE INDEX "siblingLink_primaryId_siblingId_key" ON "siblingLink"("primaryId", "siblingId");

-- CreateIndex
CREATE INDEX "house_organizationId_idx" ON "house"("organizationId");

-- CreateIndex
CREATE UNIQUE INDEX "house_organizationId_name_key" ON "house"("organizationId", "name");

-- CreateIndex
CREATE UNIQUE INDEX "houseMembership_studentId_key" ON "houseMembership"("studentId");

-- CreateIndex
CREATE INDEX "houseMembership_houseId_idx" ON "houseMembership"("houseId");

-- CreateIndex
CREATE INDEX "club_organizationId_idx" ON "club"("organizationId");

-- CreateIndex
CREATE UNIQUE INDEX "clubMembership_studentId_clubId_key" ON "clubMembership"("studentId", "clubId");

-- CreateIndex
CREATE INDEX "certificate_studentId_idx" ON "certificate"("studentId");

-- CreateIndex
CREATE UNIQUE INDEX "certificate_organizationId_type_serialNumber_key" ON "certificate"("organizationId", "type", "serialNumber");

-- CreateIndex
CREATE INDEX "guardian_organizationId_idx" ON "guardian"("organizationId");

-- CreateIndex
CREATE INDEX "guardian_phone_idx" ON "guardian"("phone");

-- CreateIndex
CREATE INDEX "guardian_email_idx" ON "guardian"("email");

-- CreateIndex
CREATE UNIQUE INDEX "guardian_organizationId_userId_key" ON "guardian"("organizationId", "userId");

-- CreateIndex
CREATE INDEX "studentGuardian_guardianId_idx" ON "studentGuardian"("guardianId");

-- CreateIndex
CREATE INDEX "studentGuardian_studentId_idx" ON "studentGuardian"("studentId");

-- CreateIndex
CREATE UNIQUE INDEX "studentGuardian_studentId_guardianId_key" ON "studentGuardian"("studentId", "guardianId");

-- CreateIndex
CREATE INDEX "staffProfile_organizationId_idx" ON "staffProfile"("organizationId");

-- CreateIndex
CREATE INDEX "staffProfile_organizationId_status_idx" ON "staffProfile"("organizationId", "status");

-- CreateIndex
CREATE UNIQUE INDEX "staffProfile_organizationId_employeeId_key" ON "staffProfile"("organizationId", "employeeId");

-- CreateIndex
CREATE UNIQUE INDEX "staffProfile_organizationId_userId_key" ON "staffProfile"("organizationId", "userId");

-- CreateIndex
CREATE UNIQUE INDEX "employeeRecord_staffId_key" ON "employeeRecord"("staffId");

-- CreateIndex
CREATE INDEX "employeeRecord_organizationId_idx" ON "employeeRecord"("organizationId");

-- CreateIndex
CREATE UNIQUE INDEX "staffDocument_documentId_key" ON "staffDocument"("documentId");

-- CreateIndex
CREATE INDEX "staffDocument_organizationId_idx" ON "staffDocument"("organizationId");

-- CreateIndex
CREATE INDEX "staffDocument_staffId_idx" ON "staffDocument"("staffId");

-- CreateIndex
CREATE INDEX "performanceReview_organizationId_idx" ON "performanceReview"("organizationId");

-- CreateIndex
CREATE INDEX "performanceReview_staffId_idx" ON "performanceReview"("staffId");

-- CreateIndex
CREATE INDEX "studentAttendance_organizationId_date_idx" ON "studentAttendance"("organizationId", "date");

-- CreateIndex
CREATE INDEX "studentAttendance_studentId_date_idx" ON "studentAttendance"("studentId", "date");

-- CreateIndex
CREATE UNIQUE INDEX "studentAttendance_studentId_date_periodId_key" ON "studentAttendance"("studentId", "date", "periodId");

-- CreateIndex
CREATE INDEX "staffAttendance_organizationId_date_idx" ON "staffAttendance"("organizationId", "date");

-- CreateIndex
CREATE UNIQUE INDEX "staffAttendance_staffId_date_key" ON "staffAttendance"("staffId", "date");

-- CreateIndex
CREATE INDEX "leaveRequest_organizationId_idx" ON "leaveRequest"("organizationId");

-- CreateIndex
CREATE INDEX "leaveRequest_staffId_status_idx" ON "leaveRequest"("staffId", "status");

-- CreateIndex
CREATE INDEX "examType_organizationId_idx" ON "examType"("organizationId");

-- CreateIndex
CREATE UNIQUE INDEX "examType_organizationId_name_key" ON "examType"("organizationId", "name");

-- CreateIndex
CREATE INDEX "examSession_organizationId_idx" ON "examSession"("organizationId");

-- CreateIndex
CREATE INDEX "examSession_organizationId_academicYearId_idx" ON "examSession"("organizationId", "academicYearId");

-- CreateIndex
CREATE UNIQUE INDEX "examSubject_examSessionId_subjectId_key" ON "examSubject"("examSessionId", "subjectId");

-- CreateIndex
CREATE INDEX "examResult_organizationId_idx" ON "examResult"("organizationId");

-- CreateIndex
CREATE INDEX "examResult_studentId_idx" ON "examResult"("studentId");

-- CreateIndex
CREATE UNIQUE INDEX "examResult_examSubjectId_studentId_key" ON "examResult"("examSubjectId", "studentId");

-- CreateIndex
CREATE INDEX "gradeScale_organizationId_idx" ON "gradeScale"("organizationId");

-- CreateIndex
CREATE UNIQUE INDEX "gradeScale_organizationId_name_grade_key" ON "gradeScale"("organizationId", "name", "grade");

-- CreateIndex
CREATE INDEX "feeCategory_organizationId_idx" ON "feeCategory"("organizationId");

-- CreateIndex
CREATE UNIQUE INDEX "feeCategory_organizationId_name_key" ON "feeCategory"("organizationId", "name");

-- CreateIndex
CREATE INDEX "feeStructure_organizationId_idx" ON "feeStructure"("organizationId");

-- CreateIndex
CREATE INDEX "feeStructure_organizationId_academicYearId_idx" ON "feeStructure"("organizationId", "academicYearId");

-- CreateIndex
CREATE INDEX "feeStructureItem_feeStructureId_idx" ON "feeStructureItem"("feeStructureId");

-- CreateIndex
CREATE INDEX "invoice_organizationId_idx" ON "invoice"("organizationId");

-- CreateIndex
CREATE INDEX "invoice_studentId_status_idx" ON "invoice"("studentId", "status");

-- CreateIndex
CREATE INDEX "invoice_dueDate_idx" ON "invoice"("dueDate");

-- CreateIndex
CREATE UNIQUE INDEX "invoice_organizationId_invoiceNumber_key" ON "invoice"("organizationId", "invoiceNumber");

-- CreateIndex
CREATE INDEX "invoiceLineItem_invoiceId_idx" ON "invoiceLineItem"("invoiceId");

-- CreateIndex
CREATE INDEX "receipt_organizationId_idx" ON "receipt"("organizationId");

-- CreateIndex
CREATE INDEX "receipt_invoiceId_idx" ON "receipt"("invoiceId");

-- CreateIndex
CREATE UNIQUE INDEX "receipt_organizationId_receiptNumber_key" ON "receipt"("organizationId", "receiptNumber");

-- CreateIndex
CREATE INDEX "studentFeeDiscount_organizationId_idx" ON "studentFeeDiscount"("organizationId");

-- CreateIndex
CREATE INDEX "studentFeeDiscount_studentId_idx" ON "studentFeeDiscount"("studentId");

-- CreateIndex
CREATE INDEX "transportRoute_organizationId_idx" ON "transportRoute"("organizationId");

-- CreateIndex
CREATE UNIQUE INDEX "transportStop_routeId_sequence_key" ON "transportStop"("routeId", "sequence");

-- CreateIndex
CREATE INDEX "vehicle_organizationId_idx" ON "vehicle"("organizationId");

-- CreateIndex
CREATE UNIQUE INDEX "vehicle_organizationId_vehicleNumber_key" ON "vehicle"("organizationId", "vehicleNumber");

-- CreateIndex
CREATE INDEX "vehicleAssignment_organizationId_idx" ON "vehicleAssignment"("organizationId");

-- CreateIndex
CREATE INDEX "vehicleAssignment_vehicleId_idx" ON "vehicleAssignment"("vehicleId");

-- CreateIndex
CREATE INDEX "studentTransportAssignment_organizationId_idx" ON "studentTransportAssignment"("organizationId");

-- CreateIndex
CREATE INDEX "studentTransportAssignment_studentId_idx" ON "studentTransportAssignment"("studentId");

-- CreateIndex
CREATE INDEX "hostel_organizationId_idx" ON "hostel"("organizationId");

-- CreateIndex
CREATE INDEX "hostelRoom_organizationId_idx" ON "hostelRoom"("organizationId");

-- CreateIndex
CREATE UNIQUE INDEX "hostelRoom_hostelId_roomNumber_key" ON "hostelRoom"("hostelId", "roomNumber");

-- CreateIndex
CREATE UNIQUE INDEX "hostelBed_roomId_bedNumber_key" ON "hostelBed"("roomId", "bedNumber");

-- CreateIndex
CREATE INDEX "hostelRoomAllocation_organizationId_idx" ON "hostelRoomAllocation"("organizationId");

-- CreateIndex
CREATE INDEX "hostelRoomAllocation_studentId_idx" ON "hostelRoomAllocation"("studentId");

-- CreateIndex
CREATE INDEX "book_organizationId_idx" ON "book"("organizationId");

-- CreateIndex
CREATE INDEX "book_organizationId_isbn_idx" ON "book"("organizationId", "isbn");

-- CreateIndex
CREATE UNIQUE INDEX "libraryCard_studentId_key" ON "libraryCard"("studentId");

-- CreateIndex
CREATE UNIQUE INDEX "libraryCard_organizationId_cardNumber_key" ON "libraryCard"("organizationId", "cardNumber");

-- CreateIndex
CREATE INDEX "bookIssue_organizationId_idx" ON "bookIssue"("organizationId");

-- CreateIndex
CREATE INDEX "bookIssue_bookId_idx" ON "bookIssue"("bookId");

-- CreateIndex
CREATE INDEX "bookIssue_borrowerType_borrowerId_idx" ON "bookIssue"("borrowerType", "borrowerId");

-- CreateIndex
CREATE INDEX "vendor_organizationId_idx" ON "vendor"("organizationId");

-- CreateIndex
CREATE INDEX "asset_organizationId_idx" ON "asset"("organizationId");

-- CreateIndex
CREATE UNIQUE INDEX "asset_organizationId_assetTag_key" ON "asset"("organizationId", "assetTag");

-- CreateIndex
CREATE INDEX "assetAssignment_assetId_idx" ON "assetAssignment"("assetId");

-- CreateIndex
CREATE INDEX "assetMaintenance_assetId_idx" ON "assetMaintenance"("assetId");

-- CreateIndex
CREATE INDEX "purchase_organizationId_idx" ON "purchase"("organizationId");

-- CreateIndex
CREATE UNIQUE INDEX "purchase_organizationId_purchaseOrderNumber_key" ON "purchase"("organizationId", "purchaseOrderNumber");

-- CreateIndex
CREATE INDEX "ledgerEntry_organizationId_idx" ON "ledgerEntry"("organizationId");

-- CreateIndex
CREATE INDEX "ledgerEntry_organizationId_postedAt_idx" ON "ledgerEntry"("organizationId", "postedAt");

-- CreateIndex
CREATE INDEX "ledgerEntry_referenceType_referenceId_idx" ON "ledgerEntry"("referenceType", "referenceId");

-- CreateIndex
CREATE INDEX "budget_organizationId_idx" ON "budget"("organizationId");

-- CreateIndex
CREATE UNIQUE INDEX "budget_organizationId_category_fiscalYear_key" ON "budget"("organizationId", "category", "fiscalYear");

-- CreateIndex
CREATE INDEX "salaryStructure_organizationId_idx" ON "salaryStructure"("organizationId");

-- CreateIndex
CREATE INDEX "payslip_organizationId_idx" ON "payslip"("organizationId");

-- CreateIndex
CREATE UNIQUE INDEX "payslip_staffId_month_year_key" ON "payslip"("staffId", "month", "year");

-- CreateIndex
CREATE INDEX "notice_organizationId_idx" ON "notice"("organizationId");

-- CreateIndex
CREATE INDEX "notice_organizationId_publishedAt_idx" ON "notice"("organizationId", "publishedAt");

-- CreateIndex
CREATE UNIQUE INDEX "messageTemplate_organizationId_name_key" ON "messageTemplate"("organizationId", "name");

-- CreateIndex
CREATE INDEX "messageLog_organizationId_idx" ON "messageLog"("organizationId");

-- CreateIndex
CREATE INDEX "messageLog_recipientType_recipientId_idx" ON "messageLog"("recipientType", "recipientId");

-- CreateIndex
CREATE INDEX "homework_organizationId_idx" ON "homework"("organizationId");

-- CreateIndex
CREATE INDEX "homework_classSectionId_idx" ON "homework"("classSectionId");

-- CreateIndex
CREATE INDEX "homeworkSubmission_studentId_idx" ON "homeworkSubmission"("studentId");

-- CreateIndex
CREATE UNIQUE INDEX "homeworkSubmission_homeworkId_studentId_key" ON "homeworkSubmission"("homeworkId", "studentId");

-- CreateIndex
CREATE INDEX "lessonPlan_organizationId_idx" ON "lessonPlan"("organizationId");

-- CreateIndex
CREATE INDEX "lessonPlan_classSectionId_idx" ON "lessonPlan"("classSectionId");

-- CreateIndex
CREATE INDEX "schoolEvent_organizationId_idx" ON "schoolEvent"("organizationId");

-- CreateIndex
CREATE INDEX "schoolEvent_organizationId_startDate_idx" ON "schoolEvent"("organizationId", "startDate");

-- CreateIndex
CREATE INDEX "disciplinaryRecord_organizationId_idx" ON "disciplinaryRecord"("organizationId");

-- CreateIndex
CREATE INDEX "disciplinaryRecord_studentId_idx" ON "disciplinaryRecord"("studentId");

-- CreateIndex
CREATE INDEX "healthRecord_organizationId_idx" ON "healthRecord"("organizationId");

-- CreateIndex
CREATE INDEX "healthRecord_studentId_idx" ON "healthRecord"("studentId");

-- CreateIndex
CREATE INDEX "documentRecord_organizationId_idx" ON "documentRecord"("organizationId");

-- CreateIndex
CREATE INDEX "documentRecord_organizationId_category_idx" ON "documentRecord"("organizationId", "category");

-- CreateIndex
CREATE UNIQUE INDEX "apiToken_tokenHash_key" ON "apiToken"("tokenHash");

-- CreateIndex
CREATE INDEX "apiToken_organizationId_idx" ON "apiToken"("organizationId");

-- CreateIndex
CREATE INDEX "auditLog_organizationId_idx" ON "auditLog"("organizationId");

-- CreateIndex
CREATE INDEX "auditLog_entityType_entityId_idx" ON "auditLog"("entityType", "entityId");

-- CreateIndex
CREATE INDEX "auditLog_organizationId_createdAt_idx" ON "auditLog"("organizationId", "createdAt");

-- AddForeignKey
ALTER TABLE "session" ADD CONSTRAINT "session_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "account" ADD CONSTRAINT "account_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "twoFactor" ADD CONSTRAINT "twoFactor_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "organizationRole" ADD CONSTRAINT "organizationRole_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "organization"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "team" ADD CONSTRAINT "team_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "organization"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "teamMember" ADD CONSTRAINT "teamMember_teamId_fkey" FOREIGN KEY ("teamId") REFERENCES "team"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "teamMember" ADD CONSTRAINT "teamMember_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "member" ADD CONSTRAINT "member_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "organization"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "member" ADD CONSTRAINT "member_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "invitation" ADD CONSTRAINT "invitation_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "organization"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "invitation" ADD CONSTRAINT "invitation_inviterId_fkey" FOREIGN KEY ("inviterId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "board" ADD CONSTRAINT "board_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "organization"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "gradeLevel" ADD CONSTRAINT "gradeLevel_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "organization"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "gradeLevel" ADD CONSTRAINT "gradeLevel_boardId_fkey" FOREIGN KEY ("boardId") REFERENCES "board"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "academicYear" ADD CONSTRAINT "academicYear_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "organization"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "term" ADD CONSTRAINT "term_academicYearId_fkey" FOREIGN KEY ("academicYearId") REFERENCES "academicYear"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "campus" ADD CONSTRAINT "campus_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "organization"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "classSection" ADD CONSTRAINT "classSection_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "organization"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "classSection" ADD CONSTRAINT "classSection_academicYearId_fkey" FOREIGN KEY ("academicYearId") REFERENCES "academicYear"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "classSection" ADD CONSTRAINT "classSection_gradeLevelId_fkey" FOREIGN KEY ("gradeLevelId") REFERENCES "gradeLevel"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "classSection" ADD CONSTRAINT "classSection_campusId_fkey" FOREIGN KEY ("campusId") REFERENCES "campus"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "classSection" ADD CONSTRAINT "classSection_classTeacherId_fkey" FOREIGN KEY ("classTeacherId") REFERENCES "staffProfile"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "subject" ADD CONSTRAINT "subject_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "organization"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "subjectGroup" ADD CONSTRAINT "subjectGroup_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "organization"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "subjectGroup" ADD CONSTRAINT "subjectGroup_classSectionId_fkey" FOREIGN KEY ("classSectionId") REFERENCES "classSection"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "subjectGroupSubject" ADD CONSTRAINT "subjectGroupSubject_subjectGroupId_fkey" FOREIGN KEY ("subjectGroupId") REFERENCES "subjectGroup"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "subjectGroupSubject" ADD CONSTRAINT "subjectGroupSubject_subjectId_fkey" FOREIGN KEY ("subjectId") REFERENCES "subject"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "period" ADD CONSTRAINT "period_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "organization"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "timetable" ADD CONSTRAINT "timetable_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "organization"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "timetable" ADD CONSTRAINT "timetable_academicYearId_fkey" FOREIGN KEY ("academicYearId") REFERENCES "academicYear"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "timetableSlot" ADD CONSTRAINT "timetableSlot_timetableId_fkey" FOREIGN KEY ("timetableId") REFERENCES "timetable"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "timetableSlot" ADD CONSTRAINT "timetableSlot_classSectionId_fkey" FOREIGN KEY ("classSectionId") REFERENCES "classSection"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "timetableSlot" ADD CONSTRAINT "timetableSlot_periodId_fkey" FOREIGN KEY ("periodId") REFERENCES "period"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "timetableSlot" ADD CONSTRAINT "timetableSlot_subjectId_fkey" FOREIGN KEY ("subjectId") REFERENCES "subject"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "timetableSlot" ADD CONSTRAINT "timetableSlot_teacherId_fkey" FOREIGN KEY ("teacherId") REFERENCES "staffProfile"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "holiday" ADD CONSTRAINT "holiday_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "organization"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "holiday" ADD CONSTRAINT "holiday_academicYearId_fkey" FOREIGN KEY ("academicYearId") REFERENCES "academicYear"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "studentProfile" ADD CONSTRAINT "studentProfile_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "organization"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "studentProfile" ADD CONSTRAINT "studentProfile_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "studentProfile" ADD CONSTRAINT "studentProfile_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "user"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "studentProfile" ADD CONSTRAINT "studentProfile_updatedById_fkey" FOREIGN KEY ("updatedById") REFERENCES "user"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "studentEnrollment" ADD CONSTRAINT "studentEnrollment_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "organization"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "studentEnrollment" ADD CONSTRAINT "studentEnrollment_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "studentProfile"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "studentEnrollment" ADD CONSTRAINT "studentEnrollment_academicYearId_fkey" FOREIGN KEY ("academicYearId") REFERENCES "academicYear"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "studentEnrollment" ADD CONSTRAINT "studentEnrollment_classSectionId_fkey" FOREIGN KEY ("classSectionId") REFERENCES "classSection"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "sectionTransferLog" ADD CONSTRAINT "sectionTransferLog_enrollmentId_fkey" FOREIGN KEY ("enrollmentId") REFERENCES "studentEnrollment"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "studentPromotion" ADD CONSTRAINT "studentPromotion_fromEnrollmentId_fkey" FOREIGN KEY ("fromEnrollmentId") REFERENCES "studentEnrollment"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "studentPromotion" ADD CONSTRAINT "studentPromotion_toEnrollmentId_fkey" FOREIGN KEY ("toEnrollmentId") REFERENCES "studentEnrollment"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "studentDocument" ADD CONSTRAINT "studentDocument_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "studentProfile"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "studentDocument" ADD CONSTRAINT "studentDocument_documentId_fkey" FOREIGN KEY ("documentId") REFERENCES "documentRecord"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "emergencyContact" ADD CONSTRAINT "emergencyContact_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "studentProfile"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "studentMedicalInfo" ADD CONSTRAINT "studentMedicalInfo_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "studentProfile"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "siblingLink" ADD CONSTRAINT "siblingLink_primaryId_fkey" FOREIGN KEY ("primaryId") REFERENCES "studentProfile"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "siblingLink" ADD CONSTRAINT "siblingLink_siblingId_fkey" FOREIGN KEY ("siblingId") REFERENCES "studentProfile"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "house" ADD CONSTRAINT "house_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "organization"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "houseMembership" ADD CONSTRAINT "houseMembership_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "studentProfile"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "houseMembership" ADD CONSTRAINT "houseMembership_houseId_fkey" FOREIGN KEY ("houseId") REFERENCES "house"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "club" ADD CONSTRAINT "club_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "organization"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "clubMembership" ADD CONSTRAINT "clubMembership_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "studentProfile"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "clubMembership" ADD CONSTRAINT "clubMembership_clubId_fkey" FOREIGN KEY ("clubId") REFERENCES "club"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "certificate" ADD CONSTRAINT "certificate_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "studentProfile"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "guardian" ADD CONSTRAINT "guardian_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "organization"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "guardian" ADD CONSTRAINT "guardian_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "studentGuardian" ADD CONSTRAINT "studentGuardian_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "studentProfile"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "studentGuardian" ADD CONSTRAINT "studentGuardian_guardianId_fkey" FOREIGN KEY ("guardianId") REFERENCES "guardian"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "staffProfile" ADD CONSTRAINT "staffProfile_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "organization"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "staffProfile" ADD CONSTRAINT "staffProfile_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "employeeRecord" ADD CONSTRAINT "employeeRecord_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "organization"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "employeeRecord" ADD CONSTRAINT "employeeRecord_staffId_fkey" FOREIGN KEY ("staffId") REFERENCES "staffProfile"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "employeeRecord" ADD CONSTRAINT "employeeRecord_salaryStructureId_fkey" FOREIGN KEY ("salaryStructureId") REFERENCES "salaryStructure"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "staffDocument" ADD CONSTRAINT "staffDocument_staffId_fkey" FOREIGN KEY ("staffId") REFERENCES "staffProfile"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "staffDocument" ADD CONSTRAINT "staffDocument_documentId_fkey" FOREIGN KEY ("documentId") REFERENCES "documentRecord"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "performanceReview" ADD CONSTRAINT "performanceReview_staffId_fkey" FOREIGN KEY ("staffId") REFERENCES "staffProfile"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "studentAttendance" ADD CONSTRAINT "studentAttendance_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "organization"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "studentAttendance" ADD CONSTRAINT "studentAttendance_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "studentProfile"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "staffAttendance" ADD CONSTRAINT "staffAttendance_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "organization"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "staffAttendance" ADD CONSTRAINT "staffAttendance_staffId_fkey" FOREIGN KEY ("staffId") REFERENCES "staffProfile"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "leaveRequest" ADD CONSTRAINT "leaveRequest_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "organization"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "leaveRequest" ADD CONSTRAINT "leaveRequest_staffId_fkey" FOREIGN KEY ("staffId") REFERENCES "staffProfile"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "leaveRequest" ADD CONSTRAINT "leaveRequest_academicYearId_fkey" FOREIGN KEY ("academicYearId") REFERENCES "academicYear"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "examType" ADD CONSTRAINT "examType_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "organization"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "examSession" ADD CONSTRAINT "examSession_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "organization"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "examSession" ADD CONSTRAINT "examSession_academicYearId_fkey" FOREIGN KEY ("academicYearId") REFERENCES "academicYear"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "examSession" ADD CONSTRAINT "examSession_termId_fkey" FOREIGN KEY ("termId") REFERENCES "term"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "examSession" ADD CONSTRAINT "examSession_examTypeId_fkey" FOREIGN KEY ("examTypeId") REFERENCES "examType"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "examSubject" ADD CONSTRAINT "examSubject_examSessionId_fkey" FOREIGN KEY ("examSessionId") REFERENCES "examSession"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "examSubject" ADD CONSTRAINT "examSubject_subjectId_fkey" FOREIGN KEY ("subjectId") REFERENCES "subject"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "examResult" ADD CONSTRAINT "examResult_examSubjectId_fkey" FOREIGN KEY ("examSubjectId") REFERENCES "examSubject"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "examResult" ADD CONSTRAINT "examResult_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "studentProfile"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "gradeScale" ADD CONSTRAINT "gradeScale_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "organization"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "feeCategory" ADD CONSTRAINT "feeCategory_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "organization"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "feeStructure" ADD CONSTRAINT "feeStructure_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "organization"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "feeStructure" ADD CONSTRAINT "feeStructure_academicYearId_fkey" FOREIGN KEY ("academicYearId") REFERENCES "academicYear"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "feeStructureItem" ADD CONSTRAINT "feeStructureItem_feeStructureId_fkey" FOREIGN KEY ("feeStructureId") REFERENCES "feeStructure"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "feeStructureItem" ADD CONSTRAINT "feeStructureItem_feeCategoryId_fkey" FOREIGN KEY ("feeCategoryId") REFERENCES "feeCategory"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "invoice" ADD CONSTRAINT "invoice_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "organization"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "invoice" ADD CONSTRAINT "invoice_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "studentProfile"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "invoiceLineItem" ADD CONSTRAINT "invoiceLineItem_invoiceId_fkey" FOREIGN KEY ("invoiceId") REFERENCES "invoice"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "invoiceLineItem" ADD CONSTRAINT "invoiceLineItem_feeStructureItemId_fkey" FOREIGN KEY ("feeStructureItemId") REFERENCES "feeStructureItem"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "receipt" ADD CONSTRAINT "receipt_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "organization"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "receipt" ADD CONSTRAINT "receipt_invoiceId_fkey" FOREIGN KEY ("invoiceId") REFERENCES "invoice"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "studentFeeDiscount" ADD CONSTRAINT "studentFeeDiscount_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "studentProfile"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "transportRoute" ADD CONSTRAINT "transportRoute_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "organization"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "transportStop" ADD CONSTRAINT "transportStop_routeId_fkey" FOREIGN KEY ("routeId") REFERENCES "transportRoute"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "vehicle" ADD CONSTRAINT "vehicle_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "organization"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "vehicleAssignment" ADD CONSTRAINT "vehicleAssignment_vehicleId_fkey" FOREIGN KEY ("vehicleId") REFERENCES "vehicle"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "vehicleAssignment" ADD CONSTRAINT "vehicleAssignment_routeId_fkey" FOREIGN KEY ("routeId") REFERENCES "transportRoute"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "vehicleAssignment" ADD CONSTRAINT "vehicleAssignment_driverId_fkey" FOREIGN KEY ("driverId") REFERENCES "staffProfile"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "studentTransportAssignment" ADD CONSTRAINT "studentTransportAssignment_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "studentProfile"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "studentTransportAssignment" ADD CONSTRAINT "studentTransportAssignment_routeId_fkey" FOREIGN KEY ("routeId") REFERENCES "transportRoute"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "studentTransportAssignment" ADD CONSTRAINT "studentTransportAssignment_stopId_fkey" FOREIGN KEY ("stopId") REFERENCES "transportStop"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "hostel" ADD CONSTRAINT "hostel_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "organization"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "hostel" ADD CONSTRAINT "hostel_campusId_fkey" FOREIGN KEY ("campusId") REFERENCES "campus"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "hostel" ADD CONSTRAINT "hostel_wardenId_fkey" FOREIGN KEY ("wardenId") REFERENCES "staffProfile"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "hostelRoom" ADD CONSTRAINT "hostelRoom_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "organization"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "hostelRoom" ADD CONSTRAINT "hostelRoom_hostelId_fkey" FOREIGN KEY ("hostelId") REFERENCES "hostel"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "hostelBed" ADD CONSTRAINT "hostelBed_roomId_fkey" FOREIGN KEY ("roomId") REFERENCES "hostelRoom"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "hostelRoomAllocation" ADD CONSTRAINT "hostelRoomAllocation_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "studentProfile"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "hostelRoomAllocation" ADD CONSTRAINT "hostelRoomAllocation_bedId_fkey" FOREIGN KEY ("bedId") REFERENCES "hostelBed"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "book" ADD CONSTRAINT "book_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "organization"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "libraryCard" ADD CONSTRAINT "libraryCard_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "studentProfile"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "bookIssue" ADD CONSTRAINT "bookIssue_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "organization"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "bookIssue" ADD CONSTRAINT "bookIssue_bookId_fkey" FOREIGN KEY ("bookId") REFERENCES "book"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "vendor" ADD CONSTRAINT "vendor_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "organization"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "asset" ADD CONSTRAINT "asset_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "organization"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "asset" ADD CONSTRAINT "asset_purchaseId_fkey" FOREIGN KEY ("purchaseId") REFERENCES "purchase"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "assetAssignment" ADD CONSTRAINT "assetAssignment_assetId_fkey" FOREIGN KEY ("assetId") REFERENCES "asset"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "assetMaintenance" ADD CONSTRAINT "assetMaintenance_assetId_fkey" FOREIGN KEY ("assetId") REFERENCES "asset"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "purchase" ADD CONSTRAINT "purchase_vendorId_fkey" FOREIGN KEY ("vendorId") REFERENCES "vendor"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ledgerEntry" ADD CONSTRAINT "ledgerEntry_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "organization"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "salaryStructure" ADD CONSTRAINT "salaryStructure_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "organization"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "payslip" ADD CONSTRAINT "payslip_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "organization"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "payslip" ADD CONSTRAINT "payslip_staffId_fkey" FOREIGN KEY ("staffId") REFERENCES "staffProfile"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "payslip" ADD CONSTRAINT "payslip_salaryStructureId_fkey" FOREIGN KEY ("salaryStructureId") REFERENCES "salaryStructure"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "notice" ADD CONSTRAINT "notice_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "organization"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "messageLog" ADD CONSTRAINT "messageLog_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "organization"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "homework" ADD CONSTRAINT "homework_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "organization"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "homework" ADD CONSTRAINT "homework_classSectionId_fkey" FOREIGN KEY ("classSectionId") REFERENCES "classSection"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "homework" ADD CONSTRAINT "homework_subjectId_fkey" FOREIGN KEY ("subjectId") REFERENCES "subject"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "homeworkSubmission" ADD CONSTRAINT "homeworkSubmission_homeworkId_fkey" FOREIGN KEY ("homeworkId") REFERENCES "homework"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "homeworkSubmission" ADD CONSTRAINT "homeworkSubmission_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "studentProfile"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "homeworkSubmission" ADD CONSTRAINT "homeworkSubmission_gradedById_fkey" FOREIGN KEY ("gradedById") REFERENCES "staffProfile"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "lessonPlan" ADD CONSTRAINT "lessonPlan_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "organization"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "lessonPlan" ADD CONSTRAINT "lessonPlan_classSectionId_fkey" FOREIGN KEY ("classSectionId") REFERENCES "classSection"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "lessonPlan" ADD CONSTRAINT "lessonPlan_subjectId_fkey" FOREIGN KEY ("subjectId") REFERENCES "subject"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "lessonPlan" ADD CONSTRAINT "lessonPlan_teacherId_fkey" FOREIGN KEY ("teacherId") REFERENCES "staffProfile"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "schoolEvent" ADD CONSTRAINT "schoolEvent_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "organization"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "disciplinaryRecord" ADD CONSTRAINT "disciplinaryRecord_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "organization"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "disciplinaryRecord" ADD CONSTRAINT "disciplinaryRecord_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "studentProfile"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "disciplinaryRecord" ADD CONSTRAINT "disciplinaryRecord_raisedById_fkey" FOREIGN KEY ("raisedById") REFERENCES "staffProfile"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "healthRecord" ADD CONSTRAINT "healthRecord_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "organization"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "healthRecord" ADD CONSTRAINT "healthRecord_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "studentProfile"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "documentRecord" ADD CONSTRAINT "documentRecord_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "organization"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "apiToken" ADD CONSTRAINT "apiToken_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "organization"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "auditLog" ADD CONSTRAINT "auditLog_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "organization"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "auditLog" ADD CONSTRAINT "auditLog_actorId_fkey" FOREIGN KEY ("actorId") REFERENCES "user"("id") ON DELETE SET NULL ON UPDATE CASCADE;
