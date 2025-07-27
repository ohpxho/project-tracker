import prisma from "../prisma";

async function getAll() {
	return await prisma.project.findMany();
}

async function getAllWithModules() {
	return await prisma.project.findMany({
		include: {
			modules: true,
			_count: true,
		},
	});
}

export { getAll, getAllWithModules };
