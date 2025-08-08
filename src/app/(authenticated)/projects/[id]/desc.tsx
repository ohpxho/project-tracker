"use client";

import { Project } from "@/lib/types";
import { useState, useEffect, useRef } from "react";
import { marked } from "marked";

interface PropType {
	data: Project;
}

export default function ProjectDesc({ data }: PropType) {
	const editorRef = useRef<HTMLDivElement>(null);
  const content = useRef<string>(data?.description || undefined);
  
  const onContentChange = () => {
    content.current = editorRef.current?.innerText;
    console.log(content.current)
  }

 const onKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
  if (e.key === "Enter" && e.shiftKey) {
    e.preventDefault();

    const selection = window.getSelection();
    if (!selection?.rangeCount) return;

    const range = selection.getRangeAt(0);
    range.deleteContents();

    // Insert a <br> (line break)
    const br = document.createElement("br");
    range.insertNode(br);

    // Move cursor after the <br>
    range.setStartAfter(br);
    range.setEndAfter(br);
    selection.removeAllRanges();
    selection.addRange(range);
  }
};

	return (
		<div className="w-full">
			<div className="mb-4 text-sm text-gray-500">
				Created: {new Date(data?.createdAt).toLocaleDateString()}
			</div>
      <div 
        ref={editorRef}
        contentEditable
        className="focus:border-none outline-none border-none"
        onInput={onContentChange}
        onKeyDown={onKeyDown}
      >
        { content? content.current: "" }
      </div>		
		</div>
	);
}
