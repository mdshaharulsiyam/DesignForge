'use client'
import { fabric } from "fabric";
import Live from "@/components/Live/Live";
import LeftSidebar from "@/components/NaveBer/LeftSidebar";
// import { Room } from "../../Room";
import NavBer from "@/components/NaveBer/NavBer";
import RightSidebar from "@/components/NaveBer/RightSidebar";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { handleCanvasMouseDown, handleCanvasMouseUp, handleCanvasObjectModified, handleCanvaseMouseMove, handleResize, initializeFabric, renderCanvas } from "@/lib/canvas";
import { ActiveElement } from "@/types/type";
import { useMutation, useStorage } from "../../../../liveblocks.config";
export default function usePage({ params }: { params: { name: string } }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fabricRef = useRef<fabric.Canvas | null>(null);
  const shapeRef = useRef<fabric.Object | null>(null)
  const selectedShapeRef = useRef<String | null>(null)
  const activeObjectRef = useRef<fabric.Object | null>(null);
  const isDrawing = useRef(false)
  const canvasObjects = useStorage((root: any) => root.canvasObjects);

  const syncShapeInStorage = useMutation(({ storage }: { storage: any }, object: any) => {
    if (!object) return;
    const { objectId } = object;
    const shapeData = object.toJSON();
    shapeData.objectId = objectId;
    const canvasObjects = storage.get("canvasObjects");
    canvasObjects.set(objectId, shapeData);
  }, []);

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
    canvas.on("mouse:move", (options) => {
      handleCanvaseMouseMove({
        options,
        canvas,
        isDrawing,
        selectedShapeRef,
        shapeRef,
        syncShapeInStorage,
      });
    });
    canvas.on("mouse:up", () => {
      handleCanvasMouseUp({
        canvas,
        isDrawing,
        shapeRef,
        activeObjectRef,
        selectedShapeRef,
        syncShapeInStorage,
        setActiveElement,
      });
    });
    canvas.on("object:modified", (options) => {
      handleCanvasObjectModified({
        options,
        syncShapeInStorage,
      });
    });
    window.addEventListener("resize", () => {
      handleResize({
        canvas: fabricRef.current,
      });
    });
  }, [])
  useEffect(() => {
    renderCanvas({
      fabricRef,
      canvasObjects,
      activeObjectRef,
    });
  }, [canvasObjects]);
  return (
    <main key={`${params.name}`} className="h-screen overflow-hidden">
      <NavBer
        activeElement={activeElement}
        handleActiveElement={handleActiveElement}
      />
      <section className="flex h-full flex-row">
        <LeftSidebar />
        <Live key={`${params.name}`} canvasRef={canvasRef} />
        <RightSidebar />
      </section>
    </main>
  );
}