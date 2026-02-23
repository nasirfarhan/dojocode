
import NextAuth from "next-auth";
import { DEFAULT_LOGIN_REDIRECT , apiAuthPrefix , publicRoutes,authRoutes, AppRoute } from "@/routes";

import authConfig from "./auth.config";

const {auth} = NextAuth(authConfig)

export default auth((req)=>{
    const {nextUrl} = req;
    const isLoggedIn = !!req.auth

    const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix)
    const isPublicRoute = publicRoutes.includes(nextUrl.pathname as AppRoute)
    const isAuthRoute = authRoutes.includes(nextUrl.pathname as AppRoute)

    if(isApiAuthRoute){
        return null
    }

    if(isAuthRoute){
        if(isLoggedIn){
            return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT,nextUrl))
        }
        return null
    }

    if(!isLoggedIn&&!isPublicRoute){
        return Response.redirect(new URL("/auth/sign-in", nextUrl))
    }

    return null
});

export const config = {
    matcher: [
        '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
        '/(api|trpc)(.*)',
    ],
};






