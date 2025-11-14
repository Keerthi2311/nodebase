import { PrismaClient } from "@prisma/client";

const globalForPrisma = global as unknown as {
    prisma: PrismaClient;
};

const prisma = globalForPrisma.prisma || newPrismaClient();

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;

export default prisma;

function newPrismaClient() {
    return new PrismaClient({
        log: [
            {emit: "event", level: "query"},
            {emit: "event", level: "error"},
            {emit: "event", level: "info"},
            {emit: "event", level: "warn"},
        ],
    });
}