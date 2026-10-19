"use client";

import React, { useEffect } from "react";
import { Button } from "@/components/ui/Button";
import { AlertTriangle, RotateCcw } from "lucide-react";

export default function ErrorBoundary({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Application error boundary triggered:", error);
  }, [error]);

  return (
    <div className="min-h-screen bg-slate-950 text-white flex flex-col items-center justify-center p-6 text-center space-y-4">
      <div className="w-16 h-16 rounded-2xl bg-rose-500/10 text-rose-500 flex items-center justify-center mb-2">
        <AlertTriangle className="w-8 h-8" />
      </div>
      <h2 className="text-2xl font-bold tracking-tight">Something went wrong</h2>
      <p className="text-xs text-slate-400 max-w-md">
        {error.message || "An unexpected error occurred while rendering the cockpit."}
      </p>
      <div className="pt-2">
        <Button onClick={() => reset()} variant="primary" leftIcon={<RotateCcw className="w-4 h-4" />}>
          Try Again
        </Button>
      </div>
    </div>
  );
}
