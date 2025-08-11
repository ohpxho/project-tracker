import { Prisma, PrismaClient } from "@/generated/prisma";

const prisma = new PrismaClient();

const tagsData = [
	{ title: "fullstack" },
	{ title: "frontend" },
	{ title: "backend" },
	{ title: "database" },
  { title: "prisma" },
  { title: "nextjs"},
  { title: "laravel"}
];

const projectsData = [
	{
		name: "Project Tracker",
		description: "My development project tracker",
    tags: {
      nextjs : "nextjs", 
      laravel: "laravel"
    }
	},
	{
		name: "E-commerce App",
		description: "Online shopping platform",
    tags: {
      prisma: "prisma",
      nextjs: "nextjs"
    }
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


const tasksData = [
	{
		title: "Kanban board",
		description: "Task monitoring board",
		moduleTitle: "Project Tracker",
    tags: {
      fullstack: "fullstack",
    }
	},
	{
		title: "User authentication",
		description: "Login and registration system",
		moduleTitle: "User Management",
    tags: {
      frontend: "frontend",
      backend: "backend",
    }
	},
];

async function seed() {
	const tags = await Promise.all(
		tagsData.map((data) => prisma.tag.create({ data }))
	);

	const projects = await Promise.all(
		projectsData.map((data) => { 
      const tgs = tags.filter((tag) => data.tags[tag.title as keyof typeof data.tags])
      return prisma.project.create({
        data: {
          name: data.name,
          description: data.description,
          tags: {
            connect: [...tgs]
          }
        }
      });
	  })
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
			const tag = tags.filter((t) => data.tags[t.title as keyof typeof data.tags]);
			return prisma.task.create({
				data: {
					title: data.title,
					description: data.description,
					moduleId: module!.id,
					tags: {
            connect: [...tag]
          }
				},
			});
		})
	);
}

seed();
