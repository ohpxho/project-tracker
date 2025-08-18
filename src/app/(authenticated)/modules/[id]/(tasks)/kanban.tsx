"use client";

import { useState, useEffect } from 'react';
import {
	KanbanBoard,
	KanbanCard,
	KanbanCards,
	KanbanHeader,
	KanbanProvider,
} from "@/components/ui/shadcn-io/kanban";
import { Task } from "@/lib/types";
import TaskSheet from './sheet';

const columns = [
	{ id: "open", name: "Open", color: "#6B7280" },
	{ id: "in-progress", name: "In Progress", color: "#F59E0B" },
	{ id: "done", name: "Done", color: "#10B981" },
];

interface PropType {
	data: Task[];
}

export default function ProjectTasksKanban({ data }: PropType) {
  const [tasks, setTasks] = useState<Task[]>(data || []);
  const [isOpenSheet, setIsOpenSheet] = useState<boolean>(false);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);

  useEffect(() => {
    if(!data) return;
    setTasks(data);
  }, [data])

  const mappedTasks = tasks.map(task => ({
    ...task,
    id: task.id.toString(),
    name: task.title,
    column: task.status === "done" ? "done" : task.status === "in-progress" ? "in-progress" : "open"
  }));

  function onCardClick(task: Task) {
    console.log("tes");
    console.log(task)
    setSelectedTask(task);
    setIsOpenSheet(true);
  }

	return (
		<div >
			<KanbanProvider columns={columns} data={mappedTasks}>
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
						<KanbanCards id={column.id}>
							{(task) => (
								<KanbanCard column={column.name} key={task.id} id={task.id} name={task.name} onClick={(e) => onCardClick(task) }>
									<div className="p-3">
										<h4 className="font-medium text-sm mb-2">{task.name}</h4>
										{task.description as string && (
											<p className="text-xs text-muted-foreground mb-2">
												{task.description as string}
											</p>
										)}
										<div className="text-xs text-muted-foreground">
											{new Date(task.createdAt).toLocaleDateString()}
										</div>
									</div>
								</KanbanCard>
							)}
						</KanbanCards>
					</KanbanBoard>
				)}
			</KanbanProvider>

      <TaskSheet  data={selectedTask} isOpen={isOpenSheet} setIsOpen={setIsOpenSheet}/>

		</div>
	);
}
