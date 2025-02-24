import { appColors, breakpoints } from '@/components/theme/theme-config';
import { createSystem, defaultConfig, defineConfig } from '@chakra-ui/react';

const config = defineConfig({
  globalCss: {
    '*, *::before, *::after': {
      boxSizing: 'border-box',
      fontFamily: 'var(--font-secondary)',
    },
  },
  theme: {
    breakpoints,
    tokens: {
      colors: appColors,
      fonts: {
        html: {
          value: `var(--font-primary, var(--font-secondary))`,
        },
        body: {
          value: `var(--font-primary, var(--font-secondary))`,
        },
        heading: {
          value: `var(--font-primary, var(--font-secondary))`,
        },
      },
    },
  },
});

export const system = createSystem(defaultConfig, config);
