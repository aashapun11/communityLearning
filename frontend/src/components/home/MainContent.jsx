import React from "react";
import { Box, VStack } from "@chakra-ui/react";

import { colors } from "../../theme/colors";

// import WelcomeBanner from "./WelcomeBanner";
// import ContinueLearning from "./ContinueLearning";
import LearningFeed from "./LearningFeed";

function MainContent() {
  return (
    <Box
      flex="1"
      bg={colors.background}
      minH="100vh"
      px={{ base: 4, md: 6, lg: 8 }}
      py={6}
    >
      <VStack
        align="stretch"
        gap={8}
        maxW="900px"
        mx="auto"
      >
        {/* Welcome Banner */}
        {/* <WelcomeBanner /> */}

        {/* Active Challenges */}
        {/* <ContinueLearning /> */}

        {/* Community Learning Feed */}
        <LearningFeed />
      </VStack>
    </Box>
  );
}

export default MainContent;