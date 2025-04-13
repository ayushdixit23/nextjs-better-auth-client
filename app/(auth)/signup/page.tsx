// SignupPage.jsx
"use client"
import { useState } from 'react';
import { motion } from 'framer-motion';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { FaUser, FaEnvelope, FaLock, FaUserCircle, FaGithub } from 'react-icons/fa';

// Import shadcn components
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from 'next/link';
import { FcGoogle } from 'react-icons/fc';

// Zod schema for form validation
const signupSchema = z.object({
    name: z.string().min(2, { message: "Name must be at least 2 characters" }),
    username: z
        .string()
        .min(3, { message: "Username must be at least 3 characters" })
        .max(20, { message: "Username cannot exceed 20 characters" })
        .regex(/^[a-zA-Z0-9_]+$/, { message: "Username can only contain letters, numbers and underscores" }),
    email: z.string().email({ message: "Please enter a valid email address" }),
    password: z
        .string()
        .min(8, { message: "Password must be at least 8 characters" })
        .regex(/[A-Z]/, { message: "Password must contain at least one uppercase letter" })
        .regex(/[a-z]/, { message: "Password must contain at least one lowercase letter" })
        .regex(/[0-9]/, { message: "Password must contain at least one number" }),
    image: z.any().optional(),
});

const SignupPage = () => {
    const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    // Initialize React Hook Form
    const form = useForm({
        resolver: zodResolver(signupSchema),
        defaultValues: {
            name: "",
            username: "",
            email: "",
            password: "",
            image: null,
        },
    });

    // Handle form submission
    const onSubmit = async (data: z.infer<typeof signupSchema>) => {
        setIsLoading(true);
        console.log('Signup data:', data);

        // Simulate API call
        setTimeout(() => {
            setIsLoading(false);
        }, 1500);
    };

    // Handle image upload and preview
    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files && e.target.files[0];
        if (file) {
            form.setValue("image", file);
            const reader = new FileReader();
            reader.onload = (e) => {
                const result = e.target?.result as string;
                if (result) {
                    setAvatarPreview(result);
                }
            };
            reader.readAsDataURL(file);
        }
    };

    // Handle OAuth signup
    const handleOAuthSignup = (provider: string) => {
        console.log(`Signup with ${provider}`);
        // Add your OAuth logic here
    };

    // Animation variants
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
                delayChildren: 0.2
            }
        }
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: { type: "spring", stiffness: 300, damping: 24 }
        }
    };

    const buttonVariants = {
        hover: { scale: 1.02, boxShadow: "0 10px 15px -3px rgba(79, 70, 229, 0.1), 0 4px 6px -4px rgba(79, 70, 229, 0.1)" },
        tap: { scale: 0.98 },
        disabled: { opacity: 0.7 }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
            {/* Animated background blobs */}
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
                            className="text-center mb-8"
                        >
                            <h2 className="text-3xl font-bold text-gray-800 mb-2">Create Account</h2>
                        </motion.div>

                        <Form {...form}>
                            <motion.form
                                variants={containerVariants}
                                initial="hidden"
                                animate="visible"
                                onSubmit={form.handleSubmit(onSubmit)}
                                className="space-y-6"
                            >
                                {/* Profile Image */}
                                <motion.div
                                    variants={itemVariants}
                                    className="flex flex-col items-center space-y-2 mb-6"
                                >
                                    <Avatar className="w-24 h-24 border-2 border-indigo-100">
                                        <AvatarImage src={avatarPreview || ""} className='object-cover rounded-full' />
                                        <AvatarFallback className="bg-indigo-100 text-indigo-700">
                                            <FaUserCircle className="w-12 h-12" />
                                        </AvatarFallback>
                                    </Avatar>

                                    <Label htmlFor="image" className="cursor-pointer inline-flex items-center mt-2 text-sm font-medium text-indigo-600 hover:text-indigo-500">
                                        Upload profile picture
                                    </Label>
                                    <Input
                                        id="image"
                                        type="file"
                                        accept="image/*"
                                        className="hidden"
                                        onChange={handleImageChange}
                                    />
                                </motion.div>

                                {/* Name */}
                                <motion.div variants={itemVariants}>
                                    <FormField
                                        control={form.control}
                                        name="name"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormControl>
                                                    <div className="relative">
                                                        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                                            <FaUser className="h-5 w-5 text-indigo-400" />
                                                        </div>
                                                        <Input
                                                            placeholder="Full Name"
                                                            {...field}
                                                            className="block w-full pl-10 pr-3 py-3 border border-gray-200 rounded-lg bg-gray-50 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent shadow-sm"
                                                        />
                                                    </div>
                                                </FormControl>
                                                <FormMessage className="text-xs mt-1 ml-1 text-red-500" />
                                            </FormItem>
                                        )}
                                    />
                                </motion.div>

                                {/* Username */}
                                <motion.div variants={itemVariants}>
                                    <FormField
                                        control={form.control}
                                        name="username"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormControl>
                                                    <div className="relative">
                                                        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                                            <span className="text-indigo-400 font-medium">@</span>
                                                        </div>
                                                        <Input
                                                            placeholder="Username"
                                                            {...field}
                                                            className="block w-full pl-10 pr-3 py-3 border border-gray-200 rounded-lg bg-gray-50 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent shadow-sm"
                                                        />
                                                    </div>
                                                </FormControl>
                                                <FormMessage className="text-xs mt-1 ml-1 text-red-500" />
                                            </FormItem>
                                        )}
                                    />
                                </motion.div>

                                {/* Email */}
                                <motion.div variants={itemVariants}>
                                    <FormField
                                        control={form.control}
                                        name="email"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormControl>
                                                    <div className="relative">
                                                        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                                            <FaEnvelope className="h-5 w-5 text-indigo-400" />
                                                        </div>
                                                        <Input
                                                            type="email"
                                                            placeholder="Email address"
                                                            {...field}
                                                            className="block w-full pl-10 pr-3 py-3 border border-gray-200 rounded-lg bg-gray-50 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent shadow-sm"
                                                        />
                                                    </div>
                                                </FormControl>
                                                <FormMessage className="text-xs mt-1 ml-1 text-red-500" />
                                            </FormItem>
                                        )}
                                    />
                                </motion.div>

                                {/* Password */}
                                <motion.div variants={itemVariants}>
                                    <FormField
                                        control={form.control}
                                        name="password"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormControl>
                                                    <div className="relative">
                                                        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                                            <FaLock className="h-5 w-5 text-indigo-400" />
                                                        </div>
                                                        <Input
                                                            type="password"
                                                            placeholder="Password"
                                                            {...field}
                                                            className="block w-full pl-10 pr-3 py-3 border border-gray-200 rounded-lg bg-gray-50 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent shadow-sm"
                                                        />
                                                    </div>
                                                </FormControl>
                                                <FormDescription className="text-xs text-gray-500 mt-1 ml-1">
                                                    At least 8 characters, with uppercase, lowercase & numbers
                                                </FormDescription>
                                                <FormMessage className="text-xs mt-1 ml-1 text-red-500" />
                                            </FormItem>
                                        )}
                                    />
                                </motion.div>

                                {/* Submit Button */}
                                <motion.div variants={itemVariants}>
                                    <Button
                                        type="submit"
                                        disabled={isLoading}
                                        className="w-full py-3 px-4 border border-transparent rounded-lg shadow-md text-white bg-gradient-to-r from-indigo-600 to-blue-500 hover:from-indigo-700 hover:to-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 font-medium transition duration-200"
                                    >
                                        {isLoading ? (
                                            <>
                                                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                                </svg>
                                                Creating account...
                                            </>
                                        ) : "Create Account"}
                                    </Button>
                                </motion.div>
                            </motion.form>
                        </Form>

                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.6, duration: 0.5 }}
                            className="mt-8"
                        >
                     
                            <div className="relative">
                                <div className="absolute inset-0 flex items-center">
                                    <div className="w-full border-t border-gray-200" />
                                </div>
                                <div className="relative flex justify-center text-sm">
                                    <span className="px-2 bg-white text-gray-500">Or sign up with</span>
                                </div>
                            </div>

                            <div className="mt-6 grid grid-cols-2 gap-4">
                                <Button
                                    type="button"
                                    variant="outline"
                               
                                    className="flex bg-blue-500 items-center justify-center gap-2"
                                >
                                    <FcGoogle />
                                    Google
                                </Button>
                                <Button
                                    type="button"
                                    variant="outline"
                                  
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
                            transition={{ delay: 0.7, duration: 0.5 }}
                            className="mt-8 text-center text-sm text-gray-500"
                        >
                            Already have an account?{' '}
                            <Link href="/login" className="font-medium text-indigo-600 hover:text-indigo-500 hover:underline">
                                Sign in
                            </Link>
                        </motion.p>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

export default SignupPage;