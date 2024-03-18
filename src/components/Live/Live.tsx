'use client'
import React, { useCallback, useEffect, useState } from 'react'
import LiveCursor from '../Cursor/LiveCursor'
import { useMyPresence, useOthers } from '../../../liveblocks.config'
import CursorChat from '../Cursor/CursorChat'
import { CursorMode, CursorState } from '@/types/type'

const Live = () => {
    const [cursorState, setCursorState] = useState<CursorState>({
        mode: CursorMode.Hidden
    })
    const others = useOthers()
    const [{ cursor }, updateMyPresence] = useMyPresence() as any
    const handelPointerMove = useCallback((event: React.PointerEvent) => {
        event.preventDefault()
        const x = event.clientX - event.currentTarget.getBoundingClientRect().x
        const y = event.clientY - event.currentTarget.getBoundingClientRect().y
        updateMyPresence({ cursor: { x, y } })
    }, [])
    const handelPointerLeave = useCallback((event: React.PointerEvent) => {
        setCursorState({ mode: CursorMode.Hidden })
        updateMyPresence({ cursor: null, message: null })
    }, [])
    const handelPointerDown = useCallback((event: React.PointerEvent) => {
        const x = event.clientX - event.currentTarget.getBoundingClientRect().x
        const y = event.clientY - event.currentTarget.getBoundingClientRect().y
        updateMyPresence({ cursor: { x, y } })
    }, [])
    useEffect(() => {
        const onKeyUp = (e: KeyboardEvent) => {
            if (e.key === '/') {
                setCursorState({
                    mode: CursorMode.Chat,
                    previousMessage: null,
                    message: ''
                })
            } else if (e.key === 'Escape') {
                updateMyPresence({ message: '' })
                setCursorState({ mode: CursorMode.Hidden })
            }
        }
        const onKeyDown = (e: KeyboardEvent) => {
            if (e.key === '/') {
                e.preventDefault()
            }
        }
        window.addEventListener('keyup', onKeyUp)
        window.addEventListener('keydown', onKeyDown)
        return () => {
            window.removeEventListener('keyup', onKeyUp)
            window.removeEventListener('keydown', onKeyDown)
        }
    }, [updateMyPresence])
    return (
        <div
            onPointerMove={handelPointerMove}
            onPointerLeave={handelPointerLeave}
            onPointerDown={handelPointerDown}
            className="h-[100vh] w-full flex justify-center items-center text-center border-4 border-red-50"
        >
            <h3 className="text-2xl text-white">DesignForge </h3>
            {cursor && (
                <CursorChat
                    updateMyPresence={updateMyPresence}
                    setCursorState={setCursorState}
                    cursor={cursor}
                    cursorState={cursorState}
                />
            )}
            <LiveCursor others={others} />
        </div>
    )
}
export default Live