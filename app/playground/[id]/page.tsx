"use client";

import { usePlayground } from "@/modules/playground/hooks/usePlayground";
import { useParams } from "next/navigation";

const MainPlaygroundPage = () => {
  const { id } = useParams<{ id: string }>();

  const { templateData } = usePlayground(id);

  console.log("template-data", templateData);

  return <div>Params:{id}</div>;
};

export default MainPlaygroundPage;