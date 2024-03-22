'use client'
import { fabric } from "fabric";
import Live from "@/components/Live/Live";
import LeftSidebar from "@/components/NaveBer/LeftSidebar";
// import { Room } from "../../Room";
import NavBer from "@/components/NaveBer/NavBer";
import RightSidebar from "@/components/NaveBer/RightSidebar";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { handleCanvasMouseDown, handleResize, initializeFabric } from "@/lib/canvas";
import { ActiveElement } from "@/types/type";
export default function usePage({ params }: { params: { name: string, id: string } }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fabricRef = useRef<fabric.Canvas | null>(null);
  const shapeRef = useRef<fabric.Object | null>(null)
  const selectedShapeRef = useRef<String | null>(null)
  const isDrawing = useRef(false)

  const [activeElement, setActiveElement] = useState<ActiveElement>({
    name: "",
    value: "",
    icon: "",
  })
  const handleActiveElement = (elem: ActiveElement) => {
    setActiveElement(elem);
selectedShapeRef.current = elem?.value as string
  };

  useEffect(() => {
    const canvas = initializeFabric({ canvasRef, fabricRef })
    canvas.on('mouse:down', (options) => {
      handleCanvasMouseDown({
        options, canvas, isDrawing, shapeRef, selectedShapeRef
      })
    })
    window.addEventListener("resize", () => {
      handleResize({
        canvas: fabricRef.current,
      });
    });
  }, [])
  const path = usePathname()
  console.log(path)
  return (
    <main key={`${params.name}-${params.id}`} className="h-screen overflow-hidden">
      <NavBer 
      activeElement={activeElement}
      handleActiveElement={handleActiveElement}
      />
      <section className="flex h-full flex-row">
        <LeftSidebar />
        <Live key={`${params.name}-${params.id}`} canvasRef={canvasRef} />
        <RightSidebar />
      </section>
    </main>
  );
}