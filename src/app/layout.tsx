// Layout.tsx
import './globals.css';
import { Inter } from 'next/font/google';
import MainLayout from '../Layouts/MainLayout';

// Load the Inter font with Latin subset
const inter = Inter({ subsets: ['latin'] });
export const metadata = {
  title: 'Favour Bawa Portfolio App',
  description: 'A web-design showcase of my work and skills',
};
export const viewport = 'width=device-width, initial-scale=1, maximum-scale=1';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.className} antialiased`}>
        {/* Main layout wraps the application content */}
        <MainLayout>{children}</MainLayout>
      </body>
    </html>
  );
}
