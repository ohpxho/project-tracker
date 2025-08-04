"use client";

import useSWR from "swr";
import { toast, Toaster } from "sonner";
import ProjectDesc from "./desc";
import { use } from "react";

interface PropType {
	params: Promise<{ id: number }>;
}

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
				<h1 className="font-bold">{project?.name}</h1>
			</div>
			<div>
				<ProjectDesc data={project} />
			</div>
			<div className="mt-8"></div>
		</div>
	);
}
