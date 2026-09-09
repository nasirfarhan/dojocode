"use client";

import { Separator } from "@/components/ui/separator";
import { SidebarInset, SidebarTrigger } from "@/components/ui/sidebar";
import { TooltipProvider } from "@/components/ui/tooltip";
import { TemplateFileTree } from "@/modules/playground/components/playground-explorer";
import { usePlayground } from "@/modules/playground/hooks/usePlayground";
import { useParams } from "next/navigation";

const MainPlaygroundPage = () => {
  const { id } = useParams<{ id: string }>();

  const { templateData, playgroundData } = usePlayground(id);

  console.log("template-data", templateData);
  
  return <TooltipProvider>
    <>
      <TemplateFileTree 
      data = {templateData}
      onFileSelect = {()=>{}}
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