"use client";

import * as React from "react";
import { X, CheckCircle, AlertCircle, Info } from "lucide-react";
import { cn } from "@/lib/utils/cn";
import { AnimatePresence, motion } from "framer-motion";

export type ToastType = "success" | "error" | "info" | "warning";

interface ToastProps {
    id: string;
    title?: string;
    description: string;
    type?: ToastType;
    onDismiss: (id: string) => void;
}

const icons = {
    success: <CheckCircle className="w-5 h-5 text-green-500" />,
    error: <AlertCircle className="w-5 h-5 text-red-500" />,
    warning: <AlertCircle className="w-5 h-5 text-yellow-500" />,
    info: <Info className="w-5 h-5 text-blue-500" />,
};

export const Toast = ({ id, title, description, type = "info", onDismiss }: ToastProps) => {
    useEffect(() => {
        const timer = setTimeout(() => {
            onDismiss(id);
        }, 5000);
        return () => clearTimeout(timer);
    }, [id, onDismiss]);

    return (
        <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.3 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5, transition: { duration: 0.2 } }}
            layout
            className={cn(
                "flex w-full max-w-sm overflow-hidden bg-white/80 dark:bg-zinc-900/80 backdrop-blur-md border border-zinc-200 dark:border-zinc-800 rounded-lg shadow-lg pointer-events-auto ring-1 ring-black/5",
                "p-4 gap-3 items-start"
            )}
        >
            <div className="flex-shrink-0 pt-0.5">{icons[type]}</div>
            <div className="flex-1 w-0">
                {title && <p className="text-sm font-medium text-zinc-900 dark:text-zinc-100">{title}</p>}
                <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1">{description}</p>
            </div>
            <div className="flex-shrink-0 flex ml-4">
                <button
                    className="inline-flex text-zinc-400 hover:text-zinc-500 focus:outline-none"
                    onClick={() => onDismiss(id)}
                >
                    <span className="sr-only">Close</span>
                    <X className="w-5 h-5" />
                </button>
            </div>
        </motion.div>
    );
};

import { createContext, useContext, useState, useEffect } from "react";

interface ToastContextType {
    toast: (props: Omit<ToastProps, "id" | "onDismiss">) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const ToastProvider = ({ children }: { children: React.ReactNode }) => {
    const [toasts, setToasts] = useState<Omit<ToastProps, "onDismiss">[]>([]);

    const toast = ({ title, description, type = "info" }: Omit<ToastProps, "id" | "onDismiss">) => {
        const id = Math.random().toString(36).substring(2, 9);
        setToasts((prev) => [...prev, { id, title, description, type }]);
    };

    const dismiss = (id: string) => {
        setToasts((prev) => prev.filter((t) => t.id !== id));
    };

    return (
        <ToastContext.Provider value={{ toast }}>
            {children}
            <div className="fixed bottom-0 right-0 p-6 flex flex-col gap-2 w-full max-w-sm z-50 pointer-events-none">
                <AnimatePresence mode="popLayout">
                    {toasts.map((t) => (
                        <Toast key={t.id} {...t} onDismiss={dismiss} />
                    ))}
                </AnimatePresence>
            </div>
        </ToastContext.Provider>
    );
};

export const useToast = () => {
    const context = useContext(ToastContext);
    if (!context) {
        throw new Error("useToast must be used within a ToastProvider");
    }
    return context;
};
