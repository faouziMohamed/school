import { PrismaClient } from '@prisma/client';

// noinspection JSUnresolvedReference
const prisma = global.prismaClient || new PrismaClient();
if (process.env.NODE_ENV === 'development') global.prismaClient = prisma;
export default prisma;
