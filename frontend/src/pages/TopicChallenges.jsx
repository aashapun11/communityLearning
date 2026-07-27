import React, { useState, useEffect } from "react";
import {
  Box,
  Container,
  Heading,
  Text,
  SimpleGrid,
  VStack,
  Badge,
  Button,
  Flex,
  HStack
} from "@chakra-ui/react";
import { useNavigate, useParams } from "react-router-dom";
import axiosInstance from "../api/axiosInstance";
import { colors } from "../theme/colors";
import {LuPlus} from 'react-icons/lu';

function TopicChallenges() {
  const { topic } = useParams();
  const navigate = useNavigate();

  const [challenges, setChallenges] = useState([]);

  useEffect(() => {
    async function fetchChallenges() {
      try {
        const response = await axiosInstance.get(
          `/challenges/getChallengesByTopic?topic=${topic}`
        );

        setChallenges(response.data.challenges);
      } catch (error) {
        console.error("Error fetching challenges:", error);
      }
    }

    fetchChallenges();
  }, [topic]);

  const formatTopic = (topic) =>
    topic
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");

  return (
    <Container maxW="7xl" py={10}>
     <Flex
  justify="space-between"
  align={{ base: "start", md: "center" }}
  direction={{ base: "column", md: "row" }}
  gap={4}
  mb={10}
>
  <VStack align="start" gap={2}>
    <Badge
      colorPalette="teal"
      px={3}
      py={1}
      borderRadius="full"
    >
      Topic
    </Badge>

    <Heading size="2xl" color={colors.primary}>
      {formatTopic(topic)} Challenges
    </Heading>

    <Text color="gray.500">
      Explore community challenges and start learning consistently.
    </Text>
  </VStack>

  <Button
    bg={colors.primary}
    color="white"
    size="lg"
    borderRadius="xl"
    _hover={{
      bg: colors.primaryHover,
      transform: "translateY(-2px)",
    }}
    onClick={() => navigate("/createChallenge")}
  >
    <HStack
      spacing={2}
    >
      <LuPlus />
      <Text>  
        Add Challenge
      </Text>
    </HStack>
  </Button>
</Flex>

      {challenges.length === 0 ? (
       <Box
  bg={colors.card}
  textAlign="center"
          py={20}
          borderRadius="2xl"
          border="1px solid"
          borderColor="gray.200"
  transition="0.3s"
  _hover={{
    transform: "translateY(-6px)",
    borderColor: colors.primary,
    boxShadow: `0 0 30px ${colors.primary}30`,
  }}
>
          <Heading size="md" mb={3} color={colors.primary}>
            No challenges available yet 🚀
          </Heading>

          <Text color="gray.500" mb={6}>
            Be the first to create a {formatTopic(topic)} challenge.
          </Text>

          <Button
            colorPalette="teal"
            onClick={() => navigate("/createChallenge")}
          >
            Create Challenge
          </Button>
        </Box>
      ) : (
        <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} gap={6}>
          {challenges.map((challenge) => (
            <Box
              key={challenge._id}
              p={6}
              borderRadius="2xl"
              border="1px solid"
              borderColor="gray.200"
              bg={colors.card}
              color={colors.text}
              cursor="pointer"
              transition="0.25s"
              _hover={{
                transform: "translateY(-6px)",
                shadow: "xl",
                borderColor: "teal.400",
              }}
              onClick={() =>
                navigate(`/challenges/${challenge._id}`)
              }
            >
              <VStack align="start" gap={3}>
                <Badge colorPalette="purple">
                  {challenge.difficulty}
                </Badge>

                <Heading size="md">
                  {challenge.title}
                </Heading>

                <Text color="gray.600" noOfLines={3}>
                  {challenge.description}
                </Text>

                <Text fontSize="sm" color="gray.500">
                  {challenge.duration} Days
                </Text>
              </VStack>
            </Box>
          ))}
        </SimpleGrid>
      )}
    </Container>
  );
}

export default TopicChallenges;