export default function Status({ status }: { status: string }) {
	let style = "";

	switch (status) {
		case "open":
			style = "p-1 text-xs rounded-sm bg-blue-700 text-white";
			break;
		case "done":
			style = "p-1 text-xs rounded-sm bg-green-700 text-white";
	}

	return <span className={style}>{status}</span>;
}
