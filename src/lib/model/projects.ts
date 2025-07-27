import prisma from "../prisma";

async function getAll() {
	return await prisma.project.findMany();
}

export { getAll };
