import prisma from "../prisma";

async function getAllProblemsByModule(id: number) {
  return prisma.module.findUnique({
    where: {
      id
    }
  })
}
