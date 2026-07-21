import { useEffect, useState } from "react";
import {
  Container,
  Heading,
  SimpleGrid,
  Text,
  Flex, 
  Input,
  Button
} from "@chakra-ui/react";
import ChallengeCard from "../components/ChallengeCard";
import axiosInstance from "../api/axiosInstance";
import { colors } from "../theme/colors";
import { Link as RouterLink } from "react-router";
 function Challenges() {
  const [challenges, setChallenges] = useState([]);  
  const [search, setSearch] = useState("");
  const [topic, setTopic] = useState("");
  const [difficulty, setDifficulty] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");

  useEffect(() => {
  const timer = setTimeout(() => {
    setDebouncedSearch(search);
  }, 1000);

  return () => clearTimeout(timer);
}, [search]);

  useEffect(() => {
    async function fetchChallenges() {
      try{
        const response = await  axiosInstance.get(`/challenges/getChallenges?search=${debouncedSearch}&topic=${topic}&difficulty=${difficulty}`);
        setChallenges(response.data.challenges);
      } catch (error) {
        console.error("Error fetching challenges:", error);
      }
    }
    fetchChallenges();

  }, [debouncedSearch, topic, difficulty]);
  return (
    <Container maxW="7xl" py={10}>
      <Flex
  justify="space-between"
  align="center"
  mb={8}
>
  <Heading color={colors.text}>
    Challenges
  </Heading>

  <Button
    as={RouterLink}
    to="/createChallenge"
    bg={colors.primary}
    color="white"
    _hover={{
      bg: colors.primaryHover,
    }}
  >
    + Create Challenge
  </Button>
</Flex>

     <Flex
  direction={{ base: "column", md: "row" }}
  gap={4}
  mb={8}
>
  {/* Search */}
  <Input
    placeholder="🔍 Search by title..."
    value={search}
    onChange={(e) => setSearch(e.target.value)}
    flex="2"
    color={colors.text}
  />

  {/* Topic */}
  <select
    value={topic}
    onChange={(e) => setTopic(e.target.value)}
    flex="1"
  >
    <option value="">All Topics</option>
    <option value="frontend">Frontend</option>
    <option value="backend">Backend</option>
    <option value="full-stack">Full Stack</option>
    <option value="dsa">DSA</option>
  </select>

  {/* Difficulty */}
  <select
    value={difficulty}
    onChange={(e) => setDifficulty(e.target.value)}
    flex="1"
  >
    <option value="">All Difficulty</option>
    <option value="beginner">Beginner</option>
    <option value="intermediate">Intermediate</option>
    <option value="advanced">Advanced</option>
  </select>
</Flex>
{challenges.length === 0 ? (
  <Text
    textAlign="center"
    color="gray.500"
    mt={10}
  >
    No challenges found.
  </Text>
) : (
  <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} gap={6}>
    {challenges.map((challenge) => (
      <ChallengeCard
        key={challenge._id}
        challenge={challenge}
      />
    ))}
  </SimpleGrid>
)}
    </Container>
  );
}

export default Challenges;