'use client';

import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Badge } from '@/components/ui/Badge';
import { Quote, Send, Loader2, AlertCircle, Copy, CheckCircle2, XCircle, Trash2, Clock, Mail } from 'lucide-react';
import { useToast } from '@/components/ui/toast';

interface Recommendation {
    id: string;
    request_email: string;
    request_message: string | null;
    token: string;
    provider_name: string | null;
    provider_role: string | null;
    provider_company: string | null;
    content: string | null;
    status: 'pending' | 'submitted' | 'approved' | 'rejected';
    created_at: string;
}

export default function RecommendationsAdminPage() {
    const [recommendations, setRecommendations] = useState<Recommendation[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [actionId, setActionId] = useState<string | null>(null);
    const { toast } = useToast();

    // Form state
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');

    const fetchRecommendations = async () => {
        try {
            setIsLoading(true);
            const response = await fetch('/api/recommendations');
            const result = await response.json();

            if (!response.ok) throw new Error(result.error);
            setRecommendations(result.data || []);
            setError(null);
        } catch (err: any) {
            console.error('Fetch error:', err);
            setError(err.message || 'Failed to load recommendations');
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchRecommendations();
    }, []);

    const handleGenerateLink = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!email) return;

        setIsSubmitting(true);
        try {
            const response = await fetch('/api/recommendations', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ request_email: email, request_message: message })
            });

            const result = await response.json();
            if (!response.ok) throw new Error(result.error);

            toast({
                title: 'Link Generated!',
                description: 'The recommendation request link has been created.',
                type: 'success'
            });

            setEmail('');
            setMessage('');
            fetchRecommendations();

            // Auto copy link to clipboard for convenience
            if (result.data?.token) {
                const link = `${window.location.origin}/recommend/submit?token=${result.data.token}`;
                navigator.clipboard.writeText(link);
                toast({
                    title: 'Copied to Clipboard',
                    description: 'The secure submission link has been copied.',
                    type: 'success'
                });
            }
        } catch (err: any) {
            toast({
                title: 'Error',
                description: err.message,
                type: 'error'
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleStatusChange = async (id: string, newStatus: string) => {
        setActionId(id);
        try {
            const response = await fetch(`/api/recommendations/${id}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ status: newStatus })
            });

            if (!response.ok) throw new Error('Failed to update status');

            toast({
                title: 'Success',
                description: `Recommendation marked as ${newStatus}`,
                type: 'success'
            });
            fetchRecommendations();
        } catch (err: any) {
            toast({ title: 'Error', description: err.message, type: 'error' });
        } finally {
            setActionId(null);
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm('Are you sure you want to permanently delete this request?')) return;

        setActionId(id);
        try {
            const response = await fetch(`/api/recommendations/${id}`, { method: 'DELETE' });
            if (!response.ok) throw new Error('Failed to delete');

            toast({ title: 'Deleted', description: 'Request removed.', type: 'success' });
            fetchRecommendations();
        } catch (err: any) {
            toast({ title: 'Error', description: err.message, type: 'error' });
        } finally {
            setActionId(null);
        }
    };

    const copyLink = (token: string) => {
        const link = `${window.location.origin}/recommend/submit?token=${token}`;
        navigator.clipboard.writeText(link);
        toast({ title: 'Copied!', description: 'Link copied to clipboard', type: 'success' });
    };

    const sendEmail = (email: string, token: string, customMessage: string | null) => {
        const link = `${window.location.origin}/recommend/submit?token=${token}`;
        const subject = encodeURIComponent("Recommendation Request for Prudhviraj Chalapaka");
        const bodyContent = customMessage
            ? `${customMessage}\n\nHere is the secure link to submit your recommendation:\n${link}\n\nThank you!`
            : `Hi,\n\nI would greatly appreciate it if you could write a brief recommendation for my portfolio. You can use the secure link below to submit it:\n\n${link}\n\nThank you!`;

        const body = encodeURIComponent(bodyContent);
        window.open(`mailto:${email}?subject=${subject}&body=${body}`, '_blank');
    };

    const getStatusVariant = (status: string) => {
        switch (status) {
            case 'approved': return 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-400 border-emerald-200 dark:border-emerald-800';
            case 'pending': return 'bg-gray-100 text-gray-800 dark:bg-zinc-800 dark:text-gray-300 border-gray-200 dark:border-zinc-700';
            case 'rejected': return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400 border-red-200 dark:border-red-800';
            case 'submitted': return 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400 border-blue-200 dark:border-blue-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h1 className="text-2xl font-bold font-display">Recommendations</h1>
                    <p className="text-gray-500 dark:text-gray-400">Generate secure links to receive testimonials.</p>
                </div>
            </div>

            {/* Generate New Link Section */}
            <Card>
                <CardHeader>
                    <h2 className="text-lg font-semibold flex items-center gap-2">
                        <Send className="w-5 h-5 text-purple-600" />
                        Request a Recommendation
                    </h2>
                    <p className="text-sm text-gray-500">Create a unique, secure link to send to a colleague or client.</p>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleGenerateLink} className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <label className="text-sm font-medium">Reviewer's Email</label>
                                <Input
                                    type="email"
                                    placeholder="colleague@company.com"
                                    required
                                    value={email}
                                    onChange={e => setEmail(e.target.value)}
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium">Custom Message (Optional)</label>
                                <Input
                                    placeholder="Hi! Would you mind writing a quick recommendation?"
                                    value={message}
                                    onChange={e => setMessage(e.target.value)}
                                />
                            </div>
                        </div>
                        <Button type="submit" disabled={isSubmitting} className="w-full sm:w-auto">
                            {isSubmitting ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Copy className="w-4 h-4 mr-2" />}
                            Generate & Copy Link
                        </Button>
                    </form>
                </CardContent>
            </Card>

            {/* Recommendations List */}
            {isLoading ? (
                <div className="flex justify-center p-12">
                    <Loader2 className="w-8 h-8 animate-spin text-purple-600" />
                </div>
            ) : error ? (
                <Card className="border-red-200 bg-red-50 text-red-600 p-4 flex items-center gap-3">
                    <AlertCircle className="w-5 h-5" /> {error}
                </Card>
            ) : (
                <div className="space-y-4">
                    <h2 className="text-lg font-semibold">Manage Requests</h2>

                    {recommendations.length === 0 ? (
                        <Card className="bg-gray-50 dark:bg-zinc-800/50 border-dashed">
                            <CardContent className="flex flex-col items-center justify-center py-12 text-gray-500">
                                <Quote className="w-12 h-12 mb-4 opacity-20" />
                                <p>No recommendations yet. Generate a link to get started!</p>
                            </CardContent>
                        </Card>
                    ) : (
                        <div className="grid grid-cols-1 gap-4">
                            {recommendations.map(rec => (
                                <Card key={rec.id} className="overflow-hidden">
                                    <div className="p-5 flex flex-col md:flex-row md:items-start gap-4 justify-between border-b border-gray-100 dark:border-zinc-800">
                                        <div className="space-y-1">
                                            <div className="flex items-center gap-3">
                                                <h3 className="font-semibold text-gray-900 dark:text-white">
                                                    {rec.provider_name || rec.request_email}
                                                </h3>
                                                <Badge variant="outline" className={`px-2 py-0.5 capitalize ${getStatusVariant(rec.status)}`}>
                                                    {rec.status}
                                                </Badge>
                                            </div>
                                            {rec.provider_role && (
                                                <p className="text-sm text-gray-500">
                                                    {rec.provider_role} {rec.provider_company && `at ${rec.provider_company}`}
                                                </p>
                                            )}
                                        </div>

                                        <div className="flex flex-wrap gap-2">
                                            {rec.status === 'pending' && (
                                                <>
                                                    <Button size="sm" variant="outline" onClick={() => copyLink(rec.token)}>
                                                        <Copy className="w-4 h-4 mr-1.5" /> Copy Link
                                                    </Button>
                                                    <Button size="sm" variant="default" className="bg-indigo-600 hover:bg-indigo-700 text-white" onClick={() => sendEmail(rec.request_email, rec.token, rec.request_message)}>
                                                        <Mail className="w-4 h-4 mr-1.5" /> Send Email
                                                    </Button>
                                                </>
                                            )}
                                            {rec.status === 'submitted' && (
                                                <>
                                                    <Button size="sm" className="bg-emerald-600 hover:bg-emerald-700" onClick={() => handleStatusChange(rec.id, 'approved')} disabled={actionId === rec.id}>
                                                        <CheckCircle2 className="w-4 h-4 mr-1.5" /> Approve
                                                    </Button>
                                                    <Button size="sm" variant="default" className="bg-red-500 hover:bg-red-600 text-white" onClick={() => handleStatusChange(rec.id, 'rejected')} disabled={actionId === rec.id}>
                                                        <XCircle className="w-4 h-4 mr-1.5" /> Reject
                                                    </Button>
                                                </>
                                            )}
                                            {(rec.status === 'approved' || rec.status === 'rejected') && (
                                                <Button size="sm" variant="outline" onClick={() => handleStatusChange(rec.id, 'pending')} disabled={actionId === rec.id}>
                                                    <Clock className="w-4 h-4 mr-1.5" /> Reset to Pending
                                                </Button>
                                            )}
                                            <Button size="sm" variant="ghost" className="text-red-500 hover:text-red-600 hover:bg-red-50" onClick={() => handleDelete(rec.id)} disabled={actionId === rec.id}>
                                                <Trash2 className="w-4 h-4" />
                                            </Button>
                                        </div>
                                    </div>

                                    {rec.content && (
                                        <div className="p-5 bg-gray-50 dark:bg-zinc-900/50">
                                            <Quote className="w-6 h-6 text-gray-300 dark:text-gray-700 mb-2" />
                                            <p className="text-sm text-gray-700 dark:text-gray-300 italic whitespace-pre-wrap">
                                                "{rec.content}"
                                            </p>
                                        </div>
                                    )}
                                </Card>
                            ))}
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}
