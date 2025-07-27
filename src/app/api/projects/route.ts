import { NextRequest } from "next/server";
import { getAllWithModules } from "@/lib/model/projects";
import { getProjectProgress } from "@/lib/service/projects";

export async function GET(request: Request) {
	try {
		let projects = await getAllWithModules();
		if (!projects) throw new Error("Failed fetching projects from the model.");

		//add the current percent of progress per project
		projects = projects.map((project) => {
			const progress = getProjectProgress(project.modules);
			return { ...project, progress };
		});

		return new Response(JSON.stringify(projects), {
			status: 200,
			headers: { "Content-Type": "application/json" },
		});
	} catch (error) {
		return new Response(
			JSON.stringify({
				message: (error as Error).message || "Internal Server Error",
			}),
			{
				status: 500,
				headers: { "Content-Type": "application/json" },
			}
		);
	}
}

export default {
	GET,
};
