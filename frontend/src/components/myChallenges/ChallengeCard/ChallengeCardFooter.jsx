import React from "react";
import {
  Box,
  Button,
  Flex,
  HStack,
} from "@chakra-ui/react";

import {
  FaArrowRight,
  FaInfoCircle,
  FaSignOutAlt,
} from "react-icons/fa";

import { colors } from "../../../theme/colors";
import { useNavigate } from "react-router-dom";

function ChallengeCardFooter({ challenge }) {
  const navigate = useNavigate();
  return (
    <Box
      px={3}
      py={2}
      borderTop="1px solid"
      borderColor={colors.border}
    >
      <Flex
        justify="space-between"
        align="center"
        gap={1}
        wrap="wrap"
      >
        {/* Continue */}
        <Button
          size="sm"
          variant="solid"
          bg={colors.primary}
          color="white"
          leftIcon={<FaArrowRight />}
          _hover={{
            bg: colors.primaryHover,
          }} 
         onClick={() => {
  if (challenge.status === "inactive") return;

  navigate(`/checkIns/${challenge._id}`);
}}
        >
          Continue
        </Button>

      </Flex>
    </Box>
  );
}

export default ChallengeCardFooter;