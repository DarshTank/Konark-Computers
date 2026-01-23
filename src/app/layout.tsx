import type { Metadata } from "next";
import { Toaster } from "sonner";
import "./globals.css";

import { VisualEditsMessenger } from "orchids-visual-edits";
import ErrorReporter from "@/components/ErrorReporter";
import Script from "next/script";

export const metadata: Metadata = {
  title: "Konark Computers - Computer Sales & Service in Rajkot",
  description: "Konark Computers offers customized service-level maintenance programs, providing full on-site maintenance agreements. Computer repair, networking, and IT consulting services in Rajkot, Gujarat.",
  icons: {
    icon: [
      {
        url: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/6e8b06cd-6c6d-41c8-8ef2-ca16842a29b4-konarkcomputers-in/assets/images/cropped-konark-favicon-32x32-14.png",
        sizes: "32x32",
        type: "image/png",
      },
      {
        url: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/6e8b06cd-6c6d-41c8-8ef2-ca16842a29b4-konarkcomputers-in/assets/images/cropped-konark-favicon-192x192-15.png",
        sizes: "192x192",
        type: "image/png",
      },
    ],
    apple: {
      url: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/6e8b06cd-6c6d-41c8-8ef2-ca16842a29b4-konarkcomputers-in/assets/images/cropped-konark-favicon-180x180-16.png",
      sizes: "180x180",
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
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
        <Toaster richColors position="top-center" />
        <VisualEditsMessenger />
      </body>
    </html>
  );
}