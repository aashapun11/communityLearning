import React from "react";
import {
  Box,
  VStack,
  HStack,
  Text,
  Heading,
  Progress,
  Badge,
  Avatar,
  Button,
} from "@chakra-ui/react";

import { FaFire, FaCoins, FaMedal } from "react-icons/fa";
import { MdTaskAlt } from "react-icons/md";
import { colors } from "../theme/colors";
import {useChallenge} from "../context/ChallengeContext";

function RightSidebar() {
  const { myChallenges, loading, error } = useChallenge();

const joinedCount = myChallenges.length;

const activeCount = myChallenges.filter(
  (challenge) => challenge.status === "active"
).length;

const completedCount = myChallenges.filter(
  (challenge) => challenge.status === "completed"
).length;

const currentStreak = myChallenges?.[0]?.currentStreak ?? 0;
const coins = myChallenges?.[0]?.coins ?? 0;

  return (
    <Box
      w="320px"
      h="calc(100vh - 72px)"
      position="sticky"
      top="72px"
      overflowY="auto"
      color={colors.text}
      bg={colors.background}
      borderLeft="1px solid"
      borderColor={colors.border}
      p={5}
    >
      <VStack gap={5} align="stretch">

        {/* Quick Stats */}

        <Box
          bg={colors.card}
          p={5}
          rounded="xl"
          shadow="sm"
          border="1px solid"
          borderColor={colors.border}
        >
          <Heading size="sm" mb={4}>
            Quick Stats
          </Heading>

          <VStack align="stretch" gap={4}>

            <HStack justify="space-between">
              <HStack>
                <FaFire color="#EA580C" />
                <Text>Current Streak</Text>
              </HStack>

              <Text
                fontWeight="bold"
                color={colors.primary}
              >
                {currentStreak}
              </Text>
            </HStack>

            <HStack justify="space-between">
              <HStack>
                <FaCoins color="#D97706" />
                <Text>Coins</Text>
              </HStack>
              <Text
                fontWeight="bold"
                color={colors.primary}
              >
                {myChallenges.reduce((total, challenge) => total + (challenge.coins || 0), 0)}
              </Text>
            </HStack>
           

            <HStack justify="space-between">
              <HStack>
                <MdTaskAlt color="#16A34A" />
                <Text>Joined</Text>
              </HStack>

              <Text fontWeight="bold">
                {joinedCount}
              </Text>
            </HStack>

            <HStack justify="space-between">
              <HStack>
                <FaMedal color="#FACC15" />
                <Text>Completed</Text>
              </HStack>

              <Text fontWeight="bold">
                {completedCount}
              </Text>
            </HStack>

          </VStack>
        </Box>

        {/* Today's Goal */}

        <Box
          bg={colors.card}
          p={5}
          rounded="xl"
          shadow="sm"
          border="1px solid"
          borderColor={colors.border}
        >
          <Heading size="sm" mb={4}>
            Today's Goal
          </Heading>

          <Text
            fontWeight="600"
            mb={2}
          >
            JavaScript Mastery
          </Text>

          <Progress.Root
            value={70}
            colorPalette="teal"
            rounded="full"
          >
            <Progress.Track>
              <Progress.Range />
            </Progress.Track>
          </Progress.Root>

          <Text
            mt={2}
            color={colors.secondaryText}
            fontSize="sm"
          >
            Day 18 / 60
          </Text>

          <Button
            mt={4}
            w="100%"
            colorPalette="teal"
          >
            Continue Learning
          </Button>
        </Box>

        {/* Next Reward */}

        <Box
          bg={colors.card}
          p={5}
          rounded="xl"
          shadow="sm"
          border="1px solid"
          borderColor={colors.border}
        >
          <Heading size="sm" mb={3}>
            🎯 Next Milestone
          </Heading>

          <Text fontSize="sm">
            Complete
            <Text
              as="span"
              color={colors.primary}
              fontWeight="bold"
            >
              {" "}3 more days{" "}
            </Text>
            to unlock
          </Text>

          <Badge
            mt={3}
            colorPalette="orange"
            rounded="full"
            px={3}
          >
            🔥 On Fire Badge
          </Badge>
        </Box>

        {/* Monthly Rank */}

        <Box
          bg={colors.card}
          p={5}
          rounded="xl"
          shadow="sm"
          border="1px solid"
          borderColor={colors.border}
        >
          <Heading size="sm" mb={4}>
            Monthly Ranking
          </Heading>

          <Text
            fontSize="4xl"
            fontWeight="bold"
            color={colors.primary}
          >
            #24
          </Text>

          <Text color={colors.secondaryText}>
            out of 1,286 learners
          </Text>
        </Box>

      </VStack>
    </Box>
  );
}

export default RightSidebar;