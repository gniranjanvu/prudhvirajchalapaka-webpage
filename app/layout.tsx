import type { Metadata } from 'next';
import { Space_Grotesk, JetBrains_Mono } from 'next/font/google';
import { ThemeProvider, AuthProvider, ToastProvider } from '@/components/providers';
import { ConditionalNavbar } from '@/components/layout/ConditionalNavbar';
import './globals.css';

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-space-grotesk',
  display: 'swap',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains-mono',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Prudhvi Raj Chalapaka | Robotics & Automation Engineer',
  description: 'Portfolio of Prudhvi Raj Chalapaka, specializing in ROS2, Industrial Automation, and Autonomous Navigation.',
  icons: {
    icon: '/favicon.ico',
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://prudhvirajchalapaka.in",
    title: "Prudhvi Raj Chalapaka | Robotics & Automation Engineer",
    description: 'Portfolio of Prudhvi Raj Chalapaka, specializing in ROS2, Industrial Automation, and Autonomous Navigation.',
    siteName: "Prudhvi Raj Chalapaka",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning className={`${spaceGrotesk.variable} ${jetbrainsMono.variable}`}>
      <head>
        {/* Preconnect for other assets if needed */}
      </head>
      <body className="font-sans antialiased bg-gray-50 dark:bg-black text-gray-900 dark:text-gray-100 selection:bg-red-500/30 selection:text-red-500 overflow-x-hidden">
        <ThemeProvider>
          <AuthProvider>
            <ToastProvider>
              <ConditionalNavbar />
              {children}
            </ToastProvider>
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
