import {
  Box,
  VStack,
  Text,
  Icon,
  Flex,
  HStack,
  Separator,
  Button
} from "@chakra-ui/react";

import {
  FiHome,
  FiCompass,
  FiSettings,
} from "react-icons/fi";

import {
  FaFire,
  FaTrophy,
  FaChevronDown,
  FaChevronRight
} from "react-icons/fa";

import { useEffect, useState } from "react";
import { MdOutlineSchool } from "react-icons/md";
import {colors} from '../theme/colors';
import { useNavigate, NavLink } from "react-router-dom";
import { useChallenge } from "../context/ChallengeContext";
function LeftSidebar() {
  const navigate = useNavigate();
  const { myChallenges, loading } = useChallenge();
  

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
        <NavLink to="/">
  {({ isActive }) => (

        <Flex
          align="center"
          gap={3}
          px={4}
          py={3}
          borderRadius="lg"
          cursor="pointer"
           bg={isActive ? colors.primary : "transparent"}
          color={isActive ? "white" : "white"}
        _hover={{
          bg: isActive ? colors.primaryHover : "gray.800",
        }}
          transition=".2s"
         
        >
          <Icon as={FiHome} boxSize={5} />
          <Text fontWeight="600">
            Home
          </Text>
        </Flex>
         )}
</NavLink>

        {/* EXPLORE */}
        <NavLink to="/challengesCategory">
  {({ isActive }) => (

        <Flex
          align="center"
          gap={3}
          px={4}
          py={3}
          borderRadius="lg"
          cursor="pointer"
      bg={isActive ? colors.primary : "transparent"}
      color={isActive ? "white" : "white"}
      _hover={{
        bg: isActive ? colors.primaryHover : "gray.800",
      }}
        >
          <Icon as={FaFire} color="orange.400" />
          <Text>
            Explore Challenges
          </Text>
        </Flex>
          )}
</NavLink>

    <NavLink to="/getMyChallenges">
  {({ isActive }) => (
    <Flex
      align="center"
      justify="space-between"
      px={4}
      py={3}
      borderRadius="lg"
      cursor="pointer"
      bg={isActive ? colors.primary : "transparent"}
      _hover={{
        bg: isActive ? colors.primaryHover : "gray.800",
      }}
    >
      <HStack gap={3}>
        <Icon
          as={MdOutlineSchool}
          color={isActive ? "white" : colors.primary}
        />

        <Text
          color="white"
          fontWeight="600"
        >
          My Challenges({myChallenges.length})
        </Text>
      </HStack>

      <Icon
        as={myChallenges.length ? FaChevronDown : FaChevronRight}
        color="gray.400"
        fontSize="12px"
      />
    </Flex>
  )}
</NavLink>

<Separator my={2} />

{loading ? (
  <Text pl={6} color="gray.400">
    Loading...
  </Text>
) : myChallenges.length > 0 ? (
  <VStack align="stretch" pl={6} gap={1}>
    {myChallenges.map((challenge) => (
      <HStack
        key={challenge._id}
        px={3}
        py={2}
        borderRadius="md"
        cursor="pointer"
        _hover={{
          bg: colors.primaryHover,
        }}
      >
        <Box
          w="7px"
          h="7px"
          borderRadius="full"
          bg={colors.primary}
        />

        <Text
          fontSize="sm"
          color="gray.300"
        >
          {challenge.title}
        </Text>
      </HStack>
    ))}
  </VStack>
): (
  <Box
    pl={6}
    py={2}
  >
    <Text
      fontSize="sm"
      color="gray.500"
      mb={3}
    >
      You haven't joined any challenges yet.
    </Text>

    <Button
      size="sm"
      bg={colors.primary}
      color="white"
      _hover={{
        bg: colors.primaryHover,
      }}
    >
      Explore Challenges
    </Button>
  </Box>
)}
        <Separator my={4} />

        {/* LEADERBOARD */}
        <NavLink to="/leaderboard">
  {({ isActive }) => (

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
 )}
</NavLink>
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
              bg: colors.primaryHover
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
              bg: colors.primaryHover
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
        <NavLink to="/settings">
  {({ isActive }) => (

        <Flex
          align="center"
          gap={3}
          px={4}
          py={3}
          borderRadius="lg"
          cursor="pointer"
          _hover={{
            bg: colors.primaryHover
          }}
        >
          <Icon as={FiSettings} />

          <Text>
            Settings
          </Text>
        </Flex>
          )}
</NavLink>

      </VStack>
    </Box>
  );
}

export default LeftSidebar;