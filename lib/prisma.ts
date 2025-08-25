import { PrismaClient } from '@prisma/client'

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

// Create a mock Prisma client if the real one is not available (during build)
let prismaClient: PrismaClient;
try {
  prismaClient = globalForPrisma.prisma ?? new PrismaClient()
} catch (error) {
  // Fallback for build-time when Prisma client might not be generated
  console.warn('Prisma client not available, using mock for build');
  prismaClient = {} as PrismaClient;
}

export const prisma = prismaClient;

if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = prisma;
}