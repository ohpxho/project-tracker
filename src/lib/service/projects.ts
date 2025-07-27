import { Module } from "../types";

export function getProjectProgress(modules: Module[]) {
	const noOfModules = modules.length;
	let completed = 0;

	for (const module of modules) {
		if (module.status == "done") completed += 1;
	}
	const percent = completed / noOfModules;
	const transformed = percent.toFixed(2);
	return Number(transformed) * 100;
}
