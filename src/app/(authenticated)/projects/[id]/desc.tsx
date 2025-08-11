"use client";

import { Project } from "@/lib/types";
import { useState, useEffect, KeyboardEvent } from "react";
import { Separator } from "@/components/ui/separator";
import { Edit, Save, Clock } from "lucide-react";
import dynamic from "next/dynamic";

const MDEditor = dynamic(
  () => import("@uiw/react-md-editor").then((mod) => mod.default),
  { ssr: false }
);

interface PropType {
	data: Project;
}

type EditorType = 'uiw' | 'react-markdown';

export default function ProjectDesc({ data }: PropType) {
  const [title, setTitle] = useState<string>("");
  const [rawDescription, setRawDescription] = useState<string>("");
  const [UIWMode, setUIWMode] = useState<string>("preview");
  const [isEditing, setIsEditing] = useState<boolean>(false);
  
  useEffect(() => {
    if(!data) return
    setTitle(data.name);
    setRawDescription(data.description || "")
  }, [data]);

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };
  
  const setToEditingMode = () => {
    setIsEditing(true)
    setUIWMode("live");
  }

  const exitEditingMode = () => {
    setIsEditing(false);
    setUIWMode("preview");
  }

  const titleOnKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if(e.key === 'Enter') {
      e.preventDefault();
    }
  }

	return (
    <div className="w-full flex flex-col items-center">
      <div className="flex flex-col min-w-[500px] w-full max-w-4xl mt-12 gap-4 px-4">
        <div className="w-full px-4 flex items-end justify-end">
          { !isEditing?
            (
              <button
                onClick={() => setToEditingMode()}
                className="p-1 text-gray-400 hover:text-gray-600 cursor-pointer"
              >
                <Edit size={16} />
              </button>
            ) : 
            (
              <button
                onClick={() => exitEditingMode()}
                className="p-1 text-gray-400 hover:text-gray-600 cursor-pointer"
              >
                <Save size={16} />
              </button>
            )
          }
        </div>
        <div className="flex items-center gap-2">
          {isEditing ? (
            <input
              type="text"
              value={title}
              onChange={handleTitleChange}
              onKeyDown={(e) => titleOnKeyDown(e)}
              className="font-bold px-4 border-none outline-none focus:border-none text-4xl bg-transparent w-full"
              autoFocus
            />
          ) : (
            <h1 
              className="font-bold text-4xl px-4"
            >
              {title || "Untitled Project"}
            </h1>
          )}
        </div>

        <div className="mb-4 flex gap-4 text-sm px-4">
          <div className="flex items-center gap-1 text-gray-500">
            <Clock className="h-4 w-4" strokeWidth={1.5}/>
            <span>Created At</span>
          </div>
          {new Date(data?.createdAt).toLocaleDateString()}
        </div>

        <Separator />
        
        <div className="flex flex-col gap-4">
          <div className="flex justify-between items-center">
          </div>
            <div className="overflow-hidden">
              <MDEditor
                value={rawDescription}
                onChange={(val) => setRawDescription(val || "")}
                data-color-mode="light"
                height={1200}
                visibleDragbar={false}
                preview={UIWMode}
                hideToolbar={true}
              />
            </div>
        </div>
      </div>
    </div>
	);
}
