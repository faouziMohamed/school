'use client';
import { ErrorPage } from '@/components/ui/shared/error-page';
import { AbsoluteCenter } from '@chakra-ui/react';

export default function GlobalError() {
  return (
    <html lang='en'>
      <body>
        <AbsoluteCenter w='100%' h='100%'>
          <ErrorPage code={500} />
        </AbsoluteCenter>
      </body>
    </html>
  );
}
