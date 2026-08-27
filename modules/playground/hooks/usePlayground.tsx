import { useCallback, useEffect, useState } from "react";
import { toast } from "sonner";
import type { TemplateFolder } from "../lib/path-to-json";
import { getPlaygroundById, saveUpdatedCode } from "../actions";

interface PlaygroundData {
  templateFiles?: Array<{ content: unknown }>;
}

interface UsePlaygroundReturn {
  playgroundData: PlaygroundData | null;
  templateData: TemplateFolder;
  isLoading: boolean;
  error: string | null;
  loadPlayground: () => Promise<void>;
  saveTemplateData: (data: TemplateFolder) => Promise<void>;
}

function isTemplateFolder(value: unknown): value is TemplateFolder {
  if (!value || typeof value !== "object") return false;

  const folder = value as Partial<TemplateFolder>;
  return typeof folder.folderName === "string" && Array.isArray(folder.items);
}

export const usePlayground = (id: string): UsePlaygroundReturn => {
  const [playgroundData, setPlaygroundData] = useState<PlaygroundData | null>(null);
  const [templateData, setTemplateData] = useState<TemplateFolder | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadPlayground = useCallback(async () => {
    if (!id) return;

    try {
      setIsLoading(true);
      setError(null);

      const data = await getPlaygroundById(id);
      setPlaygroundData(data ?? null);

      const rawContent = data?.templateFiles?.[0]?.content;
      let savedTemplate: unknown = rawContent;

      if (typeof rawContent === "string") {
        try {
          savedTemplate = JSON.parse(rawContent);
        } catch {
          console.warn("Saved template content was not valid JSON, falling back to API template");
        }
      }

      if (isTemplateFolder(savedTemplate)) {
        setTemplateData(savedTemplate);
        toast.success("Playground loaded successfully");
        return;
      }

      const res = await fetch(`/api/template/${id}`);
      if (!res.ok) {
        throw new Error(`Failed to load template: ${res.status}`);
      }

      const templateRes = await res.json();
      const templateJson = templateRes.templateJson ?? {
        folderName: "Root",
        items: [],
      };

      setTemplateData(
        Array.isArray(templateJson)
          ? { folderName: "Root", items: templateJson }
          : (templateJson as TemplateFolder),
      );

      toast.success("Template loaded successfully");
    } catch (loadError) {
      console.error("Error loading playground ", loadError);
      setError("Failed to load playground data");
      toast.error("Failed to load playground data");
    } finally {
      setIsLoading(false);
    }
  }, [id]);

  const saveTemplateData = useCallback(async (data: TemplateFolder) => {
    try {
      await saveUpdatedCode(id, data);
      setTemplateData(data);
      toast.success("Changes saved successfully");
    } catch (saveError) {
      console.error("Error saving template data", saveError);
      toast.error("Failed to save changes");
      throw saveError;
    }
  }, [id]);

  useEffect(() => {
    void loadPlayground();
  }, [loadPlayground]);

  return {
    playgroundData,
    templateData: templateData ?? { folderName: "Root", items: [] },
    isLoading,
    error,
    loadPlayground,
    saveTemplateData,
  };
};

 