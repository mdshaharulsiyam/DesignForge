'use client'
import React, { useCallback, useEffect, useState } from 'react'
import LiveCursor from '../Cursor/LiveCursor'
import { useMyPresence, useOthers } from '../../../liveblocks.config'
import CursorChat from '../Cursor/CursorChat'
import { CursorMode, CursorState, Reaction } from '@/types/type'
import ReactionSelector from '../Reaction/ReactionButton'

const Live = () => {
    const [cursorState, setCursorState] = useState<CursorState>({
        mode: CursorMode.Hidden
    })
    const [reaction, setReaction] = useState<Reaction[]>([])
    const others = useOthers()
    const [{ cursor }, updateMyPresence] = useMyPresence() as any;
    const handelPointerMove = useCallback((event: React.PointerEvent) => {
        event.preventDefault()
        if (cursor === null || cursorState.mode !== CursorMode.ReactionSelector) {
            const x = event.clientX - event.currentTarget.getBoundingClientRect().x
            const y = event.clientY - event.currentTarget.getBoundingClientRect().y
            updateMyPresence({ cursor: { x, y } })
        }

    }, [])
    const handelPointerLeave = useCallback((event: React.PointerEvent) => {
        setCursorState({ mode: CursorMode.Hidden })
        updateMyPresence({ cursor: null, message: null })
    }, [])

    const handelPointerDown = useCallback((event: React.PointerEvent) => {
        const x = event.clientX - event.currentTarget.getBoundingClientRect().x
        const y = event.clientY - event.currentTarget.getBoundingClientRect().y
        updateMyPresence({ cursor: { x, y } })
        setCursorState((state: CursorState) => cursorState.mode === CursorMode.Reaction ? { ...state, isPressed: true } : state)
    }, [cursorState.mode, setCursorState])

    const handelPointerUp = useCallback((event: React.PointerEvent) => {
        setCursorState((state: CursorState) =>  cursorState.mode === CursorMode.Reaction ? { ...state, isPressed: true } : state)
    }, [cursorState.mode, setCursorState])
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
            } else if (e.key === 'e') {
                setCursorState({ mode: CursorMode.ReactionSelector })
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

    const setReactionFunction = useCallback((reaction : string)=>{
        setCursorState({
            mode : CursorMode.Reaction,
            reaction,
            isPressed:false
        })
    },[])
    return (
        <div
            onPointerMove={handelPointerMove}
            onPointerLeave={handelPointerLeave}
            onPointerDown={handelPointerDown}
            onPointerUp={handelPointerUp}
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
            {cursorState.mode === CursorMode.ReactionSelector && (
                <ReactionSelector
                    setReaction={setReactionFunction}
                />
            )}
            <LiveCursor others={others} />
        </div>
    )
}
export default Live