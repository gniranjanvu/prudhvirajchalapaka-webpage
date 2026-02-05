"use client";

import { useState, KeyboardEvent } from 'react';
import { X } from 'lucide-react';
import { Badge } from '@/components/ui/Badge';
import { Input } from '@/components/ui/Input';

interface TagsInputProps {
    value: string[];
    onChange: (value: string[]) => void;
    placeholder?: string;
    disabled?: boolean;
}

export default function TagsInput({ value = [], onChange, placeholder, disabled }: TagsInputProps) {
    const [inputValue, setInputValue] = useState('');

    const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
        if (disabled) return;

        if (e.key === 'Enter' || e.key === ',') {
            e.preventDefault();
            const newTag = inputValue.trim();

            if (newTag && !value.includes(newTag)) {
                onChange([...value, newTag]);
                setInputValue('');
            }
        } else if (e.key === 'Backspace' && !inputValue && value.length > 0) {
            onChange(value.slice(0, -1));
        }
    };

    const removeTag = (tagToRemove: string) => {
        if (disabled) return;
        onChange(value.filter(tag => tag !== tagToRemove));
    };

    return (
        <div className="flex flex-wrap gap-2 p-2 border border-gray-200 dark:border-zinc-800 rounded-lg bg-white dark:bg-zinc-900 focus-within:ring-2 focus-within:ring-purple-500/20 focus-within:border-purple-500 transition-all">
            {value.map((tag) => (
                <Badge key={tag} variant="secondary" className="gap-1 pl-2 pr-1 py-1">
                    {tag}
                    <button
                        type="button"
                        onClick={() => removeTag(tag)}
                        disabled={disabled}
                        className="hover:bg-gray-200 dark:hover:bg-zinc-700 rounded-full p-0.5 transition-colors"
                    >
                        <X size={12} />
                    </button>
                </Badge>
            ))}
            <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder={value.length === 0 ? placeholder || "Add tags..." : ""}
                className="flex-1 min-w-[120px] bg-transparent outline-none text-sm h-7"
                disabled={disabled}
            />
        </div>
    );
}
