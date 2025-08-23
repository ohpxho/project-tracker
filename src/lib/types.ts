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

interface Task {
  id: number;
  title: string;
  description: string;
  status: string;
  createdAt: Date;
  moduleId: number
}

export type { Project, Module, Task };
