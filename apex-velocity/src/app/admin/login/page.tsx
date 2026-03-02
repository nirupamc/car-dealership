"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function AdminLogin() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError("");

        try {
            const res = await signIn("credentials", {
                email,
                password,
                redirect: false,
            });

            if (res?.error) {
                setError("Invalid credentials. Please contact IT support.");
            } else {
                router.push("/admin/dashboard");
                router.refresh();
            }
        } catch (err) {
            setError("An unexpected error occurred.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#0A0A0A] flex flex-col items-center justify-center p-6 relative overflow-hidden">

            {/* Decorative Brand Accent */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-primary/10 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2 pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#00F0FF]/10 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/2 pointer-events-none" />

            <div className="w-full max-w-md relative z-10">

                <div className="text-center mb-10 border-b border-border pb-8">
                    <div className="w-12 h-12 bg-primary text-black flex items-center justify-center font-bold text-xl rounded mx-auto mb-4">
                        AV
                    </div>
                    <h1 className="text-3xl font-heading text-white tracking-widest uppercase mt-4">Apex Secure</h1>
                    <p className="text-sm text-gray-500 mt-2 uppercase tracking-widest">Authorized Personnel Only</p>
                </div>

                <form onSubmit={handleLogin} className="space-y-6">
                    {error && (
                        <div className="bg-destructive/10 border border-destructive/30 text-destructive text-sm p-4 rounded-lg text-center font-medium">
                            {error}
                        </div>
                    )}

                    <div className="space-y-4">
                        <div>
                            <label className="text-xs text-gray-400 font-bold uppercase tracking-widest mb-2 block">System Identifier</label>
                            <Input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="admin@apexvelocity.com"
                                className="bg-black border-border h-14 text-white rounded-none focus-visible:ring-primary focus-visible:border-primary"
                                required
                            />
                        </div>

                        <div>
                            <label className="text-xs text-gray-400 font-bold uppercase tracking-widest mb-2 block">Passcode</label>
                            <Input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="••••••••"
                                className="bg-black border-border h-14 text-white rounded-none focus-visible:ring-primary focus-visible:border-primary"
                                required
                            />
                        </div>
                    </div>

                    <Button
                        type="submit"
                        disabled={isLoading}
                        className="w-full h-14 bg-primary text-black hover:bg-primary/90 font-bold text-lg rounded-none glow-hover flex items-center justify-center gap-2 mt-8"
                    >
                        {isLoading ? "AUTHENTICATING..." : <><Lock className="w-4 h-4" /> SECURE LOGIN</>}
                    </Button>

                    <p className="text-center text-xs text-gray-600 mt-8">
                        Session activity is monitored and logged in compliance with Apex Velocity strict security protocol.
                    </p>
                </form>
            </div>
        </div>
    );
}
