"use client";

import { faker } from "@faker-js/faker";
import {
	KanbanBoard,
	KanbanCard,
	KanbanCards,
	KanbanHeader,
	KanbanProvider,
} from "@/components/ui/shadcn-io/kanban";
import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Project } from "@/lib/types";

const columns = [
	{ id: faker.string.uuid(), name: "Open", color: "#6B7280" },
	{ id: faker.string.uuid(), name: "In Progress", color: "#F59E0B" },
	{ id: faker.string.uuid(), name: "Done", color: "#10B981" },
];

interface PropType {
	data: Project;
}

export default function ProjectTasksKanban({ data }: PropType) {
	return (
		<div>
			<KanbanProvider columns={columns} data={[]}>
				{(column) => (
					<KanbanBoard id={column.id} key={column.id}>
						<KanbanHeader>
							<div className="flex items-center gap-2">
								<div
									className="h-2 w-2 rounded-full"
									style={{ backgroundColor: column.color }}
								/>
								<span>{column.name}</span>
							</div>
						</KanbanHeader>
					</KanbanBoard>
				)}
			</KanbanProvider>
		</div>
	);
}
