import React from "react";
import {
  Box,
  Container,
  VStack,
} from "@chakra-ui/react";

import { useChallenge } from "../context/ChallengeContext";
import { colors } from "../theme/colors";

// import MyChallengesHeader from "../components/myChallenges/MyChallengesHeader";
// import SearchChallenges from "../components/myChallenges/SearchChallenges";
// import ChallengeGrid from "../components/myChallenges/ChallengeGrid";
// import EmptyChallenges from "../components/myChallenges/EmptyChallenges";

function MyChallenges() {
  const { myChallenges, loading } = useChallenge();

  return (
    <Box
      bg={colors.background}
      minH="100vh"
      py={8}
    >
      <Container
        maxW="7xl"
      >
        <VStack
          align="stretch"
          gap={8}
        >
          {/* Header */}
          {/* <MyChallengesHeader
            totalChallenges={myChallenges.length}
          /> */}

          {/* Search */}
          {/* <SearchChallenges /> */}

          {/* Content */}
          {loading ? (
            <Box textAlign="center">
              Loading...
            </Box>
          ) : myChallenges.length === 0 ? (
            <Box textAlign="center">
              You have not joined any challenges yet.
            </Box>
          ) : (
            <ChallengeGrid
              challenges={myChallenges}
            />
          )}
        </VStack>
      </Container>
    </Box>
  );
}

export default MyChallenges;