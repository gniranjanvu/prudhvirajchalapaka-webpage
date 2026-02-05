import { Metadata } from 'next';
import { Card, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Mail, Clock, Trash, Star, Search } from 'lucide-react';
import { Input } from '@/components/ui/Input';

export const metadata: Metadata = {
    title: 'Inbox | Admin',
};

// Mock messages
const messages = [
    { id: 1, name: 'John Doe', email: 'john@example.com', subject: 'Project Inquiry', preview: 'Hi Prudhvi, I saw your autonomous robot project and...', date: '2 min ago', read: false },
    { id: 2, name: 'Google Recruiter', email: 'recruiter@google.com', subject: 'Job Opportunity', preview: 'We are looking for ROS developers...', date: '1 day ago', read: true },
];

export default function MessagesPage() {
    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h1 className="text-2xl font-bold font-display">Inbox</h1>
                    <p className="text-gray-500 dark:text-gray-400">View and reply to messages</p>
                </div>
            </div>

            <Card className="min-h-[600px] flex flex-col">
                <div className="p-4 border-b border-gray-100 dark:border-zinc-800 flex gap-4">
                    <div className="relative flex-1 max-w-sm">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                        <Input placeholder="Search messages..." className="pl-9 h-9" />
                    </div>
                    <div className="flex gap-2 ml-auto">
                        <Button variant="ghost" size="sm">Unread</Button>
                        <Button variant="ghost" size="sm">Starred</Button>
                    </div>
                </div>

                <div className="divide-y divide-gray-100 dark:divide-zinc-800">
                    {messages.map((msg) => (
                        <div
                            key={msg.id}
                            className={`group flex items-center gap-4 p-4 hover:bg-gray-50 dark:hover:bg-zinc-900/50 cursor-pointer transition-colors ${!msg.read ? 'bg-purple-50/50 dark:bg-purple-900/5' : ''}`}
                        >
                            <div className="flex-shrink-0">
                                <input type="checkbox" className="rounded border-gray-300 text-purple-600 focus:ring-purple-500" />
                            </div>
                            <div className={`flex-1 min-w-0 ${!msg.read ? 'font-semibold' : ''}`}>
                                <div className="flex justify-between mb-1">
                                    <span className="truncate text-gray-900 dark:text-gray-100">{msg.name}</span>
                                    <span className="text-xs text-gray-500">{msg.date}</span>
                                </div>
                                <div className="text-sm text-gray-900 dark:text-gray-200 mb-0.5">{msg.subject}</div>
                                <div className="text-xs text-gray-500 truncate">{msg.preview}</div>
                            </div>

                            <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-gray-400 hover:text-yellow-400">
                                    <Star size={16} />
                                </Button>
                                <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-gray-400 hover:text-red-500">
                                    <Trash size={16} />
                                </Button>
                            </div>
                        </div>
                    ))}

                    {messages.length === 0 && (
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
