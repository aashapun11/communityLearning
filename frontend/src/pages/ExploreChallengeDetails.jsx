import {
  Badge,
  Box,
  Button,
  Container,
  Flex,
  Heading,
  HStack,
  SimpleGrid,
  Stack,
  Text,
} from "@chakra-ui/react";
import {colors} from "../theme/colors";
import { useParams } from "react-router";
import { useEffect, useState } from "react";
import axiosInstance from "../api/axiosInstance";
import {useNavigate, Link as RouterLink } from "react-router-dom";
import { toaster } from "../components/ui/toaster";
import { LuPencil, LuTrash2 } from "react-icons/lu";

function ExploreChallengeDetails() {
  const [challenge, setChallenge] = useState({});
  const [stats, setStats] = useState({});
  const [userProgress, setUserProgress] = useState(null);
  const { challengeId } = useParams();
  const [isCreator, setIsCreator] = useState(false);
const user = JSON.parse(localStorage.getItem("user"));
const currentUserId = user?.id;
const navigate = useNavigate();

const fetchChallengeDetails = async () => {
  try {
    const response = await axiosInstance.get(`/challenges/getChallengeById/${challengeId}`);
    setChallenge(response.data.challenge);
    setIsCreator(response.data.challenge.createdBy._id === currentUserId);
    setStats(response.data.stats);
    setUserProgress(response.data.userProgress);
  } catch (error) {
    toaster.create({
      title: "Error",
      description: error.response.data.message || "Failed to fetch challenge details.",
      type: "error"
    })
  }
};

 useEffect(() => {
    fetchChallengeDetails();
  }, [challengeId]);

  const handleJoin = async () => {
  try {
   await axiosInstance.post(`/challenges/joinChallenge/${challengeId}`);   
   fetchChallengeDetails();
   toaster.create({
    title: "Challenge joined.",
    description: "You have successfully joined the challenge.",
    type: "success"
   })
  } catch (error) {
    toaster.create({
      title: "Error",
      description: error.response.data.message || "Failed to join challenge.",
      type: "error"
    })
  }

};

const handleLeave = async () => {
  try {
   await axiosInstance.delete(`/challenges/leaveChallenge/${challengeId}`);   
   fetchChallengeDetails();
   toaster.create({
    title: "Challenge left.",
    description: "You have successfully left the challenge.",
    type: "success"
   })
  } catch (error) {
    toaster.create({
      title: "Error",
      description: error.response.data.message || "Failed to leave challenge.",
      type: "error"
    })
  }
};
const handleDelete = async () => {
    console.log("Delete clicked");

   const confirmed = window.confirm(
    "Are you sure you want to delete this challenge? This action cannot be undone."
  );

  if (!confirmed) return;
  try {
   await axiosInstance.delete(`/challenges/deleteChallenge/${challengeId}`);   
   navigate("/challenges");
   toaster.create({
    title: "Challenge deleted.",
    description: "You have successfully deleted the challenge.",
    type: "success"
   })
  } catch (error) {
     console.log(error);
  console.log(error.response);
    toaster.create({
      title: "Error",
      description: error.response.data.message || "Failed to delete challenge.",
      type: "error"
    })
  }
}

  return (
    <Box bg={colors.bg} color={colors.text} minH="100vh" py={10}>
      <Container maxW="7xl">

        {/* Header */}
        <Stack gap={4} mb={4}>
         <Flex
  justify="space-between"
  align={{ base: "start", md: "center" }}
  direction={{ base: "column", md: "row" }}
  gap={4}
  mb={10}
>
  <Heading
    size="2xl"
    color={colors.text}
    fontWeight="extrabold"
    lineHeight="1.2"
  >
    {challenge.title}
  </Heading>

  {isCreator && (
    <HStack spacing={3}>
     <Button
  as={RouterLink}
  to={`/updateChallenge/${challenge._id}`}
  bg={colors.primary}
  color="white"
  size="lg"
  borderRadius="xl"
  _hover={{
    bg: colors.primaryHover,
    transform: "translateY(-2px)",
  }}
>
  <HStack gap={2}>
    <LuPencil />
    <Text>Edit</Text>
  </HStack>
</Button>

      <Button
        bg="red.500"
        color="white"
        size="lg"
        borderRadius="xl"
        onClick={handleDelete}
        _hover={{
          bg: "red.600",
          transform: "translateY(-2px)",
        }}
      >
        <HStack gap={2}>
          <LuTrash2 />
          <Text>Delete</Text>
        </HStack>
      </Button>
    </HStack>
  )}
</Flex>
          <Flex gap={3} wrap="wrap">
            <Badge colorPalette="teal">
              {challenge.topic|| "No Topic" }
            </Badge>

            <Badge colorPalette="orange">
              {challenge.difficulty}
            </Badge>

            <Badge colorPalette="blue">
              {challenge.duration}
            </Badge>
          </Flex>

          <Text color="gray.600">
            {challenge.description}
          </Text>
        </Stack>

        {/* Stats + Progress */}
        <SimpleGrid columns={{ base: 1, md: 2 }} gap={6}>

          {/* Challenge Stats */}
          <Box
            bg="white"
            p={6}
            rounded="xl"
            shadow="sm"
          >
         <Heading size="md" mb={5} color="gray.800">
      📊 Challenge Status
    </Heading>

    <Stack gap={4}>

      <Flex justify="space-between" align="center">
        <Text color="gray.600">Participants</Text>
        <Text fontWeight="bold" color="gray.900">
          {stats.totalParticipants || 0}
        </Text>
      </Flex>

      <Flex justify="space-between" align="center">
        <Text color="gray.600">Completed Days</Text>
        <Text fontWeight="bold" color="green.600">
          {stats.completedDays || 0} days
        </Text>
      </Flex>

      <Flex justify="space-between" align="center">
        <Text color="gray.600">Remaining Days</Text>
        <Text fontWeight="bold" color="orange.600">
          {stats.remainingDays || 0} days
        </Text>
      </Flex>

      <Flex justify="space-between" align="center">
        <Text color="gray.600">Starting Date</Text>
        <Text fontWeight="bold" color="teal.600">
          {new Date(challenge.startDate).toLocaleDateString("en-GB", {
  year: "numeric",
  month: "long",
  day: "numeric",
}) || "Unknown"}
        </Text>
      </Flex>

      <Flex justify="space-between" align="center">
        <Text color="gray.600">Ending Date</Text>
        <Text fontWeight="bold" color="teal.600">
          {new Date(challenge.endDate).toLocaleDateString("en-GB", {
  year: "numeric",
  month: "long",
  day: "numeric",
}) || "Unknown"}
        </Text>
      </Flex>


      <Flex justify="space-between" align="center">
        <Text color="gray.600">Status</Text>

        <Badge
          colorPalette={
            stats.status === "completed"
              ? "green"
              : stats.status === "ongoing"
              ? "blue"
              : "gray"
          }
          px={3}
          py={1}
          rounded="full"
          textTransform="capitalize"
        >
          {stats.status || "unknown"}
        </Badge>
      </Flex>

    </Stack>
          </Box>

          {/* User Progress */}
          <Box
    bg="white"
    p={6}
    rounded="2xl"
    shadow="sm"
    borderWidth="1px"
    borderColor="gray.100"
  >
    <Heading size="md" mb={5} color="gray.800">
      📈 Your Progress
    </Heading>

    {userProgress?.isJoined ? (
  <Stack gap={5}>
    <Text color="gray.600">
      You have completed
      <Text as="span" fontWeight="bold" color="teal.600">
        {" "}{userProgress.totalCheckIns || 0}
      </Text>
      {" "}out of
      <Text as="span" fontWeight="bold">
        {" "}{challenge.duration || 0}
      </Text>
      {" "}days.
    </Text>

  

    <Text>
      📊 Progress:
      <Text as="span" fontWeight="bold">
        {" "}{userProgress.progressPercent || 0}%
      </Text>
    </Text>

    <Text>
      🎯 Status:
      <Text
        as="span"
        fontWeight="bold"
        color={userProgress.isCompleted ? "green.500" : "orange.500"}
      >
        {" "}
        {userProgress.isCompleted ? "Completed" : "In Progress"}
      </Text>
    </Text>
   {(stats.isCompleted || stats.progressPercent === 100) ? (
  <Box>
    <Button mt={4} w="full" disabled bg={colors.primary}>
      ✅ Challenge Completed
    </Button>
  </Box>
) : (
  <Box>
    <Button as={RouterLink} to={`/checkIns/${challenge._id}`} mt={4} w="full" bg={colors.primary} _hover={{ bg: colors.primaryHover }}>
      Continue Challenge
    </Button>
    <Button mt={2} variant="ghost" size="sm" colorPalette="red" onClick={handleLeave}>
      Leave Challenge
    </Button>
  </Box>
)}
  </Stack>
) : (
  <Box>
  <Text color="gray.500">
    You haven't joined this challenge yet.
  </Text>
  <Button
      mt={4}
      onClick={handleJoin}
      w="full"
      bg={colors.primary}
      _hover={{ bg: colors.primaryHover }}
    
    >
      Join Challenge
    </Button>
    </Box>
  
)}
            
          </Box>

        </SimpleGrid>
      </Container>
    </Box>
  );
}

export default ExploreChallengeDetails;