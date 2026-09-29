import type {Metadata} from 'next';
import './globals.css'; // Global styles

export const metadata: Metadata = {
  title: 'Remix SelfieCraft - Saudi Everyday Smartphone Selfie Prompt Engine',
  description: 'An intelligent, location-driven smartphone selfie prompt engine calibrated for Saudi everyday authenticity, physically plausible camera geometry, and pre-facelift Range Rover Sport contexts for ChatGPT Images & Gemini.',
  openGraph: {
    title: 'Remix SelfieCraft - Saudi Everyday Smartphone Selfie Prompt Engine',
    description: 'An intelligent, location-driven smartphone selfie prompt engine calibrated for Saudi everyday authenticity, physically plausible camera geometry, and pre-facelift Range Rover Sport contexts for ChatGPT Images & Gemini.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Remix SelfieCraft - Saudi Everyday Smartphone Selfie Prompt Engine',
    description: 'An intelligent, location-driven smartphone selfie prompt engine calibrated for Saudi everyday authenticity, physically plausible camera geometry, and pre-facelift Range Rover Sport contexts for ChatGPT Images & Gemini.',
  },
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="ar" dir="rtl">
      <body suppressHydrationWarning className="font-sans antialiased">{children}</body>
    </html>
  );
}
