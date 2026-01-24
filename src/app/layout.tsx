import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Outfit } from "next/font/google"; // Import fonts
import { Toaster } from "sonner";
import "./globals.css";

import { VisualEditsMessenger } from "orchids-visual-edits";
import ErrorReporter from "@/components/ErrorReporter";
import Script from "next/script";

// Configure fonts
const plusJakarta = Plus_Jakarta_Sans({ subsets: ["latin"], variable: "--font-plus-jakarta" });
const outfit = Outfit({ subsets: ["latin"], variable: "--font-outfit" });

export const metadata: Metadata = {
  title: "Konark Computers - Computer Sales & Service",
  description: "Konark Computers offers customized service-level maintenance programs, providing full on-site maintenance agreements. Computer repair, networking, and IT consulting services in Rajkot, Gujarat.",
  icons: {
    icon: "/kon.webp",
    apple: "/kon.webp",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${plusJakarta.variable} ${outfit.variable}`}>
      <body className="antialiased bg-background text-foreground font-sans">
        <Script
          id="orchids-browser-logs"
          src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/scripts/orchids-browser-logs.js"
          strategy="afterInteractive"
          data-orchids-project-id="b2ec965f-b013-49fa-a1e8-437e0839620f"
        />
        <ErrorReporter />
        <Script
          src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/scripts//route-messenger.js"
          strategy="afterInteractive"
          data-target-origin="*"
          data-message-type="ROUTE_CHANGE"
          data-include-search-params="true"
          data-only-in-iframe="true"
          data-debug="true"
          data-custom-data='{"appName": "YourApp", "version": "1.0.0", "greeting": "hi"}'
        />
        {children}
        <Toaster richColors position="top-center" theme="dark" />
        <VisualEditsMessenger />
      </body>
    </html>
  );
}