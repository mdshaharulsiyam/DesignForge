import NextAuth from "next-auth"
import GitHub from "next-auth/providers/github"
import Google from "@auth/core/providers/google"

export const {
    handlers: { GET, POST },
    auth,
} = NextAuth({
    trustHost: true,
    secret: process.env.NEXT_PUBLIC_AUTH_SECRET,
    providers: [
        Google({
            clientId: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
            clientSecret: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_SECRET,
        }),
        GitHub({ 
            clientId: process.env.NEXT_PUBLIC_GITHUB_CLIENT_ID, 
            clientSecret: process.env.NEXT_PUBLIC_GITHUB_CLIENT_SECRET 
        })
    ],
})