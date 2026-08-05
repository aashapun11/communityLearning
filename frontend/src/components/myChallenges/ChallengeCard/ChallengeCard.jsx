import React from "react";
import {
  Box,
} from "@chakra-ui/react";

import { colors } from "../../../theme/colors";

import ChallengeCardHeader from "./ChallengeCardHeader";
import ChallengeCardBody from "./ChallengeCardBody";
import ChallengeCardFooter from "./ChallengeCardFooter";

function ChallengeCard({ challenge }) {
  return (
    <Box
      bg={colors.card}
      border="1px solid"
      borderColor={colors.border}
      borderRadius="2xl"
      overflow="hidden"
      shadow="sm"
      transition="all .25s ease"
      _hover={{
        transform: "translateY(-4px)",
        borderColor: colors.primary,
        shadow: "lg",
      }}
    >
      {/* Header */}
      <ChallengeCardHeader
        challenge={challenge}
      />

      {/* Body */}
      <ChallengeCardBody
        challenge={challenge}
      />

      {/* Footer */}
      <ChallengeCardFooter
        challenge={challenge}
      />
    </Box>
  );
}

export default ChallengeCard;