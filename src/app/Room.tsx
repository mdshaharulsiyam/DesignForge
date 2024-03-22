"use client";

import { ReactNode } from "react";
import { RoomProvider } from "../../liveblocks.config";//../liveblocks.config
import { ClientSideSuspense } from "@liveblocks/react";
import { usePathname } from "next/navigation";

export function Room({ children }: { children: ReactNode }) {
  const path = usePathname();
  console.log(path)
  const routes = path.split('/')
  // console.log(routes)_${routes?.length > 2 ? routes?.[2] : 'anonymous'} _${routes?.length > 2 ? routes?.[2] : 'anonymous'}
  return (
    <RoomProvider
      key={`${routes?.length > 2 ? routes?.[2] : 'anonymous'}`}
      id={`${routes?.length > 2 ? routes?.[2] : 'anonymous'}`} initialPresence={{}}>
      <ClientSideSuspense fallback={<div>Loading…</div>}>
        {() => children}
      </ClientSideSuspense>
    </RoomProvider>
  );
}