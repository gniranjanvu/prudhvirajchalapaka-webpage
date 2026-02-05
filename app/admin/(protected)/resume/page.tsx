"use client";

import { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/Button';
import { Card, CardContent, CardHeader } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Input } from '@/components/ui/Input';
import { Upload, FileText, Trash, Download, Check, Star, Loader2 } from 'lucide-react';
import { createClient } from '@/lib/supabase/client';

interface Resume {
    id: string;
    file_url: string;
    file_name: string;
    file_size: number;
    version: string;
    is_current: boolean;
    uploaded_at: string;
}

export default function ResumeManagerPage() {
    const [resumes, setResumes] = useState<Resume[]>([]);
    const [loading, setLoading] = useState(true);
    const [uploading, setUploading] = useState(false);
    const [version, setVersion] = useState('');
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const supabase = createClient();

    useEffect(() => {
        fetchResumes();
    }, []);

    async function fetchResumes() {
        setLoading(true);
        try {
            const { data, error } = await supabase
                .from('resumes')
                .select('*')
                .order('uploaded_at', { ascending: false });

            if (error) throw error;
            setResumes(data || []);
        } catch (err) {
            console.error('Error fetching resumes:', err);
            setError('Failed to load resumes');
        } finally {
            setLoading(false);
        }
    }

    async function handleUpload(e: React.ChangeEvent<HTMLInputElement>) {
        const file = e.target.files?.[0];
        if (!file) return;

        if (!version.trim()) {
            setError('Please enter a version number');
            return;
        }

        // Validate file type
        if (file.type !== 'application/pdf') {
            setError('Please upload a PDF file');
            return;
        }

        // Validate file size (max 10MB)
        if (file.size > 10 * 1024 * 1024) {
            setError('File size must be less than 10MB');
            return;
        }

        setUploading(true);
        setError(null);
        setSuccess(null);

        try {
            // Get current user
            const { data: { user } } = await supabase.auth.getUser();
            if (!user) throw new Error('Not authenticated');

            // Generate unique file name
            const timestamp = Date.now();
            const fileName = `resume_v${version.replace(/\./g, '_')}_${timestamp}.pdf`;
            const filePath = `resumes/${fileName}`;

            // Upload to Supabase Storage
            const { error: uploadError } = await supabase.storage
                .from('documents')
                .upload(filePath, file, {
                    contentType: 'application/pdf',
                    upsert: false
                });

            if (uploadError) throw uploadError;

            // Get public URL
            const { data: { publicUrl } } = supabase.storage
                .from('documents')
                .getPublicUrl(filePath);

            // Insert into database
            const { error: dbError } = await supabase
                .from('resumes')
                .insert({
                    file_url: publicUrl,
                    file_name: file.name,
                    file_size: file.size,
                    version: version,
                    is_current: resumes.length === 0, // First upload is current
                    uploaded_by: user.id
                });

            if (dbError) throw dbError;

            setSuccess('Resume uploaded successfully!');
            setVersion('');
            if (fileInputRef.current) fileInputRef.current.value = '';
            fetchResumes();
        } catch (err) {
            console.error('Upload error:', err);
            setError('Failed to upload resume. Make sure the storage bucket exists.');
        } finally {
            setUploading(false);
        }
    }

    async function setAsCurrent(id: string) {
        try {
            // First, unset all as current
            await supabase
                .from('resumes')
                .update({ is_current: false })
                .eq('is_current', true); // Update only currently active ones

            // Then set the selected one as current
            const { error } = await supabase
                .from('resumes')
                .update({ is_current: true })
                .eq('id', id);

            if (error) throw error;

            setSuccess('Resume set as current');
            fetchResumes();
        } catch (err) {
            console.error('Error setting current:', err);
            setError('Failed to set as current');
        }
    }

    async function deleteResume(resume: Resume) {
        if (!confirm('Are you sure you want to delete this resume?')) return;

        try {
            // Extract file path from URL
            const urlParts = resume.file_url.split('/');
            const filePath = `resumes/${urlParts[urlParts.length - 1]}`;

            // Delete from storage
            await supabase.storage
                .from('documents')
                .remove([filePath]);

            // Delete from database
            const { error } = await supabase
                .from('resumes')
                .delete()
                .eq('id', resume.id);

            if (error) throw error;

            setSuccess('Resume deleted successfully');
            fetchResumes();
        } catch (err) {
            console.error('Delete error:', err);
            setError('Failed to delete resume');
        }
    }

    function formatFileSize(bytes: number): string {
        if (bytes < 1024) return bytes + ' B';
        if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
        return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
    }

    function formatDate(dateString: string): string {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    }

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl font-bold font-display">Resume Manager</h1>
                <p className="text-gray-500 dark:text-gray-400">Upload and manage your CV/Resume files</p>
            </div>

            {/* Messages */}
            {error && (
                <div className="bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 px-4 py-3 rounded-lg">
                    {error}
                </div>
            )}
            {success && (
                <div className="bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400 px-4 py-3 rounded-lg">
                    {success}
                </div>
            )}

            {/* Upload Section */}
            <Card>
                <CardHeader>
                    <h2 className="text-lg font-semibold">Upload New Resume</h2>
                </CardHeader>
                <CardContent>
                    <div className="flex flex-col sm:flex-row gap-4">
                        <div className="flex-1">
                            <Input
                                placeholder="Version (e.g., 2.0, Jan 2025)"
                                value={version}
                                onChange={(e) => setVersion(e.target.value)}
                                className="mb-2 sm:mb-0"
                            />
                        </div>
                        <div className="flex gap-2">
                            <input
                                type="file"
                                ref={fileInputRef}
                                accept=".pdf"
                                onChange={handleUpload}
                                className="hidden"
                                id="resume-upload"
                            />
                            <Button
                                variant="accent"
                                onClick={() => fileInputRef.current?.click()}
                                disabled={uploading || !version.trim()}
                                className="gap-2"
                            >
                                {uploading ? (
                                    <>
                                        <Loader2 className="w-4 h-4 animate-spin" />
                                        Uploading...
                                    </>
                                ) : (
                                    <>
                                        <Upload className="w-4 h-4" />
                                        Upload PDF
                                    </>
                                )}
                            </Button>
                        </div>
                    </div>
                    <p className="text-xs text-gray-500 mt-2">
                        Only PDF files up to 10MB are supported
                    </p>
                </CardContent>
            </Card>

            {/* Resumes List */}
            <Card>
                <CardHeader>
                    <h2 className="text-lg font-semibold">Uploaded Resumes</h2>
                </CardHeader>
                <CardContent>
                    {loading ? (
                        <div className="flex items-center justify-center py-8">
                            <Loader2 className="w-6 h-6 animate-spin text-gray-400" />
                        </div>
                    ) : resumes.length === 0 ? (
                        <div className="text-center py-8 text-gray-500">
                            <FileText className="w-12 h-12 mx-auto mb-4 opacity-50" />
                            <p>No resumes uploaded yet</p>
                            <p className="text-sm">Upload your first resume above</p>
                        </div>
                    ) : (
                        <div className="divide-y divide-gray-200 dark:divide-zinc-800">
                            {resumes.map((resume) => (
                                <div
                                    key={resume.id}
                                    className="flex flex-col sm:flex-row sm:items-center justify-between py-4 gap-4"
                                >
                                    <div className="flex items-start gap-3">
                                        <div className="p-2 bg-red-50 dark:bg-red-900/20 rounded-lg">
                                            <FileText className="w-6 h-6 text-red-500" />
                                        </div>
                                        <div>
                                            <div className="flex items-center gap-2">
                                                <span className="font-medium">{resume.file_name}</span>
                                                {resume.is_current && (
                                                    <Badge variant="default" className="bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400">
                                                        <Check className="w-3 h-3 mr-1" />
                                                        Current
                                                    </Badge>
                                                )}
                                            </div>
                                            <div className="flex gap-4 text-sm text-gray-500 mt-1">
                                                <span>Version: {resume.version}</span>
                                                <span>{formatFileSize(resume.file_size)}</span>
                                                <span>{formatDate(resume.uploaded_at)}</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-2 sm:ml-auto">
                                        <a href={resume.file_url} target="_blank" rel="noopener noreferrer">
                                            <Button variant="outline" size="sm" className="gap-1">
                                                <Download className="w-4 h-4" />
                                                Download
                                            </Button>
                                        </a>
                                        {!resume.is_current && (
                                            <Button
                                                variant="outline"
                                                size="sm"
                                                onClick={() => setAsCurrent(resume.id)}
                                                className="gap-1"
                                            >
                                                <Star className="w-4 h-4" />
                                                Set Current
                                            </Button>
                                        )}
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            onClick={() => deleteResume(resume)}
                                            className="text-red-500 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/20"
                                        >
                                            <Trash className="w-4 h-4" />
                                        </Button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </CardContent>
            </Card>

            {/* Info Card */}
            <Card className="bg-blue-50 dark:bg-blue-900/10 border-blue-200 dark:border-blue-800">
                <CardContent className="p-4">
                    <h3 className="font-semibold text-blue-700 dark:text-blue-400 mb-2">How it works</h3>
                    <ul className="text-sm text-blue-600 dark:text-blue-300 space-y-1">
                        <li>• Upload your resume PDF with a version number</li>
                        <li>• Set one resume as "Current" - this is what visitors will download</li>
                        <li>• The CV/Resume button on your site will automatically download the current version</li>
                        <li>• Keep old versions for reference or to quickly switch back</li>
                    </ul>
                </CardContent>
            </Card>
        </div>
    );
}
