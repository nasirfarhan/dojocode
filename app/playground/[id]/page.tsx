"use client";

import { Separator } from "@/components/ui/separator";
import { SidebarInset, SidebarTrigger } from "@/components/ui/sidebar";
import { TooltipProvider } from "@/components/ui/tooltip";
import { TemplateFileTree } from "@/modules/playground/components/playground-explorer";
import { useFileExplorer } from "@/modules/playground/hooks/useFileExplorer";
import { usePlayground } from "@/modules/playground/hooks/usePlayground";
import { TemplateFile } from "@/modules/playground/lib/path-to-json";
import { useParams } from "next/navigation";
import { useEffect } from "react";

const MainPlaygroundPage = () => {
  const { id } = useParams<{ id: string }>();

  const { templateData, playgroundData } = usePlayground(id);

  const{
    setPlaygroundId,
    setActiveFileId,
    setTemplateData,
    setOpenFiles,
    activeFileId,
    closeAllFiles,
    openFile,
    openFiles

  }= useFileExplorer()

  useEffect(()=>{setPlaygroundId(id)},[id,setPlaygroundId])

  useEffect(()=>{
    if(templateData&& !openFiles.length){
    setTemplateData(templateData)
  }
  },[templateData , setTemplateData , openFiles.length])

  const activeFile = openFiles.find((f)=> f.id === activeFileId)
  
  const hasUnsavedChanges = openFiles.some((f)=>f.hasUnsavedChanges)

  const handleFileSelect = (file:TemplateFile)=>{
    openFile(file)
  }
  return <TooltipProvider>
    <>
      <TemplateFileTree 
      data = {templateData!}
      onFileSelect = {handleFileSelect}
      selectedFile={activeFile}
      title= "File Explorer"
      onAddFile = {()=>{}}
      onAddFolder = {()=>{}}
      onDeleteFile = {()=>{}}
      onDeleteFolder = {()=>{}}
      onRenameFile = {()=>{}}
      onRenameFolder = {()=>{}}

      
      />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
          <Separator orientation="vertical" className="mr-2 h-4" />
        </header>
        <SidebarTrigger className="-ml-1" />

        <div className="flex flext-1 items-center gap -2">
          <div className="flex flex-col flex-1">
             <h1 className="text-sm font-medium">
              {playgroundData?.title||"Code playground"}

             </h1>
          </div>

        </div>
      </SidebarInset>
    </>

  </TooltipProvider>;
};

export default MainPlaygroundPage;