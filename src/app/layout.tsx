import type { Metadata, Viewport } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Anurag Jha | Interactive Developer OS & Command Center',
  description: 'Interactive portfolio and Web OS showcasing Anurag Jha — AI Systems, Deep Learning, Biometrics, Full-Stack, and Mobile Engineering (React Native/Expo).',
  keywords: ['Anurag Jha', 'Portfolio', 'AI Engineer', 'Deep Learning', 'PyTorch', 'OpenCV', 'React Native', 'Expo', 'Full-Stack Developer', 'Galgotias University'],
  authors: [{ name: 'Anurag Jha' }],
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full">
      <body className="h-full w-full overflow-hidden bg-black text-slate-100 antialiased selection:bg-cyan-500 selection:text-black">
        {children}
      </body>
    </html>
  );
}
