import {
  Badge,
  Box,
  Button,
  HStack,
  Stack,
  Text,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
function ChallengeCard({ challenge }) {
  const navigate = useNavigate();
  return (
    <Box
      borderWidth="1px"
      color="#0F172A"
      rounded="xl"
      borderColor="#E2E8F0"
      p={6}
      shadow="sm"
      bg="#F8FAFC"
      _hover={{
        shadow: "lg",
        transform: "translateY(-4px)",
      }}
      transition="0.2s"
    >
      <Stack gap={4}>
        <HStack justify="space-between">
          <Badge textTransform="capitalize">
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
            textTransform="capitalize"
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
            👥 {challenge.totalParticipants}
          </Text>
        </HStack>

{/* Navigation to challenge details page can be added here, for now it's just a button */}
 
        <Button
          colorPalette="teal"
          w="full"
          onClick={() => navigate(`/challenges/${challenge._id}`)}
        >
          View Challenge
        </Button>
      </Stack>
    </Box>
  );
}

export default ChallengeCard;