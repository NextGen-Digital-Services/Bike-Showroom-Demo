import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "ApexMoto | Bike Spare Parts & Inventory Management",
  description: "Advanced motorcycle spare parts inventory, POS billing, stock movements ledger, and showroom analytics.",
  keywords: ["motorcycle spare parts", "bike showroom", "inventory management", "POS billing", "stock management"],
  authors: [{ name: "ApexMoto Systems" }],
  openGraph: {
    title: "ApexMoto - Bike Showroom Inventory & Spare Parts",
    description: "Premium inventory management and POS billing system built for motorcycle dealerships.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className="h-full">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=Inter:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-full flex flex-col bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 antialiased selection:bg-rose-500 selection:text-white">
        {children}
      </body>
    </html>
  );
}

