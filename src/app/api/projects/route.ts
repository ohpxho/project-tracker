import { NextRequest } from "next/server";
import { getAll } from "@/lib/model/projects";

export async function GET(request: Request) {
	try {
		const projects = await getAll();
		if (!projects) throw new Error("Failed fetching projects from the model.");

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
