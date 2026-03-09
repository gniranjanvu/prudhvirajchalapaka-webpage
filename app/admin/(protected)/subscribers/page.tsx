'use client';

import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Badge } from '@/components/ui/Badge';
import { Users, Trash, Search, Loader2, AlertCircle, Mail, UserPlus, Download } from 'lucide-react';
import { useToast } from '@/components/ui/toast';

interface Subscriber {
    id: string;
    email: string;
    name: string | null;
}

export default function SubscribersPage() {
    const [subscribers, setSubscribers] = useState<Subscriber[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [deletingId, setDeletingId] = useState<string | null>(null);
    const [searchQuery, setSearchQuery] = useState('');
    const { toast } = useToast();

    const fetchSubscribers = async () => {
        try {
            setIsLoading(true);
            const response = await fetch('/api/subscribers');
            const result = await response.json();

            if (!response.ok) {
                throw new Error(result.error || 'Failed to fetch subscribers');
            }

            setSubscribers(result.data || []);
            setError(null);
        } catch (err) {
            console.error('Error fetching subscribers:', err);
            setError(err instanceof Error ? err.message : 'Failed to load subscribers');
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchSubscribers();
    }, []);

    const handleDelete = async (id: string) => {
        if (!confirm('Are you sure you want to remove this subscriber?')) return;

        setDeletingId(id);
        try {
            const response = await fetch(`/api/subscribers/${id}`, {
                method: 'DELETE'
            });

            const result = await response.json();

            if (!response.ok) {
                throw new Error(result.error || 'Failed to delete subscriber');
            }

            toast({
                title: "Subscriber Removed",
                description: "The subscriber has been removed successfully.",
                type: "success"
            });

            fetchSubscribers();
        } catch (err) {
            console.error('Error deleting subscriber:', err);
            toast({
                title: "Error",
                description: err instanceof Error ? err.message : "Failed to remove subscriber.",
                type: "error"
            });
        } finally {
            setDeletingId(null);
        }
    };

    const handleExportCSV = () => {
        const csv = [
            ['Name', 'Email'],
            ...subscribers.map(s => [
                s.name || '',
                s.email
            ])
        ].map(row => row.join(',')).join('\n');

        const blob = new Blob([csv], { type: 'text/csv' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `subscribers_${new Date().toISOString().split('T')[0]}.csv`;
        a.click();
        URL.revokeObjectURL(url);
    };


    const filteredSubscribers = subscribers.filter(s =>
        s.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (s.name && s.name.toLowerCase().includes(searchQuery.toLowerCase()))
    );

    if (isLoading) {
        return (
            <div className="flex items-center justify-center min-h-[400px]">
                <Loader2 className="w-8 h-8 animate-spin text-purple-600" />
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h1 className="text-2xl font-bold font-display">Subscribers</h1>
                    <p className="text-gray-500 dark:text-gray-400">
                        Manage your newsletter subscribers
                    </p>
                </div>
                <div className="flex items-center gap-3">
                    <Badge variant="default" className="bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400 px-3 py-1.5">
                        <Users className="w-4 h-4 mr-1.5" />
                        {subscribers.length} subscribers
                    </Badge>
                    {subscribers.length > 0 && (
                        <Button variant="outline" size="sm" onClick={handleExportCSV} className="gap-1.5">
                            <Download className="w-4 h-4" />
                            Export CSV
                        </Button>
                    )}
                </div>
            </div>

            {error && (
                <Card className="border-red-200 dark:border-red-800 bg-red-50 dark:bg-red-900/20">
                    <div className="p-4 flex items-center gap-3 text-red-600 dark:text-red-400">
                        <AlertCircle size={20} />
                        <span>{error}</span>
                        <Button variant="outline" size="sm" onClick={fetchSubscribers}>
                            Retry
                        </Button>
                    </div>
                </Card>
            )}

            <Card>
                <CardHeader>
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                        <h2 className="text-lg font-semibold">All Subscribers</h2>
                        <div className="relative w-full sm:w-72">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                            <Input
                                placeholder="Search by name or email..."
                                className="pl-9 h-9"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                        </div>
                    </div>
                </CardHeader>
                <CardContent>
                    {filteredSubscribers.length === 0 ? (
                        <div className="text-center py-12 text-gray-500">
                            <UserPlus className="w-12 h-12 mx-auto mb-4 opacity-30" />
                            <p className="font-medium">
                                {searchQuery ? 'No subscribers match your search' : 'No subscribers yet'}
                            </p>
                            <p className="text-sm mt-1">
                                {searchQuery
                                    ? 'Try a different search term'
                                    : 'Subscribers will appear here when visitors sign up'
                                }
                            </p>
                        </div>
                    ) : (
                        <div className="divide-y divide-gray-100 dark:divide-zinc-800">
                            {filteredSubscribers.map((subscriber) => (
                                <div
                                    key={subscriber.id}
                                    className="flex items-center justify-between py-4 group"
                                >
                                    <div className="flex items-center gap-3 min-w-0">
                                        <div className="w-10 h-10 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center shrink-0">
                                            <Mail className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                                        </div>
                                        <div className="min-w-0">
                                            <div className="flex items-center gap-2">
                                                <span className="font-medium truncate">
                                                    {subscriber.name || subscriber.email.split('@')[0]}
                                                </span>
                                            </div>
                                            <div className="flex items-center gap-3 text-sm text-gray-500 dark:text-gray-400">
                                                <span className="truncate">{subscriber.email}</span>
                                            </div>
                                        </div>
                                    </div>

                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        className="text-gray-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 opacity-0 group-hover:opacity-100 transition-opacity shrink-0"
                                        onClick={() => handleDelete(subscriber.id)}
                                        disabled={deletingId === subscriber.id}
                                    >
                                        {deletingId === subscriber.id ? (
                                            <Loader2 size={16} className="animate-spin" />
                                        ) : (
                                            <Trash size={16} />
                                        )}
                                    </Button>
                                </div>
                            ))}
                        </div>
                    )}
                </CardContent>
            </Card>
        </div>
    );
}
