import { createSystem, defaultConfig, defineConfig } from '@chakra-ui/react';

const config = defineConfig({
  globalCss: {
    '*, *::before, *::after': {
      boxSizing: 'border-box',
      // fontFamily: 'var(--font-primary)',
    },
  },
});

export const system = createSystem(defaultConfig, config);
