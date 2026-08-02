"use client"

import { Item, ItemContent, ItemMedia } from "@workspace/ui/components/item"
import { Skeleton } from "@workspace/ui/components/skeleton"

export function PasskeySkeleton() {
  return (
    <Item>
      <ItemMedia>
        <Skeleton className="size-10 rounded-md" />
      </ItemMedia>
      <ItemContent>
        <Skeleton className="h-4 w-28" />
        <Skeleton className="h-3 w-32" />
      </ItemContent>
    </Item>
  )
}
