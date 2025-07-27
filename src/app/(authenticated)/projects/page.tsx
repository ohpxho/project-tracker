"use client";

import { useEffect } from "react";
import { ProjectsTable } from "./(table)/table";
import Project from "@/app/api/projects/route";
import useSWR from "swr";
import { toast, Toaster } from "sonner";

const fetcher = (url: string) =>
	fetch(url).then(async (res) => {
		if (!res.ok) {
			const errorData = await res.json();
			throw new Error(errorData.message || `HTTP error! status: ${res.status}`);
		}
		return res.json();
	});

export default function Projects() {
	const { data: projects, error } = useSWR("/api/projects", fetcher);

	if (error) {
		toast.error("Something went wrong", {
			description: error.message,
		});
	}

	return (
		<div className="relative w-full max-w-[1440px]">
			<Toaster position="bottom-center" richColors />
			<div>
				<ProjectsTable projects={projects || []} />
			</div>
		</div>
	);
}
