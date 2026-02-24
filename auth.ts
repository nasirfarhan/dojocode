import NextAuth from "next-auth"
import { PrismaAdapter } from "@auth/prisma-adapter"
import {db} from "./lib/db"
import authConfig from "./auth.config"
import { getUserById } from "./modules/auth/actions"

export const runtime = "nodejs"; 
export const { handlers, signIn, signOut, auth } = NextAuth({
  callbacks:{
     async signIn({user, account}){
      // Basic validation - PrismaAdapter handles user/account creation automatically
      if(!user?.email || !account) return false;
      return true;
     },
     async jwt({token, user}){
      if(!token.sub) return token;
      const existingUser = await getUserById(token.sub)
      if(!existingUser) return token;

      token.name = existingUser.name;
      token.email = existingUser.email;
      token.role = existingUser.role;

      return token;

     },
     async session({session, token}){
      if(token.sub && session.user){
        session.user.id = token.sub
      }
      if(token.role && session.user){
        session.user.role = token.role
      }
      return session;
     }
     
  },
  session: {
    strategy: "jwt",
  },
  secret: process.env.AUTH_SECRET,
  adapter: PrismaAdapter(db),
  ...authConfig
})
