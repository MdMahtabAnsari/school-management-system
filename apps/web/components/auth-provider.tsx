"use client"

import Link from "next/link"
import { useParams, useRouter } from "next/navigation"
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


export function AuthProviders({ children }: { children: ReactNode }) {
    const router = useRouter();
    const params = useParams<{ slug?: string | string[] }>() 
  const slug = typeof params?.slug === "string" ? params.slug : null

    return (
            <AuthProvider
                authClient={authClient}
                redirectTo="/settings/account"
                navigate={({ to, replace }) =>
                    replace ? router.replace(to) : router.push(to)
                }
                plugins={[adminPlugin(), organizationPlugin({ slug }), usernamePlugin(), twoFactorPlugin(), emailOtpPlugin(), multiSessionPlugin(), magicLinkPlugin(), lastLoginMethodPlugin()]}
                Link={Link}
            >
                {children}

                <Toaster />
            </AuthProvider>
    )
}