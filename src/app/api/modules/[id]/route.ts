import { NextRequest } from "next/server";
import { getTasksByModule } from "@/lib/model/tasks";


export async function GET(request: Request, { params }: { params: { id: string }}) {
  try {
    const { id: mid } = await params;
    const id = parseInt(mid)
    const tasks = await getTasksByModule(id);
    console.log(tasks);
    if (!tasks) throw new Error("Failed to load tasks")

    return new Response(JSON.stringify(tasks), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    })
  } catch (error) {
    return new Response(JSON.stringify({ message: (error as Error).message || "Internal Server Error" }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" }
      });
  }
}
