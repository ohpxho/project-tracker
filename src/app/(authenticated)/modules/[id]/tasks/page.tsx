"use client";

import ProjectTasksKanban from "./kanban";
import useSWR from "swr";
import { toast, Toaster } from "sonner";
import { use } from "react";

const fetcher = (url: string) =>
	fetch(url).then(async (res) => {
		if (!res.ok) {
			const errorData = await res.json();
			throw new Error(errorData.message || `HTTP error! status: ${res.status}`);
		}
		return res.json();
	});

export default function Project({
	params,
}: {
	params: Promise<{ id: string }>;
}) {
	const { id } = use(params);

	const { data: project, error } = useSWR(`/api/projects/${id}`, fetcher);

	if (error) {
		toast.error("Something went wrong", {
			description: error.message,
		});
	}

	return (
		<div className="relative w-full max-w-[1440px]">
			<Toaster position="bottom-center" richColors />
			<div>
				<h1 className="font-bold">Task Monitoring</h1>
				<span>Monitor your project's task in this kanban board</span>
			</div>
			<div className="mt-8">
				<ProjectTasksKanban data={project} />
			</div>
		</div>
	);
}
