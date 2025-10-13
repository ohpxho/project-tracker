"use client"

import { useState, useEffect, use } from 'react'
import useSWR  from 'swr';
import { toast, Toaster } from "sonner";
import ProjectTask from './(tasks)/page';


interface PropType {
  params: Promise<{ id: number }>
}

const fetcher = (url: string) =>
	fetch(url).then(async (res) => {
		if (!res.ok) {
			const errorData = await res.json();
			throw new Error(errorData.message || `HTTP error! status: ${res.status}`);
		}
		return res.json();
	});

export default function Module({ params }: PropType) {
  const { id } = use(params);   
 
  const { data, error } = useSWR(`/api/modules/${id}`, fetcher);

  if (error) {
    toast.error("Something went wrong", {
      description: error.message
    })
  }

  return (
    <div className="w-full">
      <Toaster position="bottom-center" richColors />
      <ProjectTask moduleId={id} tasks={data} />
    </div>
  )

}
