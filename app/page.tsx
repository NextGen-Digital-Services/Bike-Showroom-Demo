import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Sparkles, ShieldCheck, Zap, Layers, Boxes, ShoppingCart } from "lucide-react";

export const metadata = {
  title: "ApexMoto | Motorcycle Spare Parts & Inventory System",
  description: "Enterprise-grade motorcycle spare parts inventory, POS billing, stock movements ledger, and showroom analytics.",
};

export default function HomePage() {
  return (
    <div className="min-h-screen bg-slate-950 text-white flex flex-col justify-between selection:bg-rose-500 selection:text-white">
      {/* Top Navbar */}
      <header className="h-20 px-6 sm:px-12 flex items-center justify-between border-b border-slate-800/80 backdrop-blur-xl bg-slate-950/60 sticky top-0 z-30">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-rose-600 to-rose-400 flex items-center justify-center text-white font-extrabold text-lg shadow-lg">
            APX
          </div>
          <div>
            <span className="font-extrabold text-base tracking-tight text-white uppercase">
              Apex<span className="text-rose-500">Moto</span>
            </span>
            <span className="text-[10px] text-slate-400 block -mt-1 font-mono">Dealership Systems</span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/login"
            className="px-4 py-2 text-xs font-semibold text-slate-300 hover:text-white transition-colors"
          >
            Staff Login
          </Link>
          <Link
            href="/dashboard"
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-white text-xs font-bold shadow-lg shadow-rose-600/30 transition-all hover:scale-105"
          >
            <span>Launch Cockpit</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <main className="relative flex-1 flex flex-col items-center justify-center text-center px-6 py-20 max-w-5xl mx-auto space-y-8">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-rose-500/10 border border-rose-500/30 text-rose-400 text-xs font-bold animate-in fade-in">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Automotive Spare Parts & Dealership Inventory Cockpit</span>
        </div>

        <h1 className="text-4xl sm:text-6xl font-black tracking-tight uppercase leading-tight max-w-4xl">
          Engineered for Modern <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-500 via-orange-400 to-rose-500">Motorcycle Showrooms</span>
        </h1>

        <p className="text-base sm:text-lg text-slate-400 max-w-2xl leading-relaxed">
          High-end SaaS capability designed so intuitive that any showroom technician or sales clerk can use it on day one. Preloaded with 160+ real parts and 210+ sales.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
          <Link
            href="/dashboard"
            className="flex items-center gap-2.5 px-8 py-3.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-extrabold text-sm shadow-xl shadow-rose-600/30 hover:scale-105 transition-all"
          >
            <span>Enter Live Demo Cockpit</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
          <Link
            href="/login"
            className="flex items-center gap-2 px-6 py-3.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-white hover:bg-slate-800 font-semibold text-sm transition-all"
          >
            <span>View Demo Credentials</span>
          </Link>
        </div>

        {/* Feature Highlights Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-16 w-full text-left">
          <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800/80 backdrop-blur-md space-y-3">
            <div className="p-3 rounded-xl bg-rose-500/10 text-rose-400 w-fit">
              <Boxes className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-base text-white">160+ Pre-seeded Parts</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Real motorcycle parts for Hero, Honda, Bajaj, TVS, Royal Enfield, and Yamaha with GST tax codes and bin racks.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800/80 backdrop-blur-md space-y-3">
            <div className="p-3 rounded-xl bg-sky-500/10 text-sky-400 w-fit">
              <ShoppingCart className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-base text-white">POS Billing & Tax Invoices</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Auto-stock deduction, customer job cards, CGST/SGST splitting, and professional printable invoices with QR code.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800/80 backdrop-blur-md space-y-3">
            <div className="p-3 rounded-xl bg-emerald-500/10 text-emerald-400 w-fit">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-base text-white">Role-Based Intelligence</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Admin controls margins, cost valuations, and factory backup; Staff gets high-speed lookup and POS billing.
            </p>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="h-16 px-6 sm:px-12 flex items-center justify-between border-t border-slate-900 text-xs text-slate-500">
        <span>© 2026 ApexMoto Systems. Automotive SaaS Architecture.</span>
        <span>Ready for Vercel Deployment</span>
      </footer>
    </div>
  );
}
