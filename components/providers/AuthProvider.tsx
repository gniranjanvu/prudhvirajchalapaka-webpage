"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { User, Session } from "@supabase/supabase-js";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";

interface AuthContextType {
    user: User | null;
    session: Session | null;
    isLoading: boolean;
    signInWithOTP: (email: string) => Promise<{ error: any }>;
    verifyOTP: (email: string, token: string) => Promise<{ error: any }>;
    signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
    user: null,
    session: null,
    isLoading: true,
    signInWithOTP: async () => ({ error: null }),
    verifyOTP: async () => ({ error: null }),
    signOut: async () => { },
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);
    const [session, setSession] = useState<Session | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const router = useRouter();
    const supabase = createClient();

    useEffect(() => {
        const {
            data: { subscription },
        } = supabase.auth.onAuthStateChange((_event, session) => {
            setSession(session);
            setUser(session?.user ?? null);
            setIsLoading(false);
        });

        return () => subscription.unsubscribe();
    }, [supabase]);

    const signInWithOTP = async (email: string) => {
        try {
            const response = await fetch('/api/auth/send-otp', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email }),
            });

            const result = await response.json();

            if (!response.ok) {
                return { error: new Error(result.error || 'Failed to send OTP') };
            }

            return { error: null };
        } catch (error: any) {
            return { error: error instanceof Error ? error : new Error('Failed to send OTP') };
        }
    };

    const verifyOTP = async (email: string, token: string) => {
        try {
            const response = await fetch('/api/auth/verify-otp', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, token }),
            });

            const result = await response.json();

            if (!response.ok) {
                return { error: new Error(result.error || 'Failed to verify OTP') };
            }

            // Refresh the session after successful verification
            const { data: { session } } = await supabase.auth.getSession();
            if (session) {
                setSession(session);
                setUser(session.user);
                router.push("/admin/dashboard");
            }

            return { error: null };
        } catch (error: any) {
            return { error: error instanceof Error ? error : new Error('Failed to verify OTP') };
        }
    };

    const signOut = async () => {
        await supabase.auth.signOut();
        router.push("/");
    };

    return (
        <AuthContext.Provider
            value={{
                user,
                session,
                isLoading,
                signInWithOTP,
                verifyOTP,
                signOut,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
