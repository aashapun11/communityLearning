import {
  Box,
  SimpleGrid,
  Wrap,
  Badge,
  Flex,
  Text,
  Button
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import axiosInstance from "../api/axiosInstance";
import { colors } from "../theme/colors";
import { useNavigate } from "react-router-dom";

function ChallengesCategory() {
  const [challengesCategory, setChallengesCategory] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchChallengesCategory() {
      try {
        const response = await axiosInstance.get(
          "/challenges/getChallengesCategory"
        );

        setChallengesCategory(response.data.categories);
      } catch (error) {
        console.error(error);
      }
    }

    fetchChallengesCategory();
  }, []);

  return (
    <SimpleGrid columns={{ base: 1, sm: 2, md: 3 }} gap={4}>
      {Object.entries(challengesCategory).map(([category, topics]) => (
        <Box
        m={4}
        key={category}
  p={4}
  rounded="2xl"
  bg={colors.card}
  borderLeft="5px solid"
  borderLeftColor={colors.primary}
  shadow="sm"
  transition="all .25s"
  _hover={{
    transform: "translateY(-6px)",
    shadow: "xl",
    borderLeftWidth: "8px",
  }}
>

          <Text
            color={colors.primary}
            fontWeight="bold"
            fontSize="xl"
          >
        {category
        .split("-")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ")}
          </Text>
          <Wrap mt={4}>
  {topics.slice(0, 1).map(topic => (
    <Badge
      key={topic}
      rounded="full"
      px={3}
      py={1}
      colorPalette="teal"
      variant="subtle"
    >
      {topic}

    </Badge>
  ))}

  {topics.length > 1 && (
    <Badge rounded="full">
      +{topics.length - 1}
    </Badge>
  )}
</Wrap>
<Flex
  justify="space-between"
  align="center"
  mt={6}
>
  <Button
  onClick={() => {
  navigate(`/categories/${category}`)}}
>
  Explore More...
</Button>
</Flex>
        </Box>
      ))}
    </SimpleGrid>
  );
}

export default ChallengesCategory;