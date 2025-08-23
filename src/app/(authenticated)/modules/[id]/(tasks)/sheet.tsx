"use client"

import { useState, useEffect } from "react";
import { Task } from "@/lib/types"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet"
import dynamic from "next/dynamic";
import Link from "next/link";

const MDEditor = dynamic(
  () => import("@uiw/react-md-editor").then((mod) => mod.default),
  { ssr: false }
);

interface Proptype {
  data: Task | null;
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function TaskSheet({ data, isOpen, setIsOpen }: Proptype) {
  const [UIWMode, setUIWMode] = useState<string>("preview");
  const [desc, setDesc] = useState<string>(data?.description || "");
  const [isEditing, setIsEditing] = useState<boolean>(false);

  useEffect(() => {
    if(isEditing) setUIWMode("live");
    else setUIWMode("preview")
  }, [isEditing])

  return (
   <Sheet open={isOpen} onOpenChange={setIsOpen}>
  <SheetContent className="w-600px sm:max-w-[80vw]">
    <SheetHeader>
      <SheetTitle>{data?.title || "Task Details"}</SheetTitle>
      <SheetDescription>
          <p className="text-sm text-muted-foreground">{data?.status}</p>
      </SheetDescription>
    </SheetHeader>
    {data && (
      <div className="mt-4 space-y-4">
        <div>
          <h4 className="text-sm font-medium">Description</h4>
              <MDEditor
                value={desc}
                onChange={(val) => setDesc(val || "")}
                data-color-mode="light"
                visibleDragbar={false}
                preview={UIWMode}
                hideToolbar={true}
              />
        </div>
        <div>
          <h4 className="text-sm font-medium">Created</h4>
          <p className="text-sm text-muted-foreground">
            {new Date(data.createdAt).toLocaleDateString()}
          </p>
        </div>
      <Link href={`/modules/${data.moduleId}/problems`}>Problem</Link>
      </div>
    )}
  </SheetContent>
</Sheet>
   );
}
