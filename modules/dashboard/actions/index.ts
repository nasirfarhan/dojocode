"use server";

import { db } from "@/lib/db";
import { currentUser } from "@/modules/auth/actions";

export async function getAllPlaygroundForUser() {
    const user = await currentUser();

    try {
        const playground = await db.playground.findMany({
            where:{
                userId:user?.id
            },
            include:{
                user:true
            }
        })
        return playground;
    } catch (error) {
        console.error(error);
    }
}