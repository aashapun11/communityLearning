import React from "react";
import {
  Box,
  Button,
  Flex,
  HStack,
} from "@chakra-ui/react";

import {
  FaHeart,
  FaRegHeart,
  FaRegCommentDots,
  FaShare,
} from "react-icons/fa";

import { colors } from "../../../theme/colors";

function FeedCardFooter({ feed }) {
  // Hardcoded for now
  const isLiked = false;

  return (
    <Box
      px={4}
      py={3}
      borderTop="1px solid"
      borderColor={colors.border}
    >
      <Flex gap={2}>
        {/* Like */}

        <Button
          flex={1}
          variant="ghost"
          justifyContent="center"
          color={isLiked ? "red.500" : colors.secondaryText}
          _hover={{
            bg: "red.50",
            color: "red.500",
          }}
        >
          <HStack gap={2}>
            {isLiked ? (
              <FaHeart />
            ) : (
              <FaRegHeart />
            )}

            <Box as="span">
              Like ({feed.likes})
            </Box>
          </HStack>
        </Button>

        {/* Comment */}

        <Button
          flex={1}
          variant="ghost"
          justifyContent="center"
          color={colors.secondaryText}
          _hover={{
            bg: `${colors.primary}12`,
            color: colors.primary,
          }}
        >
          <HStack gap={2}>
            <FaRegCommentDots />

            <Box as="span">
              Comment ({feed.comments})
            </Box>
          </HStack>
        </Button>

        {/* Share */}

        <Button
          flex={1}
          variant="ghost"
          justifyContent="center"
          color={colors.secondaryText}
          _hover={{
            bg: `${colors.primary}12`,
            color: colors.primary,
          }}
        >
          <HStack gap={2}>
            <FaShare />

            <Box as="span">
              Share
            </Box>
          </HStack>
        </Button>
      </Flex>
    </Box>
  );
}

export default FeedCardFooter;