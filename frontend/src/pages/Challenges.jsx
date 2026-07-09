import {
  Box,
  Container,
  Heading,
  SimpleGrid,
  Text,
} from "@chakra-ui/react";

import ChallengeCard from "../components/ChallengeCard";
import challenges from "../data/challenges";

function Challenges() {
  return (
    <Container maxW="7xl" py={10}>
      <Heading mb={2}>
        Explore Challenges
      </Heading>

      <Text color="gray.600" mb={8}>
        Join a challenge and stay consistent with your learning.
      </Text>

      <SimpleGrid
        columns={{
          base: 1,
          md: 2,
          lg: 3,
        }}
        gap={6}
      >
        {challenges.map((challenge) => (
          <ChallengeCard
            key={challenge.id}
            challenge={challenge}
          />
        ))}
      </SimpleGrid>
    </Container>
  );
}

export default Challenges;