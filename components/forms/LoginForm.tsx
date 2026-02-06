"use client";

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useAuth } from '@/components/providers/AuthProvider';
import { useToast } from '@/components/ui/toast';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Mail, ArrowRight, Loader2, KeyRound } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

type LoginStep = 'email' | 'otp';

interface FormData {
    email: string;
    otp: string;
}

export default function LoginForm() {
    const [step, setStep] = useState<LoginStep>('email');
    const [isLoading, setIsLoading] = useState(false);
    const { signInWithOTP, verifyOTP } = useAuth();
    const { toast } = useToast();

    const { register, handleSubmit, getValues, formState: { errors } } = useForm<FormData>();
    const email = getValues('email');

    const onSubmit = async (data: FormData) => {
        setIsLoading(true);
        try {
            if (step === 'email') {
                const { error } = await signInWithOTP(data.email);
                if (error) {
                    // Check if it's an unauthorized email error
                    if (error.message.includes('Unauthorized') || error.message.includes('Access Denied')) {
                        toast({
                            title: "🚫 Access Denied",
                            description: "This email is not authorized to access the admin dashboard. An alert has been sent to the administrator.",
                            type: "error",
                            duration: 8000
                        });
                    } else {
                        throw error;
                    }
                    return;
                }

                toast({
                    title: "OTP Sent!",
                    description: "Check your email for the login code.",
                    type: "success"
                });
                setStep('otp');
            } else {
                const { error } = await verifyOTP(data.email, data.otp);
                if (error) throw error;

                toast({
                    title: "Success! 🔓",
                    description: "Welcome back to your dashboard.",
                    type: "success"
                });
            }
        } catch (error: any) {
            toast({
                title: "Authentication Failed",
                description: error.message || "Something went wrong. Please try again.",
                type: "error"
            });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <AnimatePresence mode="wait">
                {step === 'email' ? (
                    <motion.div
                        key="email-step"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 20 }}
                        className="space-y-4"
                    >
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                Email Address
                            </label>
                            <div className="relative">
                                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                                <Input
                                    {...register('email', {
                                        required: 'Email is required',
                                        pattern: {
                                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                            message: "Invalid email address"
                                        }
                                    })}
                                    type="email"
                                    placeholder="admin@example.com"
                                    className="pl-10 h-10 w-full"
                                    disabled={isLoading}
                                />
                            </div>
                            {errors.email && (
                                <p className="mt-1 text-sm text-red-500 font-medium animate-pulse">{errors.email.message}</p>
                            )}
                        </div>

                        <Button
                            type="submit"
                            className="w-full h-11"
                            disabled={isLoading}
                            variant="accent"
                        >
                            {isLoading ? (
                                <Loader2 className="w-5 h-5 animate-spin mr-2" />
                            ) : (
                                <span className="flex items-center">
                                    Send Login Code <ArrowRight className="ml-2 w-4 h-4" />
                                </span>
                            )}
                        </Button>
                    </motion.div>
                ) : (
                    <motion.div
                        key="otp-step"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        className="space-y-4"
                    >
                        <div className="flex items-center justify-between mb-2">
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                Enter OTP Code
                            </label>
                            <button
                                type="button"
                                onClick={() => setStep('email')}
                                className="text-xs text-purple-600 hover:text-purple-700 font-medium"
                            >
                                Change Email
                            </button>
                        </div>

                        <div className="bg-purple-50 dark:bg-purple-900/20 p-3 rounded-lg flex items-center gap-3 mb-4">
                            <Mail className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                            <span className="text-sm text-gray-700 dark:text-gray-300 font-medium">{email}</span>
                        </div>

                        <div className="relative">
                            <KeyRound className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                            <Input
                                {...register('otp', {
                                    required: 'OTP is required',
                                    minLength: { value: 6, message: 'Code must be 6 digits' }
                                })}
                                type="text"
                                placeholder="123456"
                                className="pl-10 h-10 w-full font-mono tracking-widest text-lg"
                                disabled={isLoading}
                                autoFocus
                            />
                        </div>
                        {errors.otp && (
                            <p className="mt-1 text-sm text-red-500 font-medium animate-pulse">{errors.otp.message}</p>
                        )}

                        <Button
                            type="submit"
                            className="w-full h-11"
                            disabled={isLoading}
                            variant="accent"
                        >
                            {isLoading ? (
                                <>
                                    <Loader2 className="w-5 h-5 animate-spin mr-2" />
                                    Verifying...
                                </>
                            ) : (
                                "Verify & Login"
                            )}
                        </Button>

                        <p className="text-center text-xs text-gray-500 mt-4">
                            Didn't receive code? Check spam or <button type="button" onClick={() => { setStep('email'); }} className="text-purple-600 hover:underline">try again</button>
                        </p>
                    </motion.div>
                )}
            </AnimatePresence>
        </form>
    );
}
