import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
 
const client = new MongoClient(process.env.MONGODB_URI as string);
const db = client.db(); 

const auth = betterAuth({
    database: mongodbAdapter(db),
    secret: process.env.BETTER_AUTH_SECRET as string,
    emailAndPassword: {
        enabled: true,
        disableSignUp: false,
        // requireEmailVerification: true,
        minPasswordLength: 8,
        maxPasswordLength: 128,
        autoSignIn: true,
        // emailVerification: {
        //     sendVerificationEmail: async ({ user, url, token }: { user: any, url: any, token: any }) => {
        //         // Send verification email to user
        //     },
        //     sendOnSignUp: true,
        //     autoSignInAfterVerification: true,
        //     expiresIn: 3600 // 1 hour
        // },
        // sendResetPassword: async ({ user, url, token }) => {

        // },
        // resetPasswordTokenExpiresIn: 3600, // 1 hour
        // password: {
        //     hash: async (password) => {
        //         const hashedPassword = password
        //         return hashedPassword;
        //     },
        //     verify: async ({ hash, password }) => {
        //         const isValid = true
        //         return isValid;
        //     }
        // }
    },
    socialProviders: {
        github: {
            clientId: process.env.GITHUB_CLIENT_ID as string,
            clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
        },
        google: {
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
        }
    },
})

export default auth;