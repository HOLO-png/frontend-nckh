import CredentialsProvider from 'next-auth/providers/credentials'
import NextAuth from 'next-auth'

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        phoneNumber: {
          label: 'Phone number',
          type: 'number',
          placeholder: 'PhoneNumber'
        },
        password: {
          label: 'Password',
          type: 'password'
        }
      },
      async authorize(credentials, req) {
        const { phoneNumber, password } = credentials
        const res = await fetch('http://localhost:8080/api/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            phoneNumber,
            password
          })
        })
        const user = await res.json()
        if (user) {
          return user
        } else {
          throw new Error('invalid creadentials')
        }
      }
    })
  ],

  callbacks: {
    jwt({ token, trigger, session, user }) {
      if (trigger === "update") {
        token = { user: session }
        console.log({ user: { ...user, ...session } });

        return { user: { ...user, ...session } }
      }

      return { ...user, ...token }
    },
    async session({ session, token, user }) {
      session.user = token

      return session
    }
  },
  pages: {
    signIn: '/auth/login'
  },
}

export default NextAuth(authOptions)
