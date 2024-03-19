'use client'
import Live from "@/components/Live/Live";
// import { Room } from "../../Room";
import NavBer from "@/components/NaveBer/NavBer";
import { usePathname } from "next/navigation";
export default function usePage() {
  const path = usePathname()
  console.log(path)
  return (
    <div>
      {/* <NavBer /> */}
      <Live />
    </div>
  );
}