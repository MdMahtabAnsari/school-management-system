"use client"

import * as React from "react"

import { NavMain } from "@/components/nav-main"
import { UserButton } from "@/components/auth/user/user-button"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@workspace/ui/components/sidebar"
import {
  LayoutDashboard,
  GraduationCap,
  Users,
  UserRound,
  Briefcase,
  CalendarCheck,
  ClipboardCheck,
  IndianRupee,
  Bus,
  BedDouble,
  Library,
  Boxes,
  Wallet,
  MessageSquare,
  BookOpen,
  CalendarDays,
  FileText,
} from "lucide-react";
import { OrganizationSwitcher } from "@/components/auth/organization/organization-switcher"
import { usePathname } from "next/navigation"

// This is sample data.

function dataBuilder(currentPath:string) {
  return {
  navMain: [
  {
    title: "Dashboard",
    url: `dashboard`,
    icon: <LayoutDashboard />,
    isActive: isActive(`dashboard`, currentPath),
    items: [
      { title: "Overview", url: `dashboard` },
    ],
  },

  {
    title: "Academic",
    url: `academic`,
    icon: <GraduationCap />,
    isActive: isActive(`academic`, currentPath),
    items: [
      { title: "Boards", url: `academic/boards` },
      { title: "Grade Levels", url: `academic/grades` },
      { title: "Academic Years", url: `academic/academic-years` },
      { title: "Class Sections", url: `academic/class-sections` },
      { title: "Subjects", url: `academic/subjects` },
      { title: "Subject Groups", url: `academic/subject-groups` },
      { title: "Timetable", url: `academic/timetable` },
    ],
  },

  {
    title: "Students",
    url: `students`,
    icon: <Users />,
    isActive: isActive(`students`, currentPath),
    items: [
      { title: "Student Directory", url: `students` },
      { title: "Admissions", url: `students/admissions` },
      { title: "Attendance", url: `students/attendance` },
      { title: "Health Records", url: `students/health` },
      { title: "Disciplinary Records", url: `students/disciplinary` },
      { title: "Documents", url: `students/documents` },
    ],
  },

  {
    title: "Guardians",
    url: `guardians`,
    icon: <UserRound />,
    items: [
      { title: "Guardian Directory", url: `guardians` },
    ],
  },

  {
    title: "Staff",
    url: `staff`,
    icon: <Briefcase />,
    isActive: isActive(`staff`, currentPath),
    items: [
      { title: "Staff Directory", url: `staff` },
      { title: "Employee Records", url: `staff/employees` },
      { title: "Performance Reviews", url: `staff/performance` },
      { title: "Staff Documents", url: `staff/documents` },
    ],
  },

  {
    title: "Attendance",
    url: `attendance`,
    icon: <CalendarCheck />,
    items: [
      { title: "Student Attendance", url: `students/attendance` },
      { title: "Staff Attendance", url: `staff/attendance` },
      { title: "Leave Requests", url: `leaves` },
    ],
  },

  {
    title: "Examinations",
    url: `examinations`,
    icon: <ClipboardCheck />,
    isActive: isActive(`examinations`, currentPath),
    items: [
      { title: "Exam Sessions", url: `examinations/sessions` },
      { title: "Results", url: `examinations/results` },
      { title: "Grade Scales", url: `examinations/grade-scales` },
    ],
  },

  {
    title: "Finance",
    url: `finance`,
    icon: <IndianRupee />,
    items: [
      { title: "Fee Categories", url: `finance/fee-categories` },
      { title: "Fee Structures", url: `finance/fee-structures` },
      { title: "Invoices", url: `finance/invoices` },
      { title: "Receipts", url: `finance/receipts` },
      { title: "Discounts", url: `finance/discounts` },
    ],
  },

  {
    title: "Transport",
    url: `transport`,
    icon: <Bus />,
    isActive: isActive(`transport`, currentPath),
    items: [
      { title: "Routes", url: `transport/routes` },
      { title: "Vehicles", url: `transport/vehicles` },
      { title: "Assignments", url: `transport/assignments` },
    ],
  },

  {
    title: "Hostel",
    url: `hostel`,
    icon: <BedDouble />,
    isActive: isActive(`hostel`, currentPath),
    items: [
      { title: "Hostels", url: `hostel` },
      { title: "Rooms", url: `hostel/rooms` },
      { title: "Allocations", url: `hostel/allocations` },
    ],
  },

  {
    title: "Library",
    url: `library`,
    icon: <Library />,
    isActive: isActive(`library`, currentPath),
    items: [
      { title: "Books", url: `library/books` },
      { title: "Issue Books", url: `library/issues` },
      { title: "Library Cards", url: `library/cards` },
    ],
  },

  {
    title: "Inventory",
    url: `inventory`,
    icon: <Boxes />,
    isActive: isActive(`inventory`, currentPath),
    items: [
      { title: "Assets", url: `inventory/assets` },
      { title: "Vendors", url: `inventory/vendors` },
      { title: "Purchases", url: `inventory/purchases` },
      { title: "Maintenance", url: `inventory/maintenance` },
    ],
  },

  {
    title: "Payroll",
    url: `payroll`,
    icon: <Wallet />,
    isActive: isActive(`payroll`, currentPath),
    items: [
      { title: "Salary Structures", url: `payroll/salary-structures` },
      { title: "Payslips", url: `payroll/payslips` },
      { title: "Ledger", url: `payroll/ledger` },
    ],
  },

  {
    title: "Communication",
    url: `communication`,
    icon: <MessageSquare />,
    isActive: isActive(`communication`, currentPath),
    items: [
      { title: "Notices", url: `communication/notices` },
      { title: "Messages", url: `communication/messages` },
    ],
  },

  {
    title: "Learning",
    url: `learning`,
    icon: <BookOpen />,
    isActive: isActive(`learning`, currentPath),
    items: [
      { title: "Homework", url: `learning/homework` },
      { title: "Lesson Plans", url: `learning/lesson-plans` },
    ],
  },

  {
    title: "Events",
    url: `events`,
    icon: <CalendarDays />,
    isActive: isActive(`events`, currentPath),
    items: [
      { title: "School Events", url: `events` },
    ],
  },

  {
    title: "Documents",
    url: `documents`,
    icon: <FileText />,
    isActive: isActive(`documents`, currentPath),
    items: [
      { title: "Document Center", url: `documents` },
      { title: "Reports", url: `documents/reports` },
      { title: "Audit Logs", url: `documents/audit-logs` },
      { title: "API Tokens", url: `documents/api-tokens` },
    ],
  },


]

}

}

function isActive(url: string, currentPath: string) {
  return currentPath === url || currentPath.startsWith(url + "/")
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
 
  const currentPath = usePathname()


  
  const data = dataBuilder(currentPath)

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <OrganizationSwitcher align="center" />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <UserButton />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
