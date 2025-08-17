import prisma from "../prisma";


async function getModuleCountOfProject(projectId: number) {
	return await prisma.module.count({ where: { projectId: projectId } });
}

async function getModulesOfProject(projectId: number) {
	return await prisma.module.findMany({ where: { projectId: projectId } });
}

export { getModuleCountOfProject, getModulesOfProject };
