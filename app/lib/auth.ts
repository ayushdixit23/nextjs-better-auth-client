import { betterAuth } from "better-auth";
 
const auth = betterAuth({
    emailAndPassword: {  
        enabled: true
    },
    socialProviders: { 
        github: { 
           clientId: process.env.GITHUB_CLIENT_ID as string, 
           clientSecret: process.env.GITHUB_CLIENT_SECRET as string, 
        }, 
        google:{
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
        }
    }, 
})

export default auth;