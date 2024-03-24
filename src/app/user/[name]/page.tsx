'use client'
import { fabric } from "fabric";
import Live from "@/components/Live/Live";
import LeftSidebar from "@/components/NaveBer/LeftSidebar";
// import { Room } from "../../Room";
import NavBer from "@/components/NaveBer/NavBer";
import RightSidebar from "@/components/NaveBer/RightSidebar";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { handleCanvasMouseDown, handleCanvasMouseUp, handleCanvasObjectModified, handleCanvasObjectScaling, handleCanvasSelectionCreated, handleCanvaseMouseMove, handleResize, initializeFabric, renderCanvas } from "@/lib/canvas";
import { ActiveElement, Attributes } from "@/types/type";
import { useMutation, useRedo, useStorage, useUndo } from "../../../../liveblocks.config";
import { handleDelete, handleKeyDown } from "@/lib/key-events";
import { defaultNavElement } from "@/constants";
import { handleImageUpload } from "@/lib/shapes";
export default function usePage({ params }: { params: { name: string } }) {
  const undo = useUndo();
  const redo = useRedo();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fabricRef = useRef<fabric.Canvas | null>(null);
  const shapeRef = useRef<fabric.Object | null>(null)
  const selectedShapeRef = useRef<String | null>(null)
  const activeObjectRef = useRef<fabric.Object | null>(null);
  const isEditingRef = useRef(false);
  const isDrawing = useRef(false)
  const canvasObjects = useStorage((root: any) => root.canvasObjects);
  const imageInputRef = useRef<HTMLInputElement>(null);

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

  const [elementAttributes, setElementAttributes] = useState<Attributes>({
    width: "",
    height: "",
    fontSize: "",
    fontFamily: "",
    fontWeight: "",
    fill: "#aabbcc",
    stroke: "#aabbcc",
  });

  const deleteAllShapes = useMutation(({ storage }: { storage: any }) => {
    const canvasObjects = storage.get("canvasObjects");
    if (!canvasObjects || canvasObjects.size === 0) return true;
    for (const [key, value] of canvasObjects.entries()) {
      canvasObjects.delete(key);
    }
    return canvasObjects.size === 0;
  }, []);
  const deleteShapeFromStorage = useMutation(({ storage }: { storage: any }, shapeId: any) => {
    const canvasObjects = storage.get("canvasObjects");
    canvasObjects.delete(shapeId);
  }, []);

  const handleActiveElement = (elem: ActiveElement) => {
    setActiveElement(elem);

    switch (elem?.value) {
      case "reset":
        deleteAllShapes();
        fabricRef.current?.clear();
        setActiveElement(defaultNavElement);
        break;
      case "delete":
        handleDelete(fabricRef.current as any, deleteShapeFromStorage);
        setActiveElement(defaultNavElement);
        break;
      case "image":
        imageInputRef.current?.click();
        isDrawing.current = false;
        if (fabricRef.current) {
          fabricRef.current.isDrawingMode = false;
        }
        break;
      case "comments":
        break;

      default:
        // set the selected shape to the selected element
        selectedShapeRef.current = elem?.value as string;
        break;
    }
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

    canvas.on("selection:created", (options) => {
      handleCanvasSelectionCreated({
        options,
        isEditingRef,
        setElementAttributes,
      });
    });

    window.addEventListener("resize", () => {
      handleResize({
        canvas: fabricRef.current,
      });
    });
    canvas.on("object:scaling", (options) => {
      handleCanvasObjectScaling({
        options,
        setElementAttributes,
      });
    });
    window.addEventListener("keydown", (e) =>
      handleKeyDown({
        e,
        canvas: fabricRef.current,
        undo,
        redo,
        syncShapeInStorage,
        deleteShapeFromStorage,
      })
    );

    return () => {
      canvas.dispose()
    }
  }, [])

  useEffect(() => {
    renderCanvas({
      fabricRef,
      canvasObjects,
      activeObjectRef,
    });
  }, [canvasObjects]);
  return (
    <main key={`${params.name}`} className="h-svh overflow-hidden">
      <NavBer
        activeElement={activeElement}
        handleActiveElement={handleActiveElement}
        imageInputRef={imageInputRef}
        handleImageUpload={(e: any) => {
          e.stopPropagation();
          handleImageUpload({
            file: e.target.files[0],
            canvas: fabricRef as any,
            shapeRef,
            syncShapeInStorage,
          });
        }}
      />
      <section className="flex h-full flex-row">
        <LeftSidebar allShapes={Array.from(canvasObjects)} />
        <Live key={`${params.name}`} canvasRef={canvasRef} />
        <RightSidebar
          elementAttributes={elementAttributes}
          setElementAttributes={setElementAttributes}
          fabricRef={fabricRef}
          isEditingRef={isEditingRef}
          activeObjectRef={activeObjectRef}
          syncShapeInStorage={syncShapeInStorage}
        />
      </section>
    </main>
  );
}