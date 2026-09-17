import React from "react";
import {
  Badge,
  Box,
  Flex,
  HStack,
  IconButton,
  Menu,
  Portal,
  Text,
} from "@chakra-ui/react";

import { HiOutlineDotsHorizontal } from "react-icons/hi";
import { colors } from "../../../theme/colors";
import { useNavigate } from "react-router-dom";
import {useState, useEffect } from "react";
import axiosInstance from "../../../api/axiosInstance";
// import { useChallenge } from "../../../context/ChallengeContext";

function ChallengeCardHeader({ challenge }) {
  const navigate = useNavigate();

  const difficultyColor = {
    Beginner: "green",
    Intermediate: "orange",
    Advanced: "red",
  };
  const activeColor = {
    true: "green",
    false: "red",
  };

  return (
    <Flex
      justify="space-between"
      align="flex-start"
      px={5}
      py={4}
      borderBottom="1px solid"
      borderColor={colors.border}
    >
      {/* Left */}
      <Box flex={1}>
        {/* Challenge Title */}
        <Text
          color={colors.text}
          fontSize="lg"
          fontWeight="700"
          noOfLines={1}
        >
          {challenge.title}
        </Text>

        {/* Badges */}
        <HStack
          mt={3}
          gap={2}
          flexWrap="wrap"
        >
          {/* Topic */}
          <Badge
            bg={`${colors.primary}15`}
            color={colors.primary}
            border="1px solid"
            borderColor={`${colors.primary}35`}
            borderRadius="full"
            px={3}
            py={1}
            fontWeight="600"
          >
            📚 {challenge.topic}
          </Badge>

          {/* Difficulty */}
          <Badge
            colorPalette={
              difficultyColor[challenge.difficulty] || "gray"
            }
            variant="subtle"
            borderRadius="full"
            px={3}
            py={1}
            fontWeight="600"
          >
          {challenge.difficulty}
          </Badge>

          {/* Duration */}
          <Badge
            bg="blue.50"
            color="blue.700"
            border="1px solid"
            borderColor="blue.200"
            borderRadius="full"
            px={3}
            py={1}
            fontWeight="600"
          >
            🗓️ {challenge.duration} Days
          </Badge>

          {/* Status */}
  <Badge
    bg={activeColor[challenge.isActive] || "gray.50"}
    color="white"
    border="1px solid"
    borderColor={activeColor[challenge.isActive] === "green" ? "green.400" : "red.400"}
    borderRadius="full"
    px={3}
    py={1}
    fontWeight="600"
  >
 {challenge.isActive ? "Active" : "Inactive"}
  </Badge>

  {/* Members */}
  <Badge
    bg="purple.50"
    color="purple.700"
    border="1px solid"
    borderColor="purple.200"
    borderRadius="full"
    px={3}
    py={1}
    fontWeight="600"
  >
    👥 {challenge.membersCount} Learners
  </Badge>

  {/* Last Check-in */}
  <Badge
    bg="gray.100"
    color={colors.text}
    border="1px solid"
    borderColor={colors.border}
    borderRadius="full"
    px={3}
    py={1}
    fontWeight="600"
  >
    {challenge.lastCheckIn
  ? `${new Date(challenge.lastCheckIn).getFullYear()} ${new Date(
      challenge.lastCheckIn
    ).toLocaleString("en-US", {
      month: "short",
    })} ${String(
      new Date(challenge.lastCheckIn).getDate()
    ).padStart(2, "0")}`
  : "N/A"}
  </Badge>
        </HStack>
      </Box>

      {/* Right */}
      <Menu.Root>
        <Menu.Trigger asChild>
          <IconButton
            aria-label="Challenge Options"
            variant="ghost"
            size="sm"
            color={colors.secondaryText}
            _hover={{
              bg: `${colors.primary}12`,
              color: colors.primary,
            }}
          >
            <HiOutlineDotsHorizontal />
          </IconButton>
        </Menu.Trigger>

        <Portal>
          <Menu.Positioner>
            <Menu.Content>
              <Menu.Item value="details"
              cursor={"pointer"}
                onClick={() => navigate(`/challengeDetails/${challenge._id}`)}
>
                View Details
              </Menu.Item>

              <Menu.Item value="share">
                Share Challenge
              </Menu.Item>

              <Menu.Item
                value="leave"
                color="red.500"
              >
                Leave Challenge
              </Menu.Item>
            </Menu.Content>
          </Menu.Positioner>
        </Portal>
      </Menu.Root>
    </Flex>
  );
}

export default ChallengeCardHeader;