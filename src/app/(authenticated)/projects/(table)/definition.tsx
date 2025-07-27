"use client";

import { ArrowUpDown, ChevronDown, MoreHorizontal } from "lucide-react";
import axios from "axios";
import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
	DropdownMenu,
	DropdownMenuCheckboxItem,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Project } from "@/lib/types";
import CircularProgress from "@/components/customized/progress/progress-08";
import Status from "@/components/status";

const columns: ColumnDef<Project>[] = [
	{
		id: "select",
		header: ({ table }) => (
			<Checkbox
				checked={
					table.getIsAllPageRowsSelected() ||
					(table.getIsSomePageRowsSelected() && "indeterminate")
				}
				onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
				aria-label="Select all"
			/>
		),
		cell: ({ row }) => (
			<Checkbox
				checked={row.getIsSelected()}
				onCheckedChange={(value) => row.toggleSelected(!!value)}
				aria-label="Select row"
			/>
		),
		enableSorting: false,
		enableHiding: false,
	},
	{
		accessorKey: "name",
		header: "Name",
		cell: ({ row }) => <div className="capitalize">{row.getValue("name")}</div>,
	},
	{
		accessorKey: "technologies",
		header: ({ column }) => {
			return (
				<Button
					variant="ghost"
					onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
				>
					Tech Stack
					<ArrowUpDown />
				</Button>
			);
		},
		cell: ({ row }) => (
			<div className="lowercase">{row.getValue("technologies")}</div>
		),
	},
	{
		accessorKey: "createdAt",
		header: () => <div className="">Started On</div>,
		cell: ({ row }) => {
			return <div className="">{row.getValue("createdAt")}</div>;
		},
	},
	{
		accessorKey: "progress",
		header: () => <div className="">Progress</div>,
		cell: ({ row }) => {
			const progress: number = row.getValue("progress");
			return (
				<div className="w-fit">
					{progress != null ? (
						<div className="max-w-xs flex flex-col items-center">
							<CircularProgress
								value={progress}
								renderLabel={(progress) => `${progress}%`}
								size={60}
								strokeWidth={5}
								showLabel
								labelClassName="text-[9px]"
							/>
						</div>
					) : (
						<span>No modules yet</span>
					)}
				</div>
			);
		},
	},
	{
		accessorKey: "status",
		header: () => <div className="">Status</div>,
		cell: ({ row }) => {
			return <Status status={row.getValue("status")} />;
		},
	},
	{
		id: "actions",
		enableHiding: false,
		cell: ({ row }) => {
			const payment = row.original;

			return (
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<Button variant="ghost" className="h-8 w-8 p-0">
							<span className="sr-only">Open menu</span>
							<MoreHorizontal />
						</Button>
					</DropdownMenuTrigger>
					<DropdownMenuContent align="end">
						<DropdownMenuLabel>Actions</DropdownMenuLabel>
						<DropdownMenuItem>Copy payment ID</DropdownMenuItem>
						<DropdownMenuSeparator />
						<DropdownMenuItem>View customer</DropdownMenuItem>
						<DropdownMenuItem>View payment details</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenu>
			);
		},
	},
];

export default columns;
