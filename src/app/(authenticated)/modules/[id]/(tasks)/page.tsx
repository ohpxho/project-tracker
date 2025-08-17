"use client";

import ProjectTasksKanban from "./kanban";
import { Task } from "@/lib/types";

interface PropTypes {
  tasks: Task[]
}

export default function ProjectTask({ tasks }: PropTypes) {

	return (
		<div className="relative w-full max-w-[1440px]">
			<div>
				<h1 className="font-bold">Task Monitoring</h1>
				<span>Monitor your project's task in this kanban board</span>
			</div>
			<div className="mt-8">
				<ProjectTasksKanban data={tasks} />
			</div>
		</div>
	);
}
