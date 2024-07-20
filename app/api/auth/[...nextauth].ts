import NextAuth, { AuthOptions } from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import { compare } from 'bcrypt';
import prismadb from '@/libs/prismadb';

// vaild account 
export default NextAuth({
    providers: [
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
            type: 'passord'
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
    // connection config setting
    session: { strategy: 'jwt' },
    jwt: {
        secret: process.env.NEXTAUTH_JWT_SECRET,
      },
    secret: process.env.NEXTAUTH_SECRET
  })
  
  