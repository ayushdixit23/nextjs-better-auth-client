import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { sendMail } from "./lib/send-mail";

const client = new MongoClient(process.env.MONGODB_URI as string);
const db = client.db();

const auth = betterAuth({
    database: mongodbAdapter(db),
    user: {
        additionalFields: {
            username: {
                type: "string",
                required: true,
                unique: true,
                minLength: 3,
                maxLength: 32
            },
        }
    },
    emailVerification: {
        autoSignInAfterVerification: true,
        enabled: true,
        sendVerificationEmail: async ({ user, url, token }: { user: any, url: any, token: any }) => {
            const callbackUrl = `${url}&callbackURL=/email-verification`
            await sendMail({
                sendTo: user.email,
                subject: "Verify your email",
                text: `Verify your email by clicking on the link: ${callbackUrl}`
            })
        },
    },
    secret: process.env.BETTER_AUTH_SECRET as string,
    emailAndPassword: {
        enabled: true,
        disableSignUp: false,
        requireEmailVerification: true,
        minPasswordLength: 8,
        maxPasswordLength: 128,
        autoSignIn: true,
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