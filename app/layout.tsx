import type { Metadata } from 'next';
import { ThemeProvider, AuthProvider, ToastProvider } from '@/components/providers';
import { ConditionalNavbar } from '@/components/layout/ConditionalNavbar';
import NavigationDock from '@/components/layout/NavigationDock';
import '@fontsource/space-grotesk/300.css';
import '@fontsource/space-grotesk/400.css';
import '@fontsource/space-grotesk/500.css';
import '@fontsource/space-grotesk/600.css';
import '@fontsource/space-grotesk/700.css';
import '@fontsource/jetbrains-mono/400.css';
import '@fontsource/jetbrains-mono/500.css';
import '@fontsource/jetbrains-mono/600.css';
import '@fontsource/jetbrains-mono/700.css';
import './globals.css';

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
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Preconnect for other assets if needed */}
      </head>
      <body className="font-sans antialiased bg-[#f5f0eb] dark:bg-[#0a0a0a] text-gray-900 dark:text-gray-100 selection:bg-red-500/30 selection:text-red-500 transition-colors duration-500">
        <ThemeProvider>
          <AuthProvider>
            <ToastProvider>
              <ConditionalNavbar />
              <NavigationDock />
              {children}
            </ToastProvider>
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
