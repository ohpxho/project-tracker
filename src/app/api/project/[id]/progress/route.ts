import { NextApiRequest } from "next";
import { getModulesOfProject } from "@/lib/model/modules";
import { getProjectProgress } from "@/lib/service/projects";

export async function GET(request: NextApiRequest) {
	try {
		const { id } = request.query;
		const modules = await getModulesOfProject(Number(id));
		if (!modules)
			throw new Error("Failed fetching modules of the project from the model.");

		const progress = getProjectProgress(modules);

		return new Response(JSON.stringify(progress), {
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
