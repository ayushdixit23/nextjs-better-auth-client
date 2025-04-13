"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { FaGithub, FaEnvelope, FaLock } from "react-icons/fa"
import { FcGoogle } from "react-icons/fc"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import Link from "next/link"

const loginSchema = z.object({
    email: z.string().email({ message: "Invalid email address" }),
    password: z.string().min(6, { message: "Password must be at least 6 characters" }),
})

type LoginFormValues = z.infer<typeof loginSchema>

export default function LoginPage() {
    const [isLoading, setIsLoading] = useState(false)

    const form = useForm<LoginFormValues>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    })

    const onSubmit = (data: LoginFormValues) => {
        setIsLoading(true)
        console.log("Login with:", data.email, data.password)
        setTimeout(() => setIsLoading(false), 1000)
    }

    const handleOAuthLogin = (provider: string) => {
        console.log(`Login with ${provider}`)
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
            {/* Blobs */}


            {/* Main Card */}
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, ease: "easeOut" }}
                className="w-full max-w-md"
            >
                <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
                    <div className="p-8 lg:p-10">
                        <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2, duration: 0.5 }}
                            className="text-center mb-10"
                        >
                            <h2 className="text-3xl font-bold text-gray-800 mb-2">Welcome Back</h2>
                            <p className="text-gray-500">Sign in to continue your journey</p>
                        </motion.div>

                        {/* Form */}
                        {/* <Form {...form}>
                            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                                <div className="flex flex-col gap-4">
                 
                                    <FormField
                                        control={form.control}
                                        name="email"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel className="sr-only">Email</FormLabel>
                                                <div className="relative">
                                                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                                        <FaEnvelope className="h-5 w-5 text-indigo-400" />
                                                    </div>
                                                    <FormControl>
                                                        <Input
                                                            type="email"
                                                            placeholder="Email address"
                                                            className="pl-10 pr-3 py-4 border border-gray-200 rounded-lg bg-gray-50 text-gray-800 placeholder-gray-400 focus:ring-2 focus:ring-indigo-500 focus:border-transparent shadow-sm"
                                                            {...field}
                                                        />
                                                    </FormControl>
                                                </div>
                                                <FormMessage className="text-red-500"/>
                                            </FormItem>
                                        )}
                                    />

                                    <FormField
                                        control={form.control}
                                        name="password"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel className="sr-only">Password</FormLabel>
                                                <div className="relative">
                                                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                                        <FaLock className="h-5 w-5 text-indigo-400" />
                                                    </div>
                                                    <FormControl>
                                                        <Input
                                                            type="password"
                                                            placeholder="Password"
                                                            className="pl-10 pr-3 py-4 border border-gray-200 rounded-lg bg-gray-50 text-gray-800 placeholder-gray-400 focus:ring-2 focus:ring-indigo-500 focus:border-transparent shadow-sm"
                                                            {...field}
                                                        />
                                                    </FormControl>
                                                </div>
                                                <FormMessage className="text-red-500"/>
                                            </FormItem>
                                        )}
                                    />
                                </div>

                                <div className="flex items-center justify-between">
                                    <div className="flex items-center">
                                        <input
                                            id="remember-me"
                                            type="checkbox"
                                            className="h-4 w-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                                        />
                                        <label htmlFor="remember-me" className="ml-2 text-sm text-gray-600">
                                            Remember me
                                        </label>
                                    </div>
                                    <div className="text-sm">
                                        <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500 hover:underline">
                                            Forgot password?
                                        </a>
                                    </div>
                                </div>

                                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                                    <Button
                                        type="submit"
                                        disabled={isLoading}
                                        className="w-full py-4 px-4 rounded-lg shadow-md bg-gradient-to-r from-indigo-600 to-blue-500 hover:from-indigo-700 hover:to-blue-600 text-white font-medium"
                                    >
                                        {isLoading ? (
                                            <svg className="animate-spin h-5 w-5 text-white" viewBox="0 0 24 24" fill="none">
                                                <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" className="opacity-25" />
                                                <path
                                                    fill="currentColor"
                                                    className="opacity-75"
                                                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                                                />
                                            </svg>
                                        ) : (
                                            "Sign in"
                                        )}
                                    </Button>
                                </motion.div>
                            </form>
                        </Form> */}

                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                                <div className="space-y-5">

                                    <FormField
                                        control={form.control}
                                        name="email"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel className="text-sm font-medium text-gray-700">Email address</FormLabel>
                                                <div className="relative">
                                                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                                        <FaEnvelope className="h-5 w-5 text-indigo-400" />
                                                    </div>
                                                    <FormControl>
                                                        <Input
                                                            type="email"
                                                            placeholder="you@example.com"
                                                            className="pl-10 pr-3 py-3 border border-gray-300 rounded-md bg-white text-gray-800 placeholder-gray-400 focus:ring-2 focus:ring-indigo-500 focus:outline-none w-full"
                                                            {...field}
                                                        />
                                                    </FormControl>
                                                </div>
                                                <FormMessage className="text-red-500" />
                                            </FormItem>
                                        )}
                                    />

                                    <FormField
                                        control={form.control}
                                        name="password"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel className="text-sm font-medium text-gray-700">Password</FormLabel>
                                                <div className="relative">
                                                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                                        <FaLock className="h-5 w-5 text-indigo-400" />
                                                    </div>
                                                    <FormControl>
                                                        <Input
                                                            type="password"
                                                            placeholder="••••••••"
                                                            className="pl-10 pr-3 py-3 border border-gray-300 rounded-md bg-white text-gray-800 placeholder-gray-400 focus:ring-2 focus:ring-indigo-500 focus:outline-none w-full"
                                                            {...field}
                                                        />
                                                    </FormControl>
                                                </div>
                                                <FormMessage className="text-red-500" />
                                            </FormItem>
                                        )}
                                    />
                                </div>

                                <div className="flex items-center justify-between border-t pt-4">
                                    <label className="flex items-center space-x-2 text-sm text-gray-600">
                                        <input
                                            type="checkbox"
                                            className="h-4 w-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                                        />
                                        <span>Remember me</span>
                                    </label>
                                    <a href="#" className="text-sm text-indigo-600 hover:underline">
                                        Forgot password?
                                    </a>
                                </div>

                                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                                    <Button
                                        type="submit"
                                        disabled={isLoading}
                                        className="w-full py-3 px-4 rounded-md shadow-md bg-indigo-600 hover:bg-indigo-700 text-white font-semibold transition"
                                    >
                                        {isLoading ? (
                                            <svg className="animate-spin h-5 w-5 text-white mx-auto" viewBox="0 0 24 24" fill="none">
                                                <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" className="opacity-25" />
                                                <path
                                                    fill="currentColor"
                                                    className="opacity-75"
                                                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                                                />
                                            </svg>
                                        ) : (
                                            "Sign in"
                                        )}
                                    </Button>
                                </motion.div>
                            </form>
                        </Form>

                        {/* OAuth divider */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.4, duration: 0.5 }}
                            className="mt-4"
                        >
                            <div className="relative">
                                <div className="absolute inset-0 flex items-center">
                                    <div className="w-full border-t border-gray-200" />
                                </div>
                                <div className="relative flex justify-center text-sm">
                                    <span className="px-2 bg-white text-gray-500">Or continue with</span>
                                </div>
                            </div>

                            <div className="mt-6 grid grid-cols-2 gap-4">
                                <Button
                                    type="button"
                                    variant="outline"
                                    onClick={() => handleOAuthLogin("google")}
                                    className="flex bg-blue-500 items-center justify-center gap-2"
                                >
                                    <FcGoogle />
                                    Google
                                </Button>
                                <Button
                                    type="button"
                                    variant="outline"
                                    onClick={() => handleOAuthLogin("github")}
                                    className="flex items-center justify-center gap-2"
                                >
                                    <FaGithub />
                                    GitHub
                                </Button>
                            </div>
                        </motion.div>

                        <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.5, duration: 0.5 }}
                            className="mt-8 text-center text-sm text-gray-600"
                        >
                            Don't have an account?{' '}
                            <Link href="/signup" className="font-medium text-indigo-600 hover:text-indigo-500">
                                Sign up
                            </Link>
                        </motion.p>
                    </div>
                </div>
            </motion.div>
        </div>
    )
}
