import NextAuth, { AuthOptions } from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import { compare } from 'bcrypt';

import GithubProvider from 'next-auth/providers/github';
import GoogleProvider from 'next-auth/providers/google';

import prismadb from '@/libs/prismadb';
import { PrismaAdapter } from '@next-auth/prisma-adapter';

// vaild account 
export default NextAuth({
    providers: [
      GithubProvider({
        clientId: process.env.GITHUB_ID || '',
        clientSecret: process.env.GITHUB_SECRET || '',
      }),
      GoogleProvider({
        clientId: process.env.GOOGLE_CLIENT_ID || '',
        clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
      }),
      Credentials({
        id: 'credentials',
        name: 'Credentials',
        credentials: {
          email: {
            label: 'Email',
            type: 'text',
          },
          password: {
            label: 'Password',
            type: 'password'
          }
        },
        async authorize(credentials) {
          if (!credentials?.email || !credentials?.password) { // need email, pw
            throw new Error('Email and password required');
          }
  
          const user = await prismadb.user.findUnique({ where: { // prisma ~ dbOrm
            email: credentials.email
          }});
  
          if (!user || !user.hashedPassword) {
            throw new Error('Email does not exist');
          }
          
          // check pw
          const isCorrectPassword = await compare( 
            credentials.password,
            user.hashedPassword
          );
  
          if (!isCorrectPassword) {
            throw new Error('Incorrect password');
          }
  
          return user;
        }
      })
    ],
    pages: {
      signIn: '/auth' // login page
    },
    debug: process.env.NODE_ENV === 'development',
    adapter: PrismaAdapter(prismadb),
    // connection config setting
    session: { strategy: 'jwt' },
    jwt: {
        secret: process.env.NEXTAUTH_JWT_SECRET,
      },
    secret: process.env.NEXTAUTH_SECRET
  })
  
  