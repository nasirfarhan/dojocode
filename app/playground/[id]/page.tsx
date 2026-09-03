"use client";

import { Separator } from "@/components/ui/separator";
import { SidebarInset, SidebarTrigger } from "@/components/ui/sidebar";
import { TooltipProvider } from "@/components/ui/tooltip";
import { usePlayground } from "@/modules/playground/hooks/usePlayground";
import { useParams } from "next/navigation";

const MainPlaygroundPage = () => {
  const { id } = useParams<{ id: string }>();

  const { templateData } = usePlayground(id);

  console.log("template-data", templateData);

  return <TooltipProvider>
    <>
    {/*template file*/}
    <SidebarInset>
      <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4"></header>
      <SidebarTrigger className="-ml-1"/>
      <Separator/>
    </SidebarInset>
    </>
    
  </TooltipProvider>;
};

export default MainPlaygroundPage;