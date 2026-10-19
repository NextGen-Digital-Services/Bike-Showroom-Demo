import Link from "react";
import { Button } from "@/components/ui/Button";
import { ArrowLeft, Compass } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-slate-950 text-white flex flex-col items-center justify-center p-6 text-center space-y-4">
      <div className="w-16 h-16 rounded-2xl bg-rose-500/10 text-rose-500 flex items-center justify-center mb-2">
        <Compass className="w-8 h-8 animate-pulse" />
      </div>
      <h1 className="text-4xl font-extrabold tracking-tight">404 - Page Not Found</h1>
      <p className="text-sm text-slate-400 max-w-md">
        The requested showroom resource, invoice, or spare part record does not exist or has been relocated.
      </p>
      <div className="pt-2">
        <a
          href="/dashboard"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-white text-xs font-bold transition-all"
        >
          <span>Return to Cockpit</span>
        </a>
      </div>
    </div>
  );
}
