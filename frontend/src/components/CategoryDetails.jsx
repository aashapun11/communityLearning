import { useEffect, useState } from "react";
import {
  Box,
  Heading,
  SimpleGrid,
  Text,
  VStack,
} from "@chakra-ui/react";
import { useNavigate, useParams } from "react-router-dom";
import axiosInstance from "../api/axiosInstance";
import { colors } from "../theme/colors";

function CategoryDetails() {
  const { slug } = useParams();
  const navigate = useNavigate();

  const [topics, setTopics] = useState([]);

  useEffect(() => {
    async function fetchTopics() {
      try {
        const response = await axiosInstance.get(
          `/challenges/getTopicsByCategory/${slug}`
        );

        setTopics(response.data.topics);
      } catch (error) {
        console.error("Error fetching topics:", error);
      }
    }

    fetchTopics();
  }, [slug]);

  const handleTopicClick = (topic) => {
    navigate(`/getChallengesByTopic/${topic}`);
  };

  const formatTopic = (topic) =>
    topic
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");

  return (
    <Box maxW="7xl" mx="auto" p={6}>
      <Heading
        mb={10}
        textTransform="capitalize"
        fontSize="3xl"
        fontWeight="bold"
        color= {colors.primary}
      >
        {slug.replace(/-/g, " ")}
      </Heading>

      <SimpleGrid columns={{ base: 1, sm: 2, md: 3, lg: 4 }} gap={6}>
        
        {topics.map((topic) => (
          <Box
            key={topic}
            p={6}
            borderRadius="2xl"
            border="1px solid"
            borderColor="gray.200"
            bg="white"
            cursor="pointer"
            transition="all 0.25s ease"
            _hover={{
              transform: "translateY(-6px)",
              shadow: "xl",
              borderColor: "teal.400",
            }}
            onClick={() => handleTopicClick(topic)}
          >
            
            <VStack align="start" gap={3}>
              <Box
                w="45px"
                h="45px"
                borderRadius="xl"
                bg="teal.100"
                display="flex"
                alignItems="center"
                justifyContent="center"
                fontSize="xl"
              >
                💡
              </Box>

              <Text
                fontSize="lg"
                fontWeight="bold"
                color="gray.800"
              >
                {formatTopic(topic)}
              </Text>

              <Text
                fontSize="sm"
                color="gray.500"
              >
                Explore challenges and build consistency
              </Text>
            </VStack>
          </Box>
        ))}
      </SimpleGrid>
    </Box>
  );
}

export default CategoryDetails;