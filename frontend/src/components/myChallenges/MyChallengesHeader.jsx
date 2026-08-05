import React from "react";
import {
  Box,
  Flex,
  HStack,
  Text,
  Badge,
  Icon,
} from "@chakra-ui/react";

import { FaBookOpen } from "react-icons/fa";

import { colors } from "../../theme/colors";

function MyChallengesHeader({ joinedCount,
  activeCount,
  completedCount }) {
  return (
    <Box
      bg={colors.card}
      border="1px solid"
      borderColor={colors.border}
      borderRadius="xl"
      px={6}
      py={5}
      shadow="sm"
    >
      <Flex
        justify="space-between"
        align={{ base: "flex-start", md: "center" }}
        direction={{ base: "column", md: "row" }}
        gap={4}
      >
        {/* Left */}
        <HStack align="center" gap={4}>
          <Flex
            w="50px"
            h="50px"
            borderRadius="xl"
            bg={`${colors.primary}15`}
            align="center"
            justify="center"
          >
            <Icon
              as={FaBookOpen}
              color={colors.primary}
              boxSize={6}
            />
          </Flex>

          <Box>
            <Text
              fontSize="2xl"
              fontWeight="700"
              color={colors.text}
            >
              My Challenges
            </Text>

            <Text
              mt={1}
              fontSize="sm"
              color={colors.secondaryText}
            >
              Continue your learning journey and keep your streak alive 🔥
            </Text>
          </Box>
        </HStack>

        {/* Right */}
       <HStack
  gap={3}
  flexWrap="wrap"
>
  <Badge
    px={4}
    py={2}
    borderRadius="full"
    bg={`${colors.primary}15`}
    color={colors.primary}
    border="1px solid"
    borderColor={`${colors.primary}35`}
    fontWeight="700"
  >
    📚 {joinedCount} Joined
  </Badge>

  <Badge
    px={4}
    py={2}
    borderRadius="full"
    bg="green.50"
    color="green.700"
    border="1px solid"
    borderColor="green.200"
    fontWeight="700"
  >
    🚀 {activeCount} Active
  </Badge>

  <Badge
    px={4}
    py={2}
    borderRadius="full"
    bg="orange.50"
    color="orange.700"
    border="1px solid"
    borderColor="orange.200"
    fontWeight="700"
  >
    🏆 {completedCount} Completed
  </Badge>
</HStack>
      </Flex>
    </Box>
  );
}

export default MyChallengesHeader;