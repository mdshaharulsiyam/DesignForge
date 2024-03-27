"use client";

import { ReactNode } from "react";
import { RoomProvider } from "../../liveblocks.config";//../liveblocks.config
import { ClientSideSuspense } from "@liveblocks/react";
import { usePathname } from "next/navigation";
import { LiveMap } from "@liveblocks/client";
import Loader from "@/components/Loader/Loader";

export function Room({ children }: { children: ReactNode }) {
  const path = usePathname();
  const routes = path.split('/')
  // console.log(routes)_${routes?.length > 2 ? routes?.[2] : 'anonymous'} _${routes?.length > 2 ? routes?.[2] : 'anonymous'}
  return (
    <RoomProvider
      key={`${routes?.length > 2 ? routes?.[2] : 'anonymous'}`}
      id={`${routes?.length > 2 ? routes?.[2] : 'anonymous'}`} initialPresence={{
        cursor: null,
        cursorColor: null,
        editingText: null,
        roomId: routes?.length > 2 ? routes?.[2] : 'anonymous',
      }}
      initialStorage={{
        canvasObjects: new LiveMap(),
      }}
    >
      <ClientSideSuspense fallback={<Loader />}>
        {() => children}
      </ClientSideSuspense>
    </RoomProvider>
  );
}