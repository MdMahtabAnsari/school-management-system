import { viewPaths } from "@better-auth-ui/core"
import { notFound, redirect } from "next/navigation"

import { Settings } from "@/components/auth/settings/settings"
import { authClient } from "@workspace/auth/client/nextjs-client"

import { organizationPlugin } from "@/lib/auth/organization-plugin"
const validSettingsPaths = [
  ...Object.values(viewPaths.settings),
  ...Object.values(organizationPlugin().viewPaths.settings) 
]

export default async function SettingsPage({
  params
}: {
  params: Promise<{
    path: string
  }>
}) {
  const { path } = await params

  if (!validSettingsPaths.includes(path)) {
    notFound()
  }


  const session = await authClient.getSession()

  if (!session) {
    redirect(
      `/auth/sign-in?redirectTo=${encodeURIComponent(`/settings/${path}`)}`
    )
  }

  return (
      <div className="w-full max-w-3xl mx-auto p-4 md:p-6">
        <Settings path={path} />
      </div>
  )
}