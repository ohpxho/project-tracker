import prisma  from '../prisma'

export function getTasksByModule(id: number) {
  return prisma.task.findMany({
    where: {
      id: id
    }
  })
}
