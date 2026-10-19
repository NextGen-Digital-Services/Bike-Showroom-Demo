"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/use-auth-store";
import { toast } from "@/store/use-toast-store";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { ArrowRight, ShieldCheck, UserCheck, Wrench, Sparkles } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const { login } = useAuthStore();
  const [email, setEmail] = useState("admin@showroom.com");
  const [password, setPassword] = useState("admin123");
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const result = login(email, password);
    setLoading(false);

    if (result.success) {
      toast.success("Welcome back!", "Signed in to ApexMoto Inventory System.");
      router.push("/dashboard");
    } else {
      toast.error("Authentication failed", result.error);
    }
  };

  const handleAutofill = (demoEmail: string, demoPass: string) => {
    setEmail(demoEmail);
    setPassword(demoPass);
    toast.info("Credentials auto-filled", `Selected demo account: ${demoEmail}`);
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-slate-950 text-white">
      {/* Left Hero Showcase */}
      <div className="relative md:w-1/2 min-h-[340px] md:min-h-screen flex flex-col justify-between p-8 sm:p-12 overflow-hidden bg-slate-900 border-b md:border-b-0 md:border-r border-slate-800">
        <Image
          src="https://images.unsplash.com/photo-1558981403-c5f9899a28bc?w=1600&auto=format&fit=crop&q=80"
          alt="Modern Motorcycle Showroom"
          fill
          priority
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-cover opacity-25 mix-blend-luminosity scale-105"
        />
        <div className="relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/10 border border-rose-500/20 text-rose-400 text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Next-Gen Motorcycle Dealership SaaS</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight mt-4 uppercase">
            Apex<span className="text-rose-500">Moto</span> Systems
          </h1>
          <p className="text-sm sm:text-base text-slate-400 mt-2 max-w-md">
            Complete spare parts inventory, POS billing, stock movements ledger, and showroom analytics.
          </p>
        </div>

        <div className="relative z-10 mt-8 space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 backdrop-blur-md">
              <span className="text-xs text-slate-400">Pre-seeded Parts</span>
              <p className="text-xl font-bold font-mono text-slate-100 mt-1">160+ SKUs</p>
            </div>
            <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 backdrop-blur-md">
              <span className="text-xs text-slate-400">Sales Transactions</span>
              <p className="text-xl font-bold font-mono text-slate-100 mt-1">210+ Bills</p>
            </div>
          </div>
          <p className="text-xs text-slate-500">© 2026 ApexMoto Systems Inc. All rights reserved.</p>
        </div>
      </div>

      {/* Right Form Card */}
      <div className="md:w-1/2 flex items-center justify-center p-6 sm:p-12">
        <div className="w-full max-w-md space-y-6">
          <div>
            <h2 className="text-2xl font-bold tracking-tight text-white">Sign In to Cockpit</h2>
            <p className="text-xs text-slate-400 mt-1">Enter your credentials or choose a demo role below.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              label="Staff Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="e.g. admin@showroom.com"
              required
            />
            <Input
              label="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
            />
            <Button type="submit" isLoading={loading} className="w-full mt-2" rightIcon={<ArrowRight className="w-4 h-4" />}>
              Sign In
            </Button>
          </form>

          {/* Quick Demo Autofill Helper Card */}
          <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-3">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block">
              Quick One-Click Demo Logins
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              <button
                type="button"
                onClick={() => handleAutofill("admin@showroom.com", "admin123")}
                className="flex items-center gap-2.5 p-2.5 rounded-xl border border-rose-500/30 bg-rose-500/10 hover:bg-rose-500/20 text-left transition-colors cursor-pointer"
              >
                <ShieldCheck className="w-5 h-5 text-rose-400 shrink-0" />
                <div className="truncate">
                  <p className="text-xs font-bold text-slate-200">Admin Role</p>
                  <p className="text-[10px] text-slate-400 truncate">admin@showroom.com</p>
                </div>
              </button>

              <button
                type="button"
                onClick={() => handleAutofill("staff@showroom.com", "staff123")}
                className="flex items-center gap-2.5 p-2.5 rounded-xl border border-sky-500/30 bg-sky-500/10 hover:bg-sky-500/20 text-left transition-colors cursor-pointer"
              >
                <UserCheck className="w-5 h-5 text-sky-400 shrink-0" />
                <div className="truncate">
                  <p className="text-xs font-bold text-slate-200">Staff Role</p>
                  <p className="text-[10px] text-slate-400 truncate">staff@showroom.com</p>
                </div>
              </button>
            </div>
            <p className="text-[11px] text-slate-500 text-center">
              Password for all demo accounts is <span className="font-mono text-slate-300">admin123</span> / <span className="font-mono text-slate-300">staff123</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
