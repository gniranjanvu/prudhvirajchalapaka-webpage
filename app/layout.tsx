import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/providers";

export const metadata: Metadata = {
  title: {
    default: "Prudhvi Raj Chalapaka | Robotics & Automation Engineer",
    template: "%s | Prudhvi Raj Chalapaka",
  },
  description:
    "Ambitious Robotics & Automation Engineer with strong foundation in ROS/ROS2, Industrial Automation and autonomous navigation. Proven research capability with Elsevier publication on robotic surgery and pharmacotherapy.",
  keywords: [
    "Robotics",
    "ROS",
    "ROS2",
    "Automation",
    "Embedded Systems",
    "AI",
    "Machine Learning",
    "Industrial Automation",
    "Prudhvi Raj Chalapaka",
  ],
  authors: [{ name: "Prudhvi Raj Chalapaka" }],
  creator: "Prudhvi Raj Chalapaka",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://prudhvirajchalapaka.in",
    title: "Prudhvi Raj Chalapaka | Robotics & Automation Engineer",
    description:
      "Ambitious Robotics & Automation Engineer with strong foundation in ROS/ROS2, Industrial Automation and autonomous navigation.",
    siteName: "Prudhvi Raj Chalapaka",
  },
  twitter: {
    card: "summary_large_image",
    title: "Prudhvi Raj Chalapaka | Robotics & Automation Engineer",
    description:
      "Ambitious Robotics & Automation Engineer with strong foundation in ROS/ROS2, Industrial Automation and autonomous navigation.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link 
          href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&family=Inter:wght@300;400;500;600;700&family=JetBrains+Mono:wght@300;400;500;600;700&display=swap" 
          rel="stylesheet" 
        />
      </head>
      <body className="antialiased font-sans">
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
