import React, { useCallback } from 'react'
import LiveCursor from '../Cursor/LiveCursor'
import { useMyPresence, useOthers } from '../../../liveblocks.config'
// import { useOthers } from '@/assets/liveblocks.config'

const Live = () => {
    const others = useOthers()
    const [{ cursor }, updateMyPresence] = useMyPresence() as any
    const handelPointerMove = useCallback((event: React.PointerEvent) => {
        event.preventDefault()
        const x = event.clientX - event.currentTarget.getBoundingClientRect().x
        const y = event.clientY - event.currentTarget.getBoundingClientRect().y
        updateMyPresence({ cursor: { x, y } })
    },[])
    const handelPointerLeave = useCallback((event: React.PointerEvent) => {
        updateMyPresence({ cursor: null,message:null })
    },[])
    const handelPointerDown = useCallback((event: React.PointerEvent) => {
        const x = event.clientX - event.currentTarget.getBoundingClientRect().x
        const y = event.clientY - event.currentTarget.getBoundingClientRect().y
        updateMyPresence({ cursor: { x, y } })
    },[])
    return (
        <div
        onPointerMove={handelPointerMove}
        onPointerLeave={handelPointerLeave}
        onPointerDown={handelPointerDown}
        className="h-[100vh] w-full flex justify-center items-center text-center border-4 border-red-50"
        >
            <h3 className="text-2xl text-white">DesignForge </h3>
            <LiveCursor others={others} />
        </div>
    )
}
export default Live