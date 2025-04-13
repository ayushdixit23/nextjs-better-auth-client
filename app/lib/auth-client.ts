import { createAuthClient } from "better-auth/react"
import { twoFactorClient } from "better-auth/client/plugins"

export const { signIn, signUp, useSession, signOut, getSession } = createAuthClient({
    baseURL: "http://localhost:3000",
    plugins: [twoFactorClient()]
})
