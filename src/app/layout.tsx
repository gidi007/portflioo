import './globals.css';
import { Poppins } from 'next/font/google';
import MainLayout from '../Layouts/MainLayout';

// Load the Poppins font with Latin subset
const poppins = Poppins({ 
  subsets: ['latin'], 
  weight: ['400', '500', '600', '700'] // Include multiple weights
});

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
      <body className={`${poppins.className} antialiased`}>
        {/* Main layout wraps the application content */}
        <MainLayout>{children}</MainLayout>
      </body>
    </html>
  );
}