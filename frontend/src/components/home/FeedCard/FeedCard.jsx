import React from "react";
import { Box } from "@chakra-ui/react";

import { colors } from "../../../theme/colors";

import FeedCardHeader from "./FeedCardHeader";
import FeedCardContent from "./FeedCardContent";
import FeedCardFooter from "./FeedCardFooter";

function FeedCard({ feed }) {
  return (
    <Box
      bg={colors.card}
      border="1px solid"
      borderColor={colors.border}
      borderRadius="xl"
      leftborderWidth="3px"
      borderLeftColor={colors.primary}
      shadow="sm"
      w="full"
      maxW="2xl"
      mx="auto"
      my={3}
      overflow="hidden"
      transition="all 0.2s ease"
      _hover={{
        shadow: "md",
        borderColor: colors.primary,
          transform: "translateY(-2px)",
      }}
    >
      {/* Header */}
      <FeedCardHeader feed={feed} />

      {/* Content */}
      <FeedCardContent feed={feed} />

      {/* Footer */}
      <FeedCardFooter feed={feed} />
    </Box>
  );
}

export default FeedCard;