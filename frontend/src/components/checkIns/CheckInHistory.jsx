import { useState } from "react";
import {
  VStack,
  HStack,
  Box,
  Flex,
  Text,
  Button,
} from "@chakra-ui/react";
import { colors } from "../../theme/colors";

const CheckInHistory = ({ challenge }) => {
  const [showAll, setShowAll] = useState(false);

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const startDate = new Date(challenge.startDate);
  startDate.setHours(0, 0, 0, 0);

  // Which day of the challenge is today?
  const currentDay =
    Math.floor(
      (today - startDate) / (1000 * 60 * 60 * 24)
    ) + 1;

  const history = Array.from(
    { length: challenge.duration },
    (_, index) => {
      const day = index + 1;

      // Find check-in for this day
      const checkIn = challenge.checkIns.find(
        (checkIn) => checkIn.day === day
      );

      // Calculate date of this challenge day
      const date = new Date(startDate);
      date.setDate(date.getDate() + index);

      let status;

      if (checkIn) {
        status = "completed";
      } else if (day < currentDay) {
        status = "missed";
      } else if (day === currentDay) {
        status = "today";
      } else {
        status = "upcoming";
      }

      return {
        day,
        date,
        checkIn,
        status,
      };
    }
  );

  // Initially show only the latest 3 relevant days
  const visibleHistory = showAll
    ? history
    : history.slice(
        Math.max(0, Math.min(currentDay, history.length) - 3),
        Math.min(currentDay, history.length)
      );

  return (
    <VStack align="stretch" gap={0}>
      {visibleHistory.map((item) => (
        <Flex
          key={item.day}
          justify="space-between"
          align="center"
          py={4}
          borderBottom="1px solid"
          borderColor={colors.border}
        >
          <HStack gap={4}>
            {/* Status icon */}
            <Box
              w="34px"
              h="34px"
              borderRadius="full"
              display="flex"
              alignItems="center"
              justifyContent="center"
              fontWeight="700"
              bg={
                item.status === "completed"
                  ? "green.50"
                  : item.status === "missed"
                  ? "red.50"
                  : item.status === "today"
                  ? "blue.50"
                  : "gray.100"
              }
              color={
                item.status === "completed"
                  ? "green.600"
                  : item.status === "missed"
                  ? "red.600"
                  : item.status === "today"
                  ? "blue.600"
                  : colors.secondaryText
              }
            >
              {item.status === "completed"
                ? "✓"
                : item.status === "missed"
                ? "!"
                : item.status === "today"
                ? "•"
                : "→"}
            </Box>

            {/* Day + Date */}
            <Box>
              <Text fontWeight="600">
                Day {item.day}
              </Text>

              <Text
                fontSize="sm"
                color={colors.secondaryText}
              >
                {item.date.toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "short",
                  day: "2-digit",
                })}
              </Text>
            </Box>
          </HStack>

          {/* Right side */}
          <Box maxW="55%" textAlign="right">
            {item.status === "completed" && (
              <>
                <Text
                  fontSize="sm"
                  fontWeight="600"
                  color="green.600"
                >
                  Completed
                </Text>

                {item.checkIn?.note && (
                  <Text
                    fontSize="sm"
                    color={colors.secondaryText}
                    mt={1}
                    noOfLines={2}
                  >
                    {item.checkIn.note}
                  </Text>
                )}
              </>
            )}

            {item.status === "missed" && (
              <Text
                fontSize="sm"
                fontWeight="600"
                color="red.500"
              >
                Missed
              </Text>
            )}

            {item.status === "today" && (
              <Text
                fontSize="sm"
                fontWeight="600"
                color="blue.600"
              >
                Today
              </Text>
            )}

            {item.status === "upcoming" && (
              <Text
                fontSize="sm"
                fontWeight="600"
                color={colors.secondaryText}
              >
                Upcoming
              </Text>
            )}
          </Box>
        </Flex>
      ))}

      {/* View More / Show Less */}
      {history.length > 3 && (
        <Button
          variant="ghost"
          color={colors.primary}
          mt={3}
          width="100%"
          onClick={() => setShowAll((prev) => !prev)}
        >
          {showAll ? "Show Less ↑" : "View More..."}
        </Button>
      )}
    </VStack>
  );
};

export default CheckInHistory;