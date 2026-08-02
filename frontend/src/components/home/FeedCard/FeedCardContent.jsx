import React from "react";
import {
  Box,
  Text,
  VStack,
} from "@chakra-ui/react";

import { colors } from "../../../theme/colors";
import ActivityBadge from "./ActivityBadge";

function FeedCardContent({ feed }) {
  return (
    <Box px={5} py={4}>
      <VStack
        align="stretch"
        gap={4}
      >
        {/* Activity Badge */}

        <ActivityBadge  activity={feed.activity} />

        {/* Learning Update */}

        <Text
          color={colors.text}
          fontSize="md"
          lineHeight="1.8"
          whiteSpace="pre-wrap"
        >
          {feed.content}
        </Text>

        {/* Optional Achievement Message */}

        {feed.activity === "badge" && feed.badge && (
          <Box

            bg="orange.50"
            border="1px solid"
            borderColor="orange.200"
            borderRadius="lg"
            px={4}
            py={3}
          >
            <Text
              color="orange.700"
              fontWeight="600"
            >
              🏅 {feed.badge}
            </Text>
          </Box>
        )}

        {/* Optional Completion Message */}

        {feed.activity === "completed" && (
          <Box
            bg="green.50"
            border="1px solid"
            borderColor="green.200"
            borderRadius="lg"
            px={4}
            py={3}
          >
            <Text
              color="green.700"
              fontWeight="600"
            >
              🎉 Successfully completed this challenge!
            </Text>
          </Box>
        )}

        {/* Optional Joined Challenge */}

        {feed.activity === "joined" && (
          <Box
            bg="blue.50"
            border="1px solid"
            borderColor="blue.200"
            borderRadius="lg"
            px={4}
            py={3}
          >
            <Text
              color="blue.700"
              fontWeight="600"
            >
              🚀 Started a new learning journey.
            </Text>
          </Box>
        )}
      </VStack>
    </Box>
  );
}

export default FeedCardContent;