'use client';

import { useEffect, useState } from 'react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Mail, Trash, Star, Search, Loader2, AlertCircle } from 'lucide-react';
import { Input } from '@/components/ui/Input';
import { useToast } from '@/components/ui/toast';
import { format } from 'date-fns';

interface Message {
    id: string;
    name: string;
    email: string;
    subject?: string;
    message: string;
    is_read: boolean;
    is_archived: boolean;
    created_at: string;
}

export default function MessagesPage() {
    const [messages, setMessages] = useState<Message[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [deletingId, setDeletingId] = useState<string | null>(null);
    const { toast } = useToast();

    const fetchMessages = async () => {
        try {
            setIsLoading(true);
            const response = await fetch('/api/messages');
            const result = await response.json();

            if (!response.ok) {
                throw new Error(result.error || 'Failed to fetch messages');
            }

            setMessages(result.data || []);
            setError(null);
        } catch (err) {
            console.error('Error fetching messages:', err);
            setError(err instanceof Error ? err.message : 'Failed to load messages');
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchMessages();
    }, []);

    const handleMarkRead = async (id: string, isRead: boolean) => {
        try {
            const response = await fetch(`/api/messages/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ is_read: isRead })
            });

            if (response.ok) {
                setMessages(prev => prev.map(msg => msg.id === id ? { ...msg, is_read: isRead } : msg));
            }
        } catch (err) {
            console.error('Error updating message:', err);
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm('Are you sure you want to delete this message?')) {
            return;
        }

        setDeletingId(id);
        try {
            const response = await fetch(`/api/messages/${id}`, {
                method: 'DELETE'
            });

            const result = await response.json();

            if (!response.ok) {
                throw new Error(result.error || 'Failed to delete message');
            }

            toast({
                title: "Message Deleted",
                description: "The message has been removed successfully.",
                type: "success"
            });

            fetchMessages();
        } catch (err) {
            console.error('Error deleting message:', err);
            toast({
                title: "Error",
                description: err instanceof Error ? err.message : "Failed to delete message.",
                type: "error"
            });
        } finally {
            setDeletingId(null);
        }
    };

    const formatDate = (dateString: string) => {
        try {
            return format(new Date(dateString), 'MMM d, yyyy');
        } catch {
            return dateString;
        }
    };

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
                    <h1 className="text-2xl font-bold font-display">Inbox</h1>
                    <p className="text-gray-500 dark:text-gray-400">View and reply to messages</p>
                </div>
            </div>

            {error && (
                <Card className="border-red-200 dark:border-red-800 bg-red-50 dark:bg-red-900/20">
                    <div className="p-4 flex items-center gap-3 text-red-600 dark:text-red-400">
                        <AlertCircle size={20} />
                        <span>{error}</span>
                        <Button variant="outline" size="sm" onClick={fetchMessages}>
                            Retry
                        </Button>
                    </div>
                </Card>
            )}

            <Card className="min-h-[600px] flex flex-col">
                <div className="p-4 border-b border-gray-100 dark:border-zinc-800 flex gap-4">
                    <div className="relative flex-1 max-w-sm">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                        <Input placeholder="Search messages..." className="pl-9 h-9" />
                    </div>
                </div>

                <div className="divide-y divide-gray-100 dark:divide-zinc-800">
                    {messages.map((msg) => (
                        <div
                            key={msg.id}
                            className={`group flex items-center gap-4 p-4 hover:bg-gray-50 dark:hover:bg-zinc-900/50 cursor-pointer transition-colors ${!msg.is_read ? 'bg-purple-50/50 dark:bg-purple-900/5' : ''}`}
                            onClick={() => !msg.is_read && handleMarkRead(msg.id, true)}
                        >
                            <div className="flex-shrink-0">
                                <input
                                    type="checkbox"
                                    className="rounded border-gray-300 text-purple-600 focus:ring-purple-500"
                                    onClick={(e) => e.stopPropagation()}
                                />
                            </div>
                            <div className={`flex-1 min-w-0 ${!msg.is_read ? 'font-semibold' : ''}`}>
                                <div className="flex justify-between mb-1">
                                    <span className="truncate text-gray-900 dark:text-gray-100">{msg.name}</span>
                                    <span className="text-xs text-gray-500">{formatDate(msg.created_at)}</span>
                                </div>
                                <div className="text-sm text-gray-900 dark:text-gray-200 mb-0.5">
                                    {msg.email}
                                </div>
                                <div className="text-xs text-gray-500 truncate">{msg.message}</div>
                            </div>

                            <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    className="h-8 w-8 p-0 text-gray-400 hover:text-red-500"
                                    onClick={(e) => { e.stopPropagation(); handleDelete(msg.id); }}
                                    disabled={deletingId === msg.id}
                                >
                                    {deletingId === msg.id ? (
                                        <Loader2 size={16} className="animate-spin" />
                                    ) : (
                                        <Trash size={16} />
                                    )}
                                </Button>
                            </div>
                        </div>
                    ))}

                    {messages.length === 0 && !error && (
                        <div className="p-8 text-center text-gray-500">
                            <Mail className="w-12 h-12 mx-auto mb-3 opacity-20" />
                            <p>No messages yet.</p>
                        </div>
                    )}
                </div>
            </Card>
        </div>
    );
}
