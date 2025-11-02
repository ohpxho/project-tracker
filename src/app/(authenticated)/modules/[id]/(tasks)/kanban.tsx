"use client";

import { useState, useEffect } from "react";
import {
	KanbanBoard,
	KanbanCard,
	KanbanCards,
	KanbanHeader,
	KanbanProvider,
} from "@/components/ui/shadcn-io/kanban";
import { Task } from "@/lib/types";
import TaskSheet from "./sheet";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { generateUUIDv4 } from "@/lib/utils";

const columns = [
	{ id: "open", name: "Open", color: "#6B7280" },
	{ id: "in-progress", name: "In Progress", color: "#F59E0B" },
	{ id: "done", name: "Done", color: "#10B981" },
];

interface PropType {
	moduleId: number;
	data: Task[];
}

export default function ProjectTasksKanban({ data }: PropType) {
	const [tasks, setTasks] = useState<Task[]>(data || []);
	const [isOpenSheet, setIsOpenSheet] = useState<boolean>(false);
	const [selectedTask, setSelectedTask] = useState<Task | null>(null);
	const [editableCard, setEditableCard] = useState<string | null>(null);
	const [buffer, setBuffer] = useState<Task[]>(data || []);

	useEffect(() => {
		if (!data) return;
		setTasks(data);
	}, [data]);

	const mappedTasks = tasks.map(task => ({
		...task,
		id: task.id.toString(),
		name: task.title,
		column:
			task.status === "done"
				? "done"
				: task.status === "in-progress"
					? "in-progress"
					: "open",
	}));

	const onCardClick = (task: Task) => {
		setSelectedTask(task);
		setIsOpenSheet(true);
	};

	const addCard = (status: string) => {
		const id = generateUUIDv4();
		const title = "QWERTY";
		const desc = "";

		const newCard: Task = {
			id,
			title,
			description: desc,
			status,
			moduleId,
		};
	};

	return (
		<div>
			<KanbanProvider columns={columns} data={mappedTasks}>
				{column => (
					<KanbanBoard id={column.id} key={column.id}>
						<KanbanHeader>
							<div className="flex items-center gap-2">
								<div
									className="h-2 w-2 rounded-full"
									style={{ backgroundColor: column.color }}
								/>
								<span>{column.name}</span>
								<Button className="bg-transparent hover:bg-transparen text-gray-500 hover:text-black transition-colors outline-none p-0 shadow-none cursor-pointer">
									<Plus height={20} width={20} onClick={addCard} />
								</Button>
							</div>
						</KanbanHeader>
						<KanbanCards id={column.id}>
							{task => (
								<KanbanCard
									column={column.name}
									key={task.id}
									id={task.id}
									name={task.name}
									className="cursor-pointer hover:bg-gray-50"
								>
									<div
										key={task.id}
										onPointerDown={e => e.stopPropagation()}
										onClick={() => onCardClick(task)}
									>
										<div className="">
											<Input
												type="text"
												onClick={e => e.stopPropagation()}
												value={task.name}
												className=" disabled:opacity-100 disabled:text-black disabled:bg-transparent disabled:border-none disabled:shadow-none border-none bg-transparent shadow-none outline-none"
												disabled={editableCard == task.id ? false : false}
											/>
										</div>
									</div>
								</KanbanCard>
							)}
						</KanbanCards>
					</KanbanBoard>
				)}
			</KanbanProvider>

			<TaskSheet
				data={selectedTask}
				isOpen={isOpenSheet}
				setIsOpen={setIsOpenSheet}
			/>
		</div>
	);
}
