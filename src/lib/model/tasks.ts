import prisma  from '../prisma'

export function getTasksByModule(id: number) {
  return prisma.task.findUnique({
    where: {
      id: id
    }
  })
}
