import { PrismaClient } from "@prisma/client";
import { env } from "~/env.mjs";

// prevents new PrismaClient() from running on every Hot Module Reload
// https://www.prisma.io/docs/guides/performance-and-optimization/connection-management#prismaclient-in-long-running-applications

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};
debugger;
export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log:
      env.NODE_ENV === "development" ? ["query", "error", "warn"] : ["error"],
  });

if (env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
