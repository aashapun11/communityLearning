import React from "react";
import {
  Box,
  Flex,
  HStack,
  Progress,
  Stat,
  Text,
} from "@chakra-ui/react";

import {
  FaFire,
  FaCoins,
  FaCheckCircle,
} from "react-icons/fa";

import { colors } from "../../../theme/colors";

function ChallengeCardBody({ challenge }) {
  const progress =
    (challenge.completedDays / challenge.duration) * 100;

  return (
    <Box px={5} py={5}>

      {/* Description */}

      <Text
        color={colors.secondaryText}
        fontSize="sm"
        lineHeight="1.7"
        noOfLines={2}
        mb={5}
      >
        {challenge.description}
      </Text>

      {/* Stats */}

      <Flex justify="space-between" mb={5}>

        <Stat.Root>
          <HStack gap={2}>
            <FaFire color="#EA580C" />

            <Stat.Label>Streak</Stat.Label>
          </HStack>

          <Stat.ValueText color={colors.text}>
            {challenge.currentStreak} Days
          </Stat.ValueText>
        </Stat.Root>

        <Stat.Root>
          <HStack gap={2}>
            <FaCoins color="#EAB308" />

            <Stat.Label>Coins</Stat.Label>
          </HStack>

          <Stat.ValueText color={colors.text}>
            {challenge.coins}
          </Stat.ValueText>
        </Stat.Root>

        <Stat.Root>
          <HStack gap={2}>
            <FaCheckCircle color="#16A34A" />

            <Stat.Label>Check-ins</Stat.Label>
          </HStack>

          <Stat.ValueText color={colors.text}>
            {challenge.completedDays}/{challenge.duration}
          </Stat.ValueText>
        </Stat.Root>

      </Flex>

      {/* Progress */}

      <Box>

        <Flex
          justify="space-between"
          mb={2}
        >
          <Text
            fontWeight="600"
            color={colors.text}
          >
            Progress
          </Text>

          <Text
            color={colors.primary}
            fontWeight="700"
          >
            {Math.round(progress)}%
          </Text>
        </Flex>

        <Progress.Root
          value={progress}
          size="sm"
          borderRadius="full"
        >
          <Progress.Track>
            <Progress.Range
              bg={colors.primary}
            />
          </Progress.Track>
        </Progress.Root>

        <Text
          mt={2}
          fontSize="xs"
          color={colors.secondaryText}
        >
          {challenge.completedDays} of {challenge.duration} days completed
        </Text>

      </Box>

    </Box>
  );
}

export default ChallengeCardBody;