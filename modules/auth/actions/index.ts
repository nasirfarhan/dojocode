"use server"

import { db } from "@/lib/db"
import { auth, signIn } from "@/auth"

export const handleGoogleSignIn = async () => {
  await signIn("google")
}

export const handleGithubSignIn = async () => {
  await signIn("github")
}

export const getUserById = async (id: string) => {
  try {
    const user = await db.user.findUnique({
      where: { id },
      include: {
        accounts: true
      }
    })
    return user
  } catch (error) {
    console.error("Error fetching user by id:", error)
    return null
  }
}

export const getAccountByUserId = async (userId: string) => {
  try {
    const account = await db.account.findFirst({
      where: { userId }
    })
    return account
  } catch (error) {
    console.error("Error fetching account by userId:", error)
    return null
  }
}

export const currentUser = async () => {
  try {
    const user = await auth()
    return user?.user
  } catch (error) {
    console.error("Error fetching current user:", error)
    return null
  }
}
