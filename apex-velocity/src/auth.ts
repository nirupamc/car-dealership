import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"
import { PrismaAdapter } from "@auth/prisma-adapter"
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

export const { handlers, auth, signIn, signOut } = NextAuth({
    adapter: PrismaAdapter(prisma),
    providers: [
        Credentials({
            name: "Admin Credentials",
            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials) {
                if (!credentials?.email || !credentials?.password) return null

                // Harcoded Admin for demo as specified
                if (
                    credentials.email === "admin@apexvelocity.com" &&
                    credentials.password === "Apex2025!"
                ) {
                    return { id: "1", name: "Apex Admin", email: "admin@apexvelocity.com" }
                }

                return null
            }
        })
    ],
    session: { strategy: "jwt" },
    pages: {
        signIn: "/admin/login",
    },
})
