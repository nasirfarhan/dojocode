"use server"

import { db } from "@/lib/db";
import { currentUser } from "@/modules/auth/actions";
import type { TemplateFolder } from "../lib/path-to-json";

export const getPlaygroundById = async (id: string): Promise<{
  templateFiles?: Array<{ content: unknown }>;
} | null> => {
  try {
    const playground = await db.playground.findUnique({
      where: { id },
      select: {
        title:true,
        templateFiles: {
          select: {
            content: true,
          },
        },
      },
    });

    return playground;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const saveUpdatedCode = async (playgroundId: string, data: TemplateFolder) => {
  const user = await currentUser();
  if (!user) return null;

  try {
    const updatedPlayground = await db.templateFile.upsert({
      where: {
        playgroundId,
      },
      update: {
        content: JSON.stringify(data),
      },
      create: {
        playgroundId,
        content: JSON.stringify(data),
      },
    });

    return updatedPlayground;
  } catch (error) {
    console.error("Save updated code error", error);
    return null;
  }
};