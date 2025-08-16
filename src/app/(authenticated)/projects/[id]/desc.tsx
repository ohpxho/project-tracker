"use client";

import { useState, useEffect } from "react";
import dynamic from "next/dynamic";

const MDEditor = dynamic(
  () => import("@uiw/react-md-editor").then((mod) => mod.default),
  { ssr: false }
);

interface PropType {
  desc: string;
  setDesc: React.Dispatch<React.SetStateAction<string>>;
  isEditing: boolean;
}

export default function ProjectDesc({ desc, setDesc, isEditing }: PropType) {
  const [UIWMode, setUIWMode] = useState<string>("preview");
  
  useEffect(() => {
    if(isEditing) setUIWMode("live");
    else setUIWMode("preview")
  }, [isEditing])

	return (
        <div className="flex flex-col gap-4">
          <div className="flex justify-between items-center">
          </div>
            <div className="overflow-hidden">
              <MDEditor
                value={desc}
                onChange={(val) => setDesc(val || "")}
                data-color-mode="light"
                height={1200}
                visibleDragbar={false}
                preview={UIWMode}
                hideToolbar={true}
              />
            </div>
        </div>
	);
}
