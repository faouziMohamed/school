'use client';
import { UiProvider } from '@/components/theme/uiProvider';
import { Toaster } from '@/components/ui/toaster';
import { SessionProvider } from 'next-auth/react';

export default function Providers({ children }) {
  return (
    <SessionProvider>
      <UiProvider>
        {children}
        <Toaster />
      </UiProvider>
    </SessionProvider>
  );
}
