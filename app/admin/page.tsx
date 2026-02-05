import { Metadata } from 'next';
import { redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import LoginForm from '@/components/forms/LoginForm';

export const metadata: Metadata = {
    title: 'Admin Login | Prudhvi Raj Portfolio',
    description: 'Secure admin access',
};

export default async function AdminLoginPage() {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (user) {
        redirect('/admin/dashboard');
    }

    return (
        <div className="min-h-screen grid lg:grid-cols-2">
            {/* Left Side - Visual */}
            <div className="hidden lg:flex flex-col justify-center items-center bg-gray-900 text-white p-12 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-900/50 to-blue-900/50 blur-3xl" />
                <div className="relative z-10 text-center">
                    <h1 className="text-5xl font-display font-bold mb-6">Welcome Back</h1>
                    <div className="w-24 h-1 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full mx-auto mb-8" />
                    <p className="text-xl text-gray-300 max-w-md mx-auto leading-relaxed">
                        Manage your portfolio, update projects, and track your professional journey from one central hub.
                    </p>
                </div>

                {/* Decorative Circles */}
                <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-purple-600/20 rounded-full blur-3xl animate-pulse" />
                <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-blue-600/20 rounded-full blur-3xl animate-pulse animation-delay-500" />
            </div>

            {/* Right Side - Form */}
            <div className="flex items-center justify-center p-8 bg-gray-50 dark:bg-black">
                <div className="w-full max-w-md space-y-8">
                    <div className="text-center lg:text-left">
                        <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
                            Sign in to Dashboard
                        </h2>
                        <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                            Enter your email to receive a secure OTP
                        </p>
                    </div>

                    <div className="bg-white dark:bg-zinc-900/50 backdrop-blur-sm p-8 rounded-2xl shadow-sm border border-gray-100 dark:border-zinc-800">
                        <LoginForm />
                    </div>

                    <p className="text-center text-xs text-gray-500 dark:text-gray-500">
                        Protected by Supabase Auth & Resend
                    </p>
                </div>
            </div>
        </div>
    );
}
