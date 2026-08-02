import React from "react";
import { Badge } from "@chakra-ui/react";
import { colors } from "../../../theme/colors";

function ActivityBadge({ activity }) {
  switch (activity) {
    case "checkin":
      return (
        <Badge
          alignSelf="flex-start"
          bg={`${colors.primary}15`}
          color={colors.primary}
          border="1px solid"
          borderColor={`${colors.primary}40`}
          px={3}
          py={1}
          rounded="full"
          fontWeight="600"
          display="inline-flex"
        >
          📚 Daily Check-in
        </Badge>
      );

    case "badge":
      return (
        <Badge
          alignSelf="flex-start"
          bg="orange.50"
          color="orange.600"
          border="1px solid"
          borderColor="orange.200"
          px={3}
          py={1}
          rounded="full"
          fontWeight="600"
        >
          🏅 Badge Earned
        </Badge>
      );

    case "completed":
      return (
        <Badge
         alignSelf="flex-start"
          bg="green.50"
          color="green.700"
          border="1px solid"
          borderColor="green.200"
          px={3}
          py={1}
          rounded="full"
          fontWeight="600"
        >
          🎉 Challenge Completed
        </Badge>
      );

    case "joined":
      return (
        <Badge
        alignSelf="flex-start"
          bg="blue.50"
          color="blue.700"
          border="1px solid"
          borderColor="blue.200"
          px={3}
          py={1}
          rounded="full"
          fontWeight="600"
        >
          🚀 Joined Challenge
        </Badge>
      );

    default:
      return null;
  }
}

export default ActivityBadge;