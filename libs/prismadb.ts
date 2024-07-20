import { PrismaClient } from '@prisma/client'

const client = global.prismadb || new PrismaClient() // when exist connector
if (process.env.NODE_ENV !== 'production') global.prismadb = client // only test

export default client
