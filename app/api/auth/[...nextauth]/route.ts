import NextAuth, { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import db from '@/app/lib/db';
import bcrypt from 'bcrypt';
import { User } from 'next-auth';

// Define a custom user type that includes the properties we'll be using
interface AppUser {
  id: number;
  name: string;
  email: string;
  role: string;
}

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email: { label: 'Email', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        console.log('\n--- AUTHORIZE FUNCTION HIT ---');
        if (!credentials?.email || !credentials?.password) {
          console.log('Authorize failed: Missing credentials.');
          return null;
        }
        console.log('Credentials received:', { email: credentials.email });

        try {
          const stmt = db.prepare('SELECT * FROM users WHERE email = ?');
          const user = stmt.get(credentials.email) as AppUser | undefined;

          if (!user) {
            console.log('User not found in DB.');
            return null;
          }
          console.log('User found in DB:', user);

          const passwordMatch = await bcrypt.compare(credentials.password, (user as any).password);
          console.log('Password match result:', passwordMatch);

          if (user && passwordMatch) {
            console.log('Authorization successful. Returning user.');
            return {
              id: user.id.toString(),
              name: user.name,
              email: user.email,
              role: user.role,
            } as User & { role: string };
          } else {
            console.log('Authorization failed: Password does not match.');
            return null;
          }
        } catch (error) {
          console.error('--- AUTHORIZE ERROR ---:', error);
          return null;
        }
      },
    }),
  ],
  session: {
    strategy: 'jwt',
  },
  callbacks: {
    async jwt({ token, user }) {
      // On sign-in, add user id and role to the token
      if (user) {
        token.id = user.id;
        token.role = (user as any).role;
      }
      return token;
    },
    async session({ session, token }) {
      // Add id and role to the session object from the token
      if (session.user) {
        (session.user as any).id = token.id;
        (session.user as any).role = token.role;
      }
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: '/login',
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
