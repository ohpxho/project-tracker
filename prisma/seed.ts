import { Prisma, PrismaClient } from "@/generated/prisma";

const prisma = new PrismaClient();

const projectsData = [
	{
		name: "Project Tracker",
		description: "My development project tracker",
		technologies: "nextjs,prisma",
	},
	{
		name: "E-commerce App",
		description: "Online shopping platform",
		technologies: "react,nodejs,mongodb",
	},
];

const modulesData = [
	{
		title: "Project Tracker",
		description: "Kanban board and table shits",
		projectName: "Project Tracker",
	},
	{
		title: "User Management",
		description: "User authentication and profiles",
		projectName: "E-commerce App",
	},
];

const tagsData = [
	{ title: "fullstack" },
	{ title: "frontend" },
	{ title: "backend" },
	{ title: "database" },
];

const tasksData = [
	{
		title: "Kanban board",
		description: "Task monitoring board",
		moduleTitle: "Project Tracker",
		tagTitle: "fullstack",
	},
	{
		title: "User authentication",
		description: "Login and registration system",
		moduleTitle: "User Management",
		tagTitle: "backend",
	},
];

async function seed() {
	const projects = await Promise.all(
		projectsData.map((data) => prisma.project.create({ data }))
	);

	const tags = await Promise.all(
		tagsData.map((data) => prisma.tag.create({ data }))
	);

	const modules = await Promise.all(
		modulesData.map((data) => {
			const project = projects.find((p) => p.name === data.projectName);
			return prisma.module.create({
				data: {
					title: data.title,
					description: data.description,
					projectId: project!.id,
				},
			});
		})
	);

	await Promise.all(
		tasksData.map((data) => {
			const module = modules.find((m) => m.title === data.moduleTitle);
			const tag = tags.find((t) => t.title === data.tagTitle);
			return prisma.task.create({
				data: {
					title: data.title,
					description: data.description,
					moduleId: module!.id,
					tagId: tag!.id,
				},
			});
		})
	);
}

seed();
