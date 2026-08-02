import React, { useState } from "react";
import {
  Box,
  Flex,
  Text,
  HStack,
  Button,
  VStack,
} from "@chakra-ui/react";

import { FaGlobeAsia } from "react-icons/fa";

 import FeedCard from "./FeedCard/FeedCard";
import { colors } from "../../theme/colors";

function LearningFeed() {
  const [selectedFilter, setSelectedFilter] = useState("All");

  // Hardcoded data for now
  const feedData = [
    {
      id: 1,
      user: {
        name: "Alex Johnson",
        avatar: "",
      },
      challenge: "JavaScript Mastery",
      day: 18,
      totalDays: 60,
      activity: "checkin",
      content:
        "Today I learned Closures and Async/Await. Feeling much more confident about JavaScript now!",
      likes: 18,
      comments: 4,
      createdAt: "2 hours ago",
    },
    {
      id: 2,
      user: {
        name: "Sarah Lee",
        avatar: "",
      },
      challenge: "React Mastery",
      activity: "badge",
      badge: "On Fire 🔥",
      content:
        "Earned my 7-Day Streak badge today! Consistency really pays off.",
      likes: 25,
      comments: 7,
      createdAt: "5 hours ago",
    },
    {
      id: 3,
      user: {
        name: "John Smith",
        avatar: "",
      },
      challenge: "DSA Bootcamp",
      activity: "completed",
      content:
        "Finally completed my DSA Challenge. Thank you everyone for the motivation!",
      likes: 42,
      comments: 13,
      createdAt: "Yesterday",
    },
  ];

  const filters = ["All", "Check-ins", "Achievements"];

  return (
    <Box color={colors.text}>

      {/* Header */}

      <Flex
        justify="space-between"
        align="center"
        mb={6}
        flexWrap="wrap"
        gap={4}
      >
        <HStack gap={3}>
          <FaGlobeAsia
            color={colors.primary}
            size={20}
          />

          <Text
            fontSize="2xl"
            fontWeight="700"
            color={colors.text}
          >
            Learning Feed
          </Text>
        </HStack>

        <HStack>
          {filters.map((filter) => (
            <Button
              key={filter}
              size="sm"
              rounded="full"
              color={selectedFilter === filter ? "white" : colors.text}
              bg={
                selectedFilter === filter
                  ? colors.primary
                  : colors.background
              }
              _hover={{
                bg:
                  selectedFilter === filter
                    ? colors.primaryHover
                    : colors.hover,
              }}
              _active={{
                bg:
                  selectedFilter === filter
                    ? colors.primaryHover
                    : colors.hover,
              }}
              border={
                selectedFilter === filter
                  ? "none"
                  : `1px solid ${colors.border}`
              }
              borderColor={
                selectedFilter === filter
                  ? "transparent"
                  : colors.border
              }
              
              onClick={() => setSelectedFilter(filter)}
            >
              {filter}
            </Button>
          ))}
        </HStack>
      </Flex>

      {/* Feed */}

      <VStack
        gap={5}
        align="stretch"
      >
        {feedData.map((feed) => (
          <FeedCard
            key={feed.id}
            feed={feed}
          />
        ))}
      </VStack>

      {/* Load More */}

      <Flex
        justify="center"
        mt={8}
      >
        <Button
          colorPalette="teal"
          rounded="full"
          size="md"
        >
          Load More
        </Button>
      </Flex>
    </Box>
  );
}

export default LearningFeed;