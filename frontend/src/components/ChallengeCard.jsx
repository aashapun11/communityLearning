import {
  Badge,
  Box,
  Button,
  HStack,
  Stack,
  Text,
} from "@chakra-ui/react";

function ChallengeCard({ challenge }) {
  return (
    <Box
      borderWidth="1px"
      rounded="xl"
      p={6}
      shadow="sm"
      bg="white"
      _hover={{
        shadow: "lg",
        transform: "translateY(-4px)",
      }}
      transition="0.2s"
    >
      <Stack gap={4}>
        <HStack justify="space-between">
          <Badge colorPalette="teal">
            {challenge.topic}
          </Badge>

          <Badge
            colorPalette={
              challenge.difficulty === "Beginner"
                ? "green"
                : challenge.difficulty === "Intermediate"
                ? "orange"
                : "red"
            }
          >
            {challenge.difficulty}
          </Badge>
        </HStack>

        <Text fontWeight="bold" fontSize="xl">
          {challenge.title}
        </Text>

        <Text color="gray.600">
          {challenge.description}
        </Text>

        <HStack justify="space-between">
          <Text fontSize="sm">
            ⏳ {challenge.duration}
          </Text>

          <Text fontSize="sm">
            👥 {challenge.participants}
          </Text>
        </HStack>

        <Button
          colorPalette="teal"
          w="full"
        >
          View Challenge
        </Button>
      </Stack>
    </Box>
  );
}

export default ChallengeCard;