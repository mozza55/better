import type { Metadata } from 'next';
import '@/styles/globals.css';
import Providers from './providers';

export const metadata: Metadata = {
  title: 'Better',
  description: '더 나은 나를 위한 기록',
  icons: {
    icon: '/favicon.ico',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <Providers>
        <body className="h-full w-screen overflow-x-hidden bg-slate-200">
          <main className="mx-auto flex min-h-screen min-w-[280px] max-w-[500px] flex-col bg-white">{children}</main>
        </body>
      </Providers>
    </html>
  );
}
