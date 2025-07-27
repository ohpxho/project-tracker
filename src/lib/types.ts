interface Project {
	id: number;
	name: string;
	description: string;
	technologies: string;
	createdAt: Date;
	status?: string;
	modules?: Module[];
	_count: {
		modules: number;
	};
}

interface Module {
	id: number;
	title: string;
	status: string;
	description: string;
	projectId: number;
	createdAt: Date;
}

export type { Project, Module };
