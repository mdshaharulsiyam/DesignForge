import { ClientSideSuspense } from '@liveblocks/react'
import React from 'react'
import { Comments } from './Comments'

const Coment = () => {
    return (
        <ClientSideSuspense fallback={<p>loading</p>}>
            {() => <Comments />}
        </ClientSideSuspense>
    )
}

export default Coment