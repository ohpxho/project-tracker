import { NextApiRequest } from "next";
import { getModulesOfProject } from "@/lib/model/modules";

export async function GET(request: NextApiRequest) {
	try {
		const { id } = request.query;
		const projects = await getModulesOfProject(Number(id));
		if (!projects)
			throw new Error("Failed fetching modules of the project from the model.");

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
