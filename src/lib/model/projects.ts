import prisma from "../prisma";

async function getAll() {
	return await prisma.project.findMany();
}

async function getAllWithModules() {
	return await prisma.project.findMany({
		include: {
			modules: true,
      tags:true,
			_count: true,
		},
	});
}

async function getProjectDetails(id: number) {
	return await prisma.project.findFirst({
		where: { id },
		include: {
			modules: true,
      tags: true,
			_count: true,
		},
	});
}

export { getAll, getAllWithModules, getProjectDetails };
