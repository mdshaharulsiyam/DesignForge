import CursorSVG from '@/public/assets/CursorSVG'
import { CursorChatProps, CursorMode } from '@/types/type'
import React from 'react'

const CursorChat = ({ cursor, cursorState, setCursorState, updateMyPresence }: CursorChatProps) => {
    const handelChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const inputValue = (e.target as HTMLInputElement).value;
        updateMyPresence({ message: inputValue });
        setCursorState({
            mode: CursorMode.Chat,
            previousMessage: null,
            message: inputValue
        });
    };

    const handelkeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            if (cursorState.mode === CursorMode.Chat) {
                setCursorState({
                    mode: CursorMode.Chat,
                    previousMessage: cursorState.message,
                    message: ''
                })
            }
        } else if (e.key === 'Escape') {
            setCursorState({
                mode: CursorMode.Hidden,
            })
        }
    }
    return (
        <div className='absolute top-0 left-0' style={{ transform: `translateX(${cursor.x}px) translateY(${cursor.y}px)` }}>
            {cursorState.mode === CursorMode.Chat && (
                <>
                    <CursorSVG color='#000' />
                    <div className='absolute left-2 top-5 bg-blue-500 px-4 py-2 text-sm leading-relaxed text-white rounded-[20px]' onKeyUp={(e=>e.stopPropagation())}>
                        {cursorState.previousMessage && (
                            <div>{cursorState.previousMessage}</div>
                        )}
                        <input
                            className='z-10 w-60 border-none bg-transparent  placeholder-blue-300 outline-none'
                            autoFocus={true}
                            onKeyDown={handelkeyDown}
                            onChange={handelChange}
                            placeholder={`${cursorState.previousMessage ? '' : 'type a message'}`}
                        />
                    </div>
                </>
            )}
        </div>
    )
}

export default CursorChat