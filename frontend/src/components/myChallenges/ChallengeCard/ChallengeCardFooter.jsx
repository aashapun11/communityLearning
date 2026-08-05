import React from "react";
import {
  Box,
  Button,
  Flex,
  HStack,
} from "@chakra-ui/react";

import {
  FaArrowRight,
  FaInfoCircle,
  FaSignOutAlt,
} from "react-icons/fa";

import { colors } from "../../../theme/colors";

function ChallengeCardFooter({ challenge }) {
  return (
    <Box
      px={5}
      py={4}
      borderTop="1px solid"
      borderColor={colors.border}
    >
      <Flex
        justify="space-between"
        align="center"
        gap={3}
        wrap="wrap"
      >
        {/* Continue */}
        <Button
          bg={colors.primary}
          color="white"
          leftIcon={<FaArrowRight />}
          _hover={{
            bg: colors.primaryHover,
          }}
        >
          Continue
        </Button>

        {/* Secondary Actions */}
        <HStack gap={2}>
          <Button
            variant="ghost"
            leftIcon={<FaInfoCircle />}
            color={colors.secondaryText}
            _hover={{
              bg: `${colors.primary}10`,
              color: colors.primary,
            }}
          >
            Details
          </Button>

          <Button
            variant="ghost"
            leftIcon={<FaSignOutAlt />}
            color={colors.danger}
            _hover={{
              bg: "red.50",
            }}
          >
            Leave
          </Button>
        </HStack>
      </Flex>
    </Box>
  );
}

export default ChallengeCardFooter;