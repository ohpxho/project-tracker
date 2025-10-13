import prisma  from '../prisma'
import { Task } from '../types'

export function getTasksByModule(id: number) {
  return prisma.task.findMany({
    where: {
      moduleId: id
   }
  })
}

export function addNewTask(data: Task) {

}
