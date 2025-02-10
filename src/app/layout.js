import Providers from '@/components/providers/providers';
import {
  leagueSpartan,
  lexend,
  lexendeca,
  loveLight,
} from '@/components/theme/fonts';

export const metadata = {
  title: 'School Management System',
};

export default function RootLayout({ children }) {
  return (
    <html lang='en' suppressHydrationWarning>
      <body
        suppressHydrationWarning
        className={`${lexendeca.variable} ${leagueSpartan.variable} ${lexend.variable} ${loveLight.variable}`}
      >
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
