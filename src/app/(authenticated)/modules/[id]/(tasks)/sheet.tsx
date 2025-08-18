"use client"

import { useState } from "react";
import { Task } from "@/lib/types"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"

interface Proptype {
  data: Task | null;
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function TaskSheet({ data, isOpen, setIsOpen }: Proptype) {

   return (
   <Sheet open={isOpen} onOpenChange={setIsOpen}>
  <SheetContent>
    <SheetHeader>
      <SheetTitle>{data?.title || "Task Details"}</SheetTitle>
      <SheetDescription>
        {data?.description || "No description available"}
      </SheetDescription>
    </SheetHeader>
    {data && (
      <div className="mt-4 space-y-4">
        <div>
          <h4 className="text-sm font-medium">Status</h4>
          <p className="text-sm text-muted-foreground">{data.status}</p>
        </div>
        <div>
          <h4 className="text-sm font-medium">Created</h4>
          <p className="text-sm text-muted-foreground">
            {new Date(data.createdAt).toLocaleDateString()}
          </p>
        </div>
      </div>
    )}
  </SheetContent>
</Sheet>
   );
}
