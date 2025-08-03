import { getProjectDetails } from "@/lib/model/projects";

export async function GET(
	request: Request,
	{ params }: { params: { id: string } }
) {
	try {
		const { id: pid } = await params;
		const id = parseInt(pid);
		const project = await getProjectDetails(id);

		if (!project) throw new Error("Failed to load the project");

		return new Response(JSON.stringify(project), {
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
