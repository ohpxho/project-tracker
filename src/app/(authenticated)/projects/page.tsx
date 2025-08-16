"use client";

import { ProjectsTable } from "./(table)/table";
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
      <div className="w-full flex flex-col items-center">
        <div className="flex flex-col min-w-[500px] w-full max-w-4xl mt-12 gap-4 px-4">
          <ProjectsTable projects={projects || []} />
        </div>
    </div>
		</div>
	);
}
