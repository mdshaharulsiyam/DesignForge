import React from 'react'
import { Button } from "@/components/ui/button"
import Link from 'next/link'
import { auth } from '@/auth/auth';
import { Session } from 'next-auth';
import { redirect } from 'next/navigation';
// function generateRandomString(length: number): string {
//     const characters: string = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
//     return Array.from({ length }, () => characters.charAt(Math.floor(Math.random() * characters.length))).join('');
// }
const page = async () => {
    const session: Session | null = await auth();
    if (session?.user) {
        const randomPathId = 'project1'
        const username: string | undefined = session?.user?.name?.replace(/\s/g, "")
        const uri: string = `/user/${username}${randomPathId}`
        redirect(uri)
    }
    return (
        <div className='text-white z-10 relative w-full h-svh bg-[url("https://i.ibb.co/vqddZTm/Gradient-abstract-banners-Community.png")] flex justify-start items-center p-16'>
            <span className='absolute w-full h-full top-0 left-0 bg-black -z-10 bg-opacity-50'></span>
            <div className='z-20'>
                <h1 style={{ 'textShadow': '2px 2px 4px rgba(0,0,0,0.5)' }} className='text-4xl font-medium'>Introducing designForge - Your Digital Creative Studio</h1>
                <p style={{ 'textShadow': '2px 4px 8px rgba(0,0,0,0.5)' }} className='max-w-[700px] py-7 text-xl'> Your digital design workshop. Create, collaborate, and innovate with ease. Revolutionize your design process with powerful tools and seamless teamwork, all in one platform.</p>
                <Link href={`/api/auth/signin`} >
                    <Button className='font-bold uppercase hover:text-teal-600 transition-all' variant='outline'>start design</Button>
                </Link>
            </div>
        </div >
    )
}

export default page