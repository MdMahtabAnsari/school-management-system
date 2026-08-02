"use client"

import { useRouter } from "next/navigation"

import { OrganizationSwitcher } from "@/components/auth/organization/organization-switcher"

export function Header() {
  const router = useRouter()

  return (
    <OrganizationSwitcher
      setActive={(organization) => {
        router.push(
          organization ? `/${organization.slug}/dashboard` : "/dashboard"
        )
      }}
    />
  )
}