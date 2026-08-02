import React from "react";
import {
  Avatar,
  Box,
  Flex,
  HStack,
  IconButton,
  Menu,
  Portal,
  Text,
  VStack,
} from "@chakra-ui/react";
import { Badge } from "@chakra-ui/react";

import { HiOutlineDotsHorizontal } from "react-icons/hi";

import { colors } from "../../../theme/colors";

function FeedCardHeader({ feed }) {
  return (
    <Flex
  justify="space-between"
  align="center"
  px={5}
  py={3}
  borderBottom="1px solid"
  borderColor={colors.border}
>
      {/* Left */}

<HStack align="center" gap={3}>
            <Avatar.Root size="sm">
          <Avatar.Fallback name={feed.user.name} />
        </Avatar.Root>

        <VStack
          align="flex-start"
          gap={0.5}
        >
          {/* User Name */}

          <Text
            fontWeight="700"
            fontSize="sm"
            color={colors.text}
          >
            {feed.user.name}
          </Text>

          {/* Challenge & Day */}

          <HStack
            gap={2}
            flexWrap="wrap"
          >
            <Text
              fontSize="sm"
              color={colors.secondaryText}
            >
              📚 {feed.challenge}
            </Text>

            {feed.day && (
              <>
                <Text color={colors.secondaryText}>•</Text>

                <Text
                  fontSize="sm"
                  color={colors.primary}
                  fontWeight="600"
                >
                  🔥 Day {feed.day}/{feed.totalDays}
                </Text>
              </>
            )}
          </HStack>

          {/* Time */}

          <Text
            fontSize="xs"
            color={colors.secondaryText}
          >
            {feed.createdAt}
          </Text>
        </VStack>
      </HStack>

      {/* Right */}

      <Menu.Root>
        <Menu.Trigger asChild>
          <IconButton
            aria-label="More options"
            variant="ghost"
            size="sm"
            color={colors.secondaryText}
            _hover={{
              bg: colors.hover || "#F1F5F9",
              color: colors.text,
            }}
          >
            <HiOutlineDotsHorizontal size={18} />
          </IconButton>
        </Menu.Trigger>

        <Portal>
          <Menu.Positioner>
            <Menu.Content>
              <Menu.Item value="view">
                View Profile
              </Menu.Item>

              <Menu.Item value="report">
                Report
              </Menu.Item>

              {/* Show these only for the owner later */}

              <Menu.Item value="edit">
                Edit
              </Menu.Item>

              <Menu.Item
                value="delete"
                color="red.500"
              >
                Delete
              </Menu.Item>
            </Menu.Content>
          </Menu.Positioner>
        </Portal>
      </Menu.Root>
    </Flex>
  );
}

export default FeedCardHeader;