import CursorSVG from '@/public/assets/CursorSVG'
import React from 'react'
interface props {
    color: string,
    x: number,
    y: number,
    message: string
}
const Cursor = ({ color, x, y, message }: props) => {
    return (
        <div className='pointer-events-none top-0 left-0 absolute' style={{ transform: `translateX(${x}px) translateY(${y}px)` }}>
            <CursorSVG color={color}/>
        </div>
    )
}

export default Cursor