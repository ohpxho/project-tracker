"use client";

import { Project } from "@/lib/types";

interface PropType {
	data: Project;
}

export default function ProjectDesc({ data }: PropType) {
	return (
		<div className="">
			<div>{`${data?.createdAt}`}</div>
		</div>
	);
}
