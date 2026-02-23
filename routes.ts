
export type AppRoute = `/${string}`

export const publicRoutes: AppRoute[] = []

export const protectedRoutes: AppRoute[] = [
  "/",
]

export const authRoutes: AppRoute[] = [
  "/auth/sign-in",
]

export const apiAuthPrefix: string = "/api/auth"

export const DEFAULT_LOGIN_REDIRECT: AppRoute = "/"

