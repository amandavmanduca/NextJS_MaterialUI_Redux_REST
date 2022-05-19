import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

let clientMaxAge = 0;

const options = {
  providers: [
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        username: { label: "Username", type: "text", placeholder: "jsmith" },
        password: {  label: "Password", type: "password" }
      },
      async authorize(credentials) {
        const payload = {
          username: credentials.username,
          password: credentials.password,
        };

        const res = await fetch('http://localhost:3003/auth/login', {
          method: 'POST',
          body: JSON.stringify(payload),
          headers: {
            'Content-Type': 'application/json',
          },
        });
        const user = await res.json()

        clientMaxAge = user.session_duration_in_seconds

        // If no error and we have user data, return it
        if (res.ok && user) {
          return user
        }
        // Return null if user data could not be retrieved
        return null
      }
    }),
  ],
  session: {
    jwt: true,
  },
  jwt: {
    secret: 'SUPER_SECRET_JWT_SECRET',
  },
  callbacks: {
    async jwt({ token, account }) {
      if (account) {
        // token.maxAge = clientMaxAge
        token.accessToken = account.access_token
      }
      return token
    },

    async session({ session, token }) {
      session.accessToken = token.accessToken
      return session
    }
  },
  pages: {
    signIn: '/login',
  }
}

export default (req, res) => NextAuth(req, res, options);