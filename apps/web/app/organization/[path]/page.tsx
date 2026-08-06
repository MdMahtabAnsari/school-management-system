
import { notFound, redirect } from "next/navigation"

import { Organization } from "@/components/auth/organization/organization"
import { authClient } from "@workspace/auth/client/nextjs-client"
import { organizationPlugin } from "@/lib/auth/organization-plugin"

const validOrganizationPaths = Object.values(
    organizationPlugin().viewPaths.organization
)

export default async function OrganizationPage({
    params
}: {
    params: Promise<{ path: string }>
}) {
    const { path } = await params

    if (!validOrganizationPaths.includes(path)) {
        notFound()
    }

    const session = await authClient.getSession()

    if (!session) {
        redirect(
            `/auth/sign-in?redirectTo=${encodeURIComponent(`/organization/${path}`)}`
        )
    }

    return (
        <div className="w-full max-w-3xl mx-auto p-4 md:p-6">
            <Organization path={path} />
        </div>

    )
}