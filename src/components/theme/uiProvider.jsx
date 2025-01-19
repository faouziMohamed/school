"use client";

import { ColorModeProvider } from "./color-mode";
import { system } from "@/components/theme/config";
import { ChakraProvider } from "@chakra-ui/react";

export function UiProvider(props) {
  return (
    <ChakraProvider value={system}>
      <ColorModeProvider {...props} />
    </ChakraProvider>
  );
}
