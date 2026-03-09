'use client';

import { useEffect, useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Textarea } from '@/components/ui/Textarea';
import { Loader2, Award, Quote, CheckCircle2 } from 'lucide-react';
import { motion } from 'framer-motion';

function SubmitForm() {
    const searchParams = useSearchParams();
    const token = searchParams.get('token');

    const [isLoading, setIsLoading] = useState(true);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [requestData, setRequestData] = useState<{ id: string, request_message: string | null } | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState(false);

    // Form fields
    const [name, setName] = useState('');
    const [role, setRole] = useState('');
    const [company, setCompany] = useState('');
    const [content, setContent] = useState('');

    useEffect(() => {
        if (!token) {
            setError('Invalid or missing recommendation link.');
            setIsLoading(false);
            return;
        }

        const verifyToken = async () => {
            try {
                const response = await fetch(`/api/recommendations/by-token/${token}`);
                const result = await response.json();

                if (!response.ok) throw new Error(result.error);
                setRequestData(result.data);
            } catch (err: any) {
                setError(err.message || 'Invalid or expired recommendation link.');
            } finally {
                setIsLoading(false);
            }
        };

        verifyToken();
    }, [token]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!requestData || !content || !name) return;

        setIsSubmitting(true);
        setError(null);

        try {
            const response = await fetch(`/api/recommendations/${requestData.id}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    token,
                    provider_name: name,
                    provider_role: role,
                    provider_company: company,
                    content
                })
            });

            const result = await response.json();
            if (!response.ok) throw new Error(result.error);

            setSuccess(true);
        } catch (err: any) {
            setError(err.message || 'Failed to submit recommendation. Please try again.');
            setIsSubmitting(false);
        }
    };

    if (isLoading) {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen">
                <Loader2 className="w-10 h-10 animate-spin text-purple-600 mb-4" />
                <p className="text-gray-500 font-medium">Verifying secure link</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen px-4 text-center">
                <div className="w-20 h-20 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center mb-6">
                    <Award className="w-10 h-10 text-red-500" />
                </div>
                <h1 className="text-2xl font-bold mb-2">Link Expired or Invalid</h1>
                <p className="text-gray-500 dark:text-gray-400 max-w-md">
                    {error}
                </p>
                <Button className="mt-8" onClick={() => window.location.href = '/'}>Return Home</Button>
            </div>
        );
    }

    if (success) {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen px-4 text-center">
                <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="w-24 h-24 rounded-full bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center mb-6"
                >
                    <CheckCircle2 className="w-12 h-12 text-emerald-500" />
                </motion.div>
                <motion.h1
                    initial={{ y: 10, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.1 }}
                    className="text-3xl font-bold mb-3 font-display text-gray-900 dark:text-white"
                >
                    Thank You!
                </motion.h1>
                <motion.p
                    initial={{ y: 10, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="text-gray-600 dark:text-gray-400 max-w-md"
                >
                    Your recommendation has been submitted successfully. I truly appreciate your time and support!
                </motion.p>
                <motion.div
                    initial={{ y: 10, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.3 }}
                >
                    <Button className="mt-8" onClick={() => window.location.href = '/'}>Return to Portfolio</Button>
                </motion.div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-[#0a0a0a] flex items-center justify-center p-4 py-20 relative overflow-hidden">
            {/* Background Decorations */}
            <div className="absolute top-[-100px] right-[-100px] w-96 h-96 bg-purple-500/10 dark:bg-purple-600/10 blur-[100px] rounded-full" />
            <div className="absolute bottom-[-100px] left-[-100px] w-96 h-96 bg-blue-500/10 dark:bg-blue-600/10 blur-[100px] rounded-full" />

            <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                className="w-full max-w-2xl bg-white/80 dark:bg-zinc-900/80 backdrop-blur-xl rounded-[2rem] border border-gray-200/50 dark:border-white/10 shadow-2xl overflow-hidden relative z-10"
            >
                <div className="p-8 sm:p-12">
                    <div className="flex justify-center mb-8">
                        <div className="p-4 bg-purple-100 dark:bg-purple-900/30 rounded-2xl">
                            <Quote className="w-8 h-8 text-purple-600 dark:text-purple-400" />
                        </div>
                    </div>

                    <h1 className="text-2xl sm:text-3xl font-bold font-display text-center mb-4 text-gray-900 dark:text-white">
                        Write a Recommendation
                    </h1>

                    {requestData?.request_message && (
                        <div className="mb-8 p-4 rounded-2xl bg-gray-100/80 dark:bg-zinc-800/80 border border-gray-200 dark:border-zinc-700">
                            <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2 uppercase tracking-widest font-mono">Message from Prudhviraj:</p>
                            <p className="text-gray-800 dark:text-gray-200 italic">"{requestData.request_message}"</p>
                        </div>
                    )}

                    <div className="mb-8 p-4 rounded-xl bg-amber-50 dark:bg-amber-900/20 text-amber-800 dark:text-amber-400 border border-amber-200 dark:border-amber-800/30 flex items-start gap-3 text-sm">
                        <Award className="w-5 h-5 mt-0.5 shrink-0" />
                        <p><strong>Note:</strong> Please ensure you use the same Google account or email address where you received this request if applicable. Your submission will be reviewed before appearing publicly.</p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-1.5 ml-1">Your Name *</label>
                                <Input
                                    required
                                    className="bg-white dark:bg-black/50 border-gray-200 dark:border-white/10 rounded-xl"
                                    placeholder="Jane Doe"
                                    value={name}
                                    onChange={e => setName(e.target.value)}
                                />
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-1.5 ml-1">Your Role</label>
                                    <Input
                                        className="bg-white dark:bg-black/50 border-gray-200 dark:border-white/10 rounded-xl"
                                        placeholder="Senior Engineer"
                                        value={role}
                                        onChange={e => setRole(e.target.value)}
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-1.5 ml-1">Company / Organization</label>
                                    <Input
                                        className="bg-white dark:bg-black/50 border-gray-200 dark:border-white/10 rounded-xl"
                                        placeholder="Tech Corp"
                                        value={company}
                                        onChange={e => setCompany(e.target.value)}
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-1.5 ml-1">Your Recommendation *</label>
                                <Textarea
                                    required
                                    className="min-h-[160px] resize-y bg-white dark:bg-black/50 border-gray-200 dark:border-white/10 rounded-xl text-base p-4"
                                    placeholder="Write your recommendation here..."
                                    value={content}
                                    onChange={e => setContent(e.target.value)}
                                />
                            </div>
                        </div>

                        <Button
                            type="submit"
                            disabled={isSubmitting || !name || !content}
                            className="w-full rounded-xl py-6 text-base font-bold text-white bg-purple-600 hover:bg-purple-700 dark:bg-purple-600 dark:hover:bg-purple-500 shadow-lg shadow-purple-500/25 transition-all"
                        >
                            {isSubmitting ? (
                                <><Loader2 className="w-5 h-5 mr-2 animate-spin" /> Submitting...</>
                            ) : (
                                "Submit Recommendation"
                            )}
                        </Button>
                    </form>
                </div>
            </motion.div>
        </div>
    );
}

export default function SubmitRecommendationPage() {
    return (
        <Suspense fallback={
            <div className="flex min-h-screen items-center justify-center">
                <Loader2 className="w-10 h-10 animate-spin text-purple-600" />
            </div>
        }>
            <SubmitForm />
        </Suspense>
    );
}
