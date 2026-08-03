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
import { useNavigate, NavLink } from "react-router-dom";

function LeftSidebar() {
  const navigate = useNavigate();

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

        {/* MY CHALLENGES */}
        <NavLink to="/myChallenges">
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
        )} 
</NavLink>

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
                bg: colors.primaryHover  
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