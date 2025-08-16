"use client";

import { useState, useEffect, KeyboardEvent } from "react";
import useSWR from "swr";
import { toast, Toaster } from "sonner";
import { Separator } from "@/components/ui/separator";
import { MultiSelect } from "@/components/ui/multi-select";
import ProjectDesc from "./desc";
import { use } from "react";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import { ModulesTable } from "./(table)/table";
import { Edit, Clock, Save, Tags } from "lucide-react";

interface PropType {
	params: Promise<{ id: number }>;
}

const frameworksList = [
  { value: "next.js", label: "Next.js" },
  { value: "react", label: "React" },
  { value: "vue", label: "Vue.js" },
  { value: "angular", label: "Angular" },
];

const fetcher = (url: string) =>
	fetch(url).then(async (res) => {
		if (!res.ok) {
			const errorData = await res.json();
			throw new Error(errorData.message || `HTTP error! status: ${res.status}`);
		}
		return res.json();
	});

export default function Project({ params }: PropType) {
	const { id } = use(params);
  const [title, setTitle] = useState<string>("");
  const [rawDescription, setRawDescription] = useState<string>("");
  const [isEditing, setIsEditing] = useState<boolean>(false);

	const { data: project, error } = useSWR(`/api/projects/${id}`, fetcher);

  useEffect(() => {
    if(!project) return
    setTitle(project.name);
    setRawDescription(project.description || "")
  }, [project]);

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };
  
  const setToEditingMode = () => {
    setIsEditing(true)
  }

  const exitEditingMode = () => {
    setIsEditing(false);
  }

  const titleOnKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if(e.key === 'Enter') {
      e.preventDefault();
    }
  }

	if (error) {
		toast.error("Something went wrong", {
			description: error.message,
		});
	}

	return (
		<div className="relative w-full max-w-[1440px]">
			<Toaster position="bottom-center" richColors />
    <div className="w-full flex flex-col items-center">
      <div className="flex flex-col min-w-[500px] w-full max-w-4xl mt-4 gap-4 px-4">
      <Tabs defaultValue="desc">
            <div className="w-full flex items-center justify-center">
        <TabsList className="rounded-full p-2 w-fit h-fit">
          <TabsTrigger value="desc" className="p-2 rounded-full">Description</TabsTrigger>
          <TabsTrigger value="modules" className="p-2 rounded-full">Modules</TabsTrigger>
        </TabsList>
        </div>

       <div className="w-full mt-6 px-4 flex items-end justify-end">
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

        <div className="mb-4 flex flex-col gap-3">
          <div className="flex gap-4 text-sm px-4">
            <div className="flex items-center gap-1 w-[100px] text-gray-500">
              <Clock className="h-4 w-4" strokeWidth={1.5}/>
              <span>Created At</span>
            </div>
            {new Date(project?.createdAt).toLocaleDateString()}
          </div>
          <div className=" flex gap-4 text-sm px-4">
            <div className="flex items-center w-[100px] gap-1 text-gray-500">
              <Tags className="h-4 w-4" strokeWidth={1.5}/>
              <span>Tags</span>
            </div>
            <div className="w-full">
            <MultiSelect
                options={frameworksList}
                placeholder="Choose frameworks..."
                className="border-none shadow-none"
                isShowRemoveBadge={false}
              />
              </div>
          </div>

        </div>


        <Separator />

        <TabsContent value="desc">
          <div>
            <ProjectDesc isEditing={isEditing} desc={rawDescription} setDesc={setRawDescription} />
          </div>
        </TabsContent>
        <TabsContent value="modules">
          <div>
            <ModulesTable modules={project?.modules} />
          </div>
        </TabsContent>
      </Tabs>
      </div>
      </div>
		</div>
	);
}
