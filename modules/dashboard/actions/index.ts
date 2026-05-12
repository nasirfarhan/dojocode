"use server";

import { db } from "@/lib/db";
import { currentUser } from "@/modules/auth/actions";
import { revalidatePath } from "next/cache";
import { title } from "process";


export async function toggleStarMarked(playgroundId:string , isChecked:boolean){
  const user = await currentUser();
  const userId = user?.id
  if(!userId){
    throw new Error("User Id is required")
  }

  try {
    if(isChecked){
      await db.starMark.create({
        data:{
            userId: userId,
            playgroundId,
            isMarked:isChecked
        }
      })
    }else{
        await db.starMark.delete({
            where:{
                userId_playgroundId:{
                    userId,
                    playgroundId:playgroundId
                }
            }
        })

    }
    revalidatePath("/dashboard")
    return {success: true , isMarked: isChecked};
  } catch (error) {
    console.error(error);
    return{success:false , error:"Failed to update starmark"}
  }
}
export async function getAllPlaygroundForUser() {
    const user = await currentUser();

    if (!user?.id) {
        return [];
    }

    try {
        const playground = await db.playground.findMany({
            where: {
                userId: user.id,
            },
            include: {
                user: true,
                Starmark: {
                    where: {
                        userId: user.id,
                    },
                    select: {
                        isMarked: true,
                    },
                },
            },
        });

        return playground;
    } catch (error) {
        console.error(error);
        return [];
    }
}
export const createPlayground = async (data: {
  title: string;
  template:
    | "REACT"
    | "NEXTJS"
    | "EXPRESS"
    | "VUE"
    | "HONO"
    | "ANGULAR";
  description?: string;
}) => {
  const user = await currentUser();

  if (!user?.id) {
    throw new Error("Unauthorized");
  }

  const { template, title, description } = data;

  try {
    const playground = await db.playground.create({
      data: {
        title,
        description,
        template,
        userId: user.id,
      },
    });

    return playground;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export async function deleteProjectById(id: string) {
    try {
        await db.playground.delete ({
            where: {
                id
            }
        })
        revalidatePath("/dashboard")//to update without refresh
    } catch (error) {
        console.log(error);
    }
}

export async function editProjectById(
    id: string,
    data: { title: string; description: string }
) {
    try {
        await db.playground.update({
            where: {
                id
            },
            data:data
        })
        revalidatePath("/dashboard")
    } catch (error) {
        console.log(error)
    }
}

export async function duplicateProjectById(id: string) {
     try {
        const originalPlayground = await db.playground.findUnique({
            where:{id},
            //implement templates
        })
        if(!originalPlayground){
            throw new Error("Plyground does not exist");
        }

        const duplicatedPlayground = await db.playground.create({
            data:{
                title: `${originalPlayground.title} (copy)`,
                description: originalPlayground.description,
                template: originalPlayground.template,
                userId: originalPlayground.userId
            }
        })
        revalidatePath("/dashboard");
        return duplicatedPlayground;
     } catch (error) {
        console.log(error)
     }
}