"use client"

import { ReactNode, useState } from "react";

interface ProblemLayoutProps {
	children: ReactNode;
}

export default function ProblemLayout({
	children,
}: ProblemLayoutProps) {
	const [isLoading, setIsLoading] = useState(false);

	return (<>{children}</>);
}
      
