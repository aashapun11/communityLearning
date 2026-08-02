import {
  Box,
  VStack,
  Text,
  Icon,
  Flex,
  HStack,
  Separator,
} from "@chakra-ui/react";

import {
  FiHome,
  FiCompass,
  FiSettings,
} from "react-icons/fi";

import {
  FaFire,
  FaTrophy,
} from "react-icons/fa";

import { MdOutlineSchool } from "react-icons/md";
import {colors} from '../theme/colors';

function LeftSidebar() {
  const joinedChallenges = [
    "JavaScript Mastery",
    "React Mastery",
    "DSA Bootcamp",
    "Machine Learning",
  ];

  return (
    <Box
      w="280px"
      bg="#111827"
      color="white"
      borderRight="1px solid"
      borderColor="gray.800"
      position="sticky"
      top="0"
      px={4}
      py={6}
      overflowY="auto"
    >
      <VStack align="stretch" gap={2}>

        {/* HOME */}

        <Flex
          align="center"
          gap={3}
          px={4}
          py={3}
          borderRadius="lg"
         bg={colors.primary}
                   _hover={{
                     bg: colors.primaryHover  
                   }}
          color="white"
          cursor="pointer"
          transition=".2s"
         
        >
          <Icon as={FiHome} boxSize={5} />
          <Text fontWeight="600">
            Home
          </Text>
        </Flex>

        {/* EXPLORE */}

        <Flex
          align="center"
          gap={3}
          px={4}
          py={3}
          borderRadius="lg"
          cursor="pointer"
          _hover={{
            bg: "gray.800",
          }}
        >
          <Icon as={FaFire} color="orange.400" />
          <Text>
            Explore Challenges
          </Text>
        </Flex>

        {/* MY CHALLENGES */}

        <Flex
          align="center"
          gap={3}
          px={4}
          py={3}
          borderRadius="lg"
        >
          <Icon
            as={MdOutlineSchool}
            color={colors.primary}
          />

          <Text
            fontWeight="600"
          >
            My Challenges
          </Text>
        </Flex>

        <Separator my={2} />

        <VStack
          align="stretch"
          pl={6}
          gap={1}
        >
          {joinedChallenges.map((challenge, index) => (
            <HStack
              key={index}
              px={3}
              py={2}
              borderRadius="md"
              cursor="pointer"
              transition=".2s"
              _hover={{
                bg: "gray.800",
              }}
            >
              <Box
                w="8px"
                h="8px"
                borderRadius="full"
                bg={colors.primary}
              />

              <Text
                fontSize="sm"
                color="gray.300"
              >
                {challenge}
              </Text>
            </HStack>
          ))}
        </VStack>

        <Separator my={4} />

        {/* LEADERBOARD */}

        <Flex
          align="center"
          gap={3}
          px={4}
          py={3}
        >
          <Icon
            as={FaTrophy}
            color="yellow.400"
          />

          <Text fontWeight="600">
            Leaderboards
          </Text>
        </Flex>

        <VStack
          align="stretch"
          pl={6}
          gap={1}
        >
          <Flex
            px={3}
            py={2}
            borderRadius="md"
            cursor="pointer"
            _hover={{
              bg: "gray.800",
            }}
          >
            📅 Monthly
          </Flex>

          <Flex
            px={3}
            py={2}
            borderRadius="md"
            cursor="pointer"
            _hover={{
              bg: "gray.800",
            }}
          >
            ⭐ All Time
          </Flex>

          <Flex
            px={3}
            py={2}
            borderRadius="md"
            cursor="pointer"
            color="gray.400"
            
          >
            View Full.....
          </Flex>
        </VStack>

        <Separator my={4} />

        {/* SETTINGS */}

        <Flex
          align="center"
          gap={3}
          px={4}
          py={3}
          borderRadius="lg"
          cursor="pointer"
          _hover={{
            bg: "gray.800",
          }}
        >
          <Icon as={FiSettings} />

          <Text>
            Settings
          </Text>
        </Flex>

      </VStack>
    </Box>
  );
}

export default LeftSidebar;