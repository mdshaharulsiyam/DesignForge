'use client'
import Live from "@/components/Live/Live";
// import { Room } from "../../Room";
import NavBer from "@/components/NaveBer/NavBer";
import { usePathname } from "next/navigation";
export default function usePage() {
  const path = usePathname()
  console.log(path)
  return (
    <main className="h-screen overflow-hidden">
      <NavBer />
      <section className="flex h-full flex-row">
        <Live />
      </section>
    </main>
  );
}