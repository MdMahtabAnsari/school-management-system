"use client"

import Link from "next/link"
import {  useRouter } from "next/navigation"
import type { ReactNode } from "react"
import { authClient } from "@workspace/auth/client/nextjs-client"
import { AuthProvider } from "@/components/auth/auth-provider"
import { Toaster } from "@workspace/ui/components/sonner"
import { adminPlugin } from "@/lib/auth/admin-plugin"
import { organizationPlugin } from "@/lib/auth/organization-plugin"
import { usernamePlugin } from "@/lib/auth/username-plugin"
import { twoFactorPlugin } from "@/lib/auth/two-factor-plugin"
import { emailOtpPlugin } from "@/lib/auth/email-otp-plugin"
import { multiSessionPlugin } from "@/lib/auth/multi-session-plugin"
import { magicLinkPlugin } from "@/lib/auth/magic-link-plugin"
import { lastLoginMethodPlugin } from "@/lib/auth/last-login-method-plugin"
import { themePlugin } from "@/lib/auth/theme-plugin"
import { useTheme } from "next-themes"

export function AuthProviders({ children }: { children: ReactNode }) {
    const router = useRouter();

    return (
        <AuthProvider
            authClient={authClient}
            redirectTo="/organization/dashboard"
            navigate={({ to, replace }) =>
                replace ? router.replace(to) : router.push(to)
            }
            plugins={[adminPlugin(), organizationPlugin({
                additionalRoles: {
                    principal: "Principal",
                    vicePrincipal: "Vice Principal",
                    registrar: "Registrar",
                    teacher: "Teacher",
                    accountant: "Accountant",
                    librarian: "Librarian",
                    receptionist: "Receptionist",
                    transportManager: "Transport Manager",
                    hostelWarden: "Hostel Warden",
                    nurse: "Nurse",
                    hr: "HR",
                    security: "Security",
                    supportStaff: "Support Staff",
                    guardian: "Guardian",
                }
            }), usernamePlugin(), twoFactorPlugin(), emailOtpPlugin(), multiSessionPlugin(), magicLinkPlugin(), lastLoginMethodPlugin(), themePlugin({ useTheme })]}
            Link={Link}
        >
            {children}

            <Toaster />
        </AuthProvider>
    )
}