"use client";

import ProjectTasksKanban from "./kanban";

export default function ProjectTasks() {
	return (
		<div className="relative flex flex-col gap-4">
			<div>
				<h1 className="font-bold">Task Monitoring</h1>
				<span>Monitor your project's task in this kanban board</span>
			</div>
			<div>
				<ProjectTasksKanban />
			</div>
		</div>
	);
}
