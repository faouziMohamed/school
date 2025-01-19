import { Toaster } from "@/components/ui/toaster";
import { Flex, Stack } from "@chakra-ui/react";

export const metadata = {
  title: "School Management System",
};

export default function RootLayout({ children }) {
  return (
    <Flex
      position="absolute"
      inset={0}
      w="100%"
      h="100%"
      bg="gray.300"
      overflow="hidden"
      fontSize="lg"
    >
      <Toaster />
      <Stack
        py="2rem"
        px={{ base: "0.5rem", sm: "1rem" }}
        fontFamily="var(--font-tertiary)"
        flexBasis="60%"
        flexGrow={1}
        h="100%"
        w="100%"
        hideBelow="sm"
      />
      <Stack
        as="main"
        w="100%"
        h="100%"
        bgColor="cyan.600"
        color="#fff"
        pt="2rem"
        maxW={{ sm: "35rem" }}
        flexShrink={0}
        alignItems="center"
        px="1rem"
        flexBasis={{ sm: "70%", md: "40%" }}
      >
        {children}
      </Stack>
    </Flex>
  );
}
