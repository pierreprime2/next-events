import bcrypt from 'bcrypt'
import Credentials from 'next-auth/providers/credentials'
import { getUserByEmail } from '@/lib/actions/user.action'

export const authConfig = {
    pages: {
        signIn: '/login',
    },
    providers: [
        Credentials({
            async authorize(credentials) {
                const email = credentials?.email.toLowerCase()
                const password = credentials?.password

                const user = await getUserByEmail(email)
                if (user && (await bcrypt.compare(password, user.password))) {

                    console.log("Authorized user:", {
                        id: user._id.toString(),
                        name: user.name,
                        email: user.email,
                        image: user.imageUrl ?? null
                    });


                    return {
                        id: user._id.toString(),
                        name: user.name,
                        email: user.email,
                        image: user.imageUrl ?? null
                    }
                }
                return null
            }
        })
    ],
    callbacks: {
        async jwt({ token, trigger, session, user }) {

            // on login
            if (user) {
                console.log("JWT user:", user);
                token.name = user.name
                token.picture = user.image
                token.id = user.id
                token.email = user.email
            }

            if (trigger === 'update' && session) {
                token.name = session.name
                token.picture = session.image
            }

            console.log("JWT token:", token);
            return token
        },
        async session({ session, token }) {
            session.user = {
                id: token.id,
                name: token.name,
                email: token.email,
                image: token.picture
            }
            console.log("Session callback result:", session)
            return session
        }
    },
    session: {
        strategy: 'jwt'
    }
}
