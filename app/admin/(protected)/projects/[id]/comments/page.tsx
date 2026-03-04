'use client';

import { useEffect, useState, use } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { Card, CardContent } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { ArrowLeft, Loader2, AlertCircle, MessageSquare, Check, X, Trash } from 'lucide-react';
import { useToast } from '@/components/ui/toast';
import { format } from 'date-fns';

interface Comment {
    id: string;
    project_id: string;
    parent_id?: string;
    author_name: string;
    author_email: string;
    content: string;
    status: string;
    is_admin_reply: boolean;
    created_at: string;
}

interface ProjectCommentsPageProps {
    params: Promise<{ id: string }>;
}

export default function ProjectCommentsPage({ params }: ProjectCommentsPageProps) {
    const resolvedParams = use(params);
    const [comments, setComments] = useState<Comment[]>([]);
    const [projectTitle, setProjectTitle] = useState<string>('');
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [actionLoading, setActionLoading] = useState<string | null>(null);
    const { toast } = useToast();

    const fetchComments = async () => {
        try {
            setIsLoading(true);
            // Fetch all comments (not just approved) for admin
            const response = await fetch(`/api/admin/projects/${resolvedParams.id}/comments`);
            const result = await response.json();

            if (!response.ok) {
                throw new Error(result.error || 'Failed to fetch comments');
            }

            setComments(result.data || []);
            setError(null);
        } catch (err) {
            console.error('Error fetching comments:', err);
            setError(err instanceof Error ? err.message : 'Failed to load comments');
        } finally {
            setIsLoading(false);
        }
    };

    const fetchProject = async () => {
        try {
            const response = await fetch(`/api/projects/${resolvedParams.id}`);
            const result = await response.json();
            if (result.success && result.data) {
                setProjectTitle(result.data.title);
            }
        } catch {
            // ignore
        }
    };

    useEffect(() => {
        fetchComments();
        fetchProject();
    }, [resolvedParams.id]);

    const handleUpdateStatus = async (commentId: string, newStatus: string) => {
        setActionLoading(commentId);
        try {
            const response = await fetch(`/api/admin/projects/${resolvedParams.id}/comments`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ comment_id: commentId, status: newStatus }),
            });

            const result = await response.json();
            if (!response.ok) {
                throw new Error(result.error || 'Failed to update comment');
            }

            toast({
                title: "Comment Updated",
                description: `Comment marked as ${newStatus}.`,
                type: "success"
            });

            fetchComments();
        } catch (err) {
            toast({
                title: "Error",
                description: err instanceof Error ? err.message : "Failed to update comment.",
                type: "error"
            });
        } finally {
            setActionLoading(null);
        }
    };

    const handleDelete = async (commentId: string) => {
        if (!confirm('Are you sure you want to permanently delete this comment?')) return;

        setActionLoading(commentId);
        try {
            const response = await fetch(`/api/admin/projects/${resolvedParams.id}/comments`, {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ comment_id: commentId }),
            });

            const result = await response.json();
            if (!response.ok) {
                throw new Error(result.error || 'Failed to delete comment');
            }

            toast({
                title: "Comment Deleted",
                description: "The comment has been permanently removed.",
                type: "success"
            });

            fetchComments();
        } catch (err) {
            toast({
                title: "Error",
                description: err instanceof Error ? err.message : "Failed to delete comment.",
                type: "error"
            });
        } finally {
            setActionLoading(null);
        }
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'approved': return 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400';
            case 'pending': return 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400';
            case 'spam': return 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400';
            case 'deleted': return 'bg-gray-100 text-gray-700 dark:bg-gray-900/30 dark:text-gray-400';
            default: return '';
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
        <div className="space-y-6 max-w-5xl mx-auto">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <Link href="/admin/projects" className="text-sm text-gray-500 hover:text-gray-900 dark:hover:text-gray-100 flex items-center gap-1 mb-2">
                        <ArrowLeft size={16} /> Back to Projects
                    </Link>
                    <h1 className="text-2xl font-bold font-display flex items-center gap-2">
                        <MessageSquare size={24} />
                        Comments
                    </h1>
                    {projectTitle && (
                        <p className="text-gray-500 dark:text-gray-400">Managing comments for: <strong>{projectTitle}</strong></p>
                    )}
                </div>
            </div>

            {error && (
                <Card className="border-red-200 dark:border-red-800 bg-red-50 dark:bg-red-900/20">
                    <CardContent className="p-4 flex items-center gap-3 text-red-600 dark:text-red-400">
                        <AlertCircle size={20} />
                        <span>{error}</span>
                        <Button variant="outline" size="sm" onClick={fetchComments}>
                            Retry
                        </Button>
                    </CardContent>
                </Card>
            )}

            {comments.length === 0 && !error ? (
                <Card>
                    <CardContent className="p-8 text-center">
                        <MessageSquare className="w-12 h-12 mx-auto text-gray-400 mb-4" />
                        <h3 className="text-lg font-semibold mb-2">No comments yet</h3>
                        <p className="text-gray-500 dark:text-gray-400">
                            Comments will appear here when visitors leave them on this project.
                        </p>
                    </CardContent>
                </Card>
            ) : (
                <div className="space-y-4">
                    {comments.map((comment) => (
                        <Card key={comment.id}>
                            <CardContent className="p-4">
                                <div className="flex items-start justify-between gap-4">
                                    <div className="flex-1">
                                        <div className="flex items-center gap-2 mb-2">
                                            <span className="font-semibold text-sm">{comment.author_name}</span>
                                            <span className="text-xs text-gray-400">{comment.author_email}</span>
                                            <Badge className={getStatusColor(comment.status)}>
                                                {comment.status}
                                            </Badge>
                                            {comment.is_admin_reply && (
                                                <Badge variant="secondary">Admin Reply</Badge>
                                            )}
                                        </div>
                                        <p className="text-sm text-gray-700 dark:text-gray-300 mb-2">{comment.content}</p>
                                        <span className="text-xs text-gray-400">
                                            {format(new Date(comment.created_at), 'MMM dd, yyyy HH:mm')}
                                        </span>
                                    </div>
                                    <div className="flex items-center gap-1 shrink-0">
                                        {comment.status !== 'approved' && (
                                            <Button
                                                variant="ghost"
                                                size="sm"
                                                className="h-8 w-8 p-0 text-green-600 hover:text-green-700 hover:bg-green-50 dark:hover:bg-green-900/20"
                                                onClick={() => handleUpdateStatus(comment.id, 'approved')}
                                                disabled={actionLoading === comment.id}
                                                title="Approve"
                                            >
                                                {actionLoading === comment.id ? <Loader2 size={14} className="animate-spin" /> : <Check size={16} />}
                                            </Button>
                                        )}
                                        {comment.status !== 'spam' && (
                                            <Button
                                                variant="ghost"
                                                size="sm"
                                                className="h-8 w-8 p-0 text-yellow-600 hover:text-yellow-700 hover:bg-yellow-50 dark:hover:bg-yellow-900/20"
                                                onClick={() => handleUpdateStatus(comment.id, 'spam')}
                                                disabled={actionLoading === comment.id}
                                                title="Mark as Spam"
                                            >
                                                <X size={16} />
                                            </Button>
                                        )}
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            className="h-8 w-8 p-0 text-red-500 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/20"
                                            onClick={() => handleDelete(comment.id)}
                                            disabled={actionLoading === comment.id}
                                            title="Delete"
                                        >
                                            <Trash size={16} />
                                        </Button>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            )}
        </div>
    );
}
