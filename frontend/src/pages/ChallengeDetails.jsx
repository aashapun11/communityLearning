

import React , { useState, useEffect } from "react";
import {
  Box,
  Button,
  Flex,
  Grid,
  GridItem,
  HStack,
  Progress,
  Separator,
  SimpleGrid,
  Text,
  VStack,
} from "@chakra-ui/react";

import {
  FaArrowLeft,
  FaFire,
  FaCoins,
  FaCheckCircle,
  FaCalendarAlt,
  FaUsers,
  FaTrophy,
  FaMedal,
  FaClock,
  FaBookOpen,
} from "react-icons/fa";

import { useNavigate } from "react-router-dom";
import { colors } from "../theme/colors";
import { useParams } from "react-router-dom";
import axiosInstance from "../api/axiosInstance";

// const challenge = {
//   title: "30 Days of C++",
//   topic: "C++",
//   difficulty: "beginner",
//   duration: 30,

//   description:
//     "Build a strong foundation in C++ through daily practice, problem solving, and hands-on coding challenges.",

//   status: "Active",
//   membersCount: 1250,

//   startDate: "2026 Aug 01",
//   endDate: "2026 Aug 30",

//   completedDays: 2,
//   currentStreak: 1,
//   longestStreak: 2,
//   coins: 82,
//   lastCheckIn: "2026 Aug 09",

//   creator: "Alex Johnson",

  
// };

  const leaderboard = [
    { rank: 1, name: "Sarah Lee", days: 28 },
    { rank: 2, name: "John Smith", days: 26 },
    { rank: 3, name: "David Kim", days: 24 },
    { rank: 24, name: "You", days: 20 },
  ]

  const checkIns = [
    { day: 1, date: "2026 Aug 08", status: "Completed" },
    { day: 2, date: "2026 Aug 09", status: "Completed" },
    { day: 3, date: "-", status: "Pending" },
  ]

function ChallengeDetails() {

  const navigate = useNavigate();
  const { challengeId } = useParams();
  const [challenge, setChallenge] = useState(null);
  const [userProgress, setUserProgress] = useState(null);

  useEffect(() => {
    const fetchChallenge = async () => {
      try {
        const response = await axiosInstance.get(`/challenges/getChallengeDetails/${challengeId}`);
       setChallenge(response.data.challenge);
       console.log("Challenge Details:", response.data.challenge);
      setUserProgress(response.data.userProgress);
        
      } catch (error) {
        console.error(error);
      }
    };
    fetchChallenge();
  }, [challengeId]);

   if (!challenge) {
    return <Text>Loading...</Text>;
  }

  return (
    <Box
      minH="100vh"
      bg={colors.background}
      color={colors.text}
      px={{ base: 4, md: 8 }}
      py={6}
    >
      {/* BACK BUTTON */}

      <Button
        variant="ghost"
        leftIcon={<FaArrowLeft />}
        color={colors.secondaryText}
        mb={5}
        onClick={() => navigate(-1)}
        _hover={{
          bg: "white",
          color: colors.primary,
        }}
      >
        Back
      </Button>

      {/* HEADER */}

      <Box
        bg={colors.card}
        border="1px solid"
        borderColor={colors.border}
        borderLeft="5px solid"
        borderLeftColor={colors.primary}
        borderRadius="xl"
        p={{ base: 5, md: 7 }}
        shadow="sm"
      >
        <Flex
          justify="space-between"
          align={{ base: "flex-start", md: "center" }}
          direction={{ base: "column", md: "row" }}
          gap={5}
        >
          <Box>
            <HStack mb={3} gap={1}>
              <FaBookOpen color={colors.primary} />

              <Text
                fontSize="sm"
                fontWeight="600"
                color={colors.primary}
              >
                {challenge.topic}
              </Text>
            </HStack>

            <Text
              fontSize={{ base: "2xl", md: "3xl" }}
              fontWeight="800"
              color={colors.text}
            >
              {challenge.title}
            </Text>

            <Text
              mt={3}
              maxW="700px"
              color={colors.secondaryText}
              lineHeight="1.7"
            >
              {challenge.description}
            </Text>
          </Box>

          <Box
            px={4}
            py={2}
            fontSize="sm"
            borderRadius="full"
            bg="green.50"
            color="green.700"
            fontWeight="700"
            border="1px solid"
            borderColor="green.200"
          >
            {challenge.status}
          </Box>
        </Flex>

        <Separator my={6} />

        <Flex
          gap={6}
          flexWrap="wrap"
          color={colors.secondaryText}
        >
          <HStack>
            <FaClock />
            <Text>
              {challenge.duration} Days
            </Text>
          </HStack>

          <HStack>
            <FaUsers />
            <Text>
              {challenge.participantsCount} Learners

            </Text>
          </HStack>

          <HStack>
            <FaCalendarAlt />
            <Text>
              {challenge.startDate.split("T")[0]} → {challenge.endDate.split("T")[0]}
            </Text>
          </HStack>

          <Text>
            Created by <strong>{challenge.createdBy.name}</strong>
          </Text>
        </Flex>
      </Box>

      {/* MAIN CONTENT */}

      <Grid
        templateColumns={{
          base: "1fr",
          lg: "2fr 1fr",
        }}
        gap={6}
        mt={6}
      >
        {/* LEFT COLUMN */}

        <GridItem>
          {/* MY PROGRESS */}

          <Box
            bg={colors.card}
            border="1px solid"
            borderColor={colors.border}
            borderRadius="xl"
            p={6}
            shadow="sm"
          >
            <Text
              fontSize="xl"
              fontWeight="700"
              mb={5}
              color={colors.text}
            >
              📊 My Progress
            </Text>

            <SimpleGrid
              columns={{ base: 2, md: 4 }}
              gap={2}
            >
              <StatCard
                icon={<FaFire color="#EA580C" />}
                label="Current Streak"
                value={`${userProgress.currentStreak} Days`}
              />

              <StatCard
                icon={<FaFire color="#DC2626" />}
                label="Longest Streak"
                value={`${userProgress.longestStreak} Days`}
              />

              <StatCard
                icon={<FaCoins color="#EAB308" />}
                label="Coins"
                value={userProgress.coins}
              />

              <StatCard
                icon={<FaCheckCircle color="#16A34A" />}
                label="Check-ins"
                value={`${challenge.completedDays}/${challenge.duration}`}
              />
            </SimpleGrid>
          </Box>

          {/* CHECK-IN HISTORY */}

          <Box
            mt={6}
            bg={colors.card}
            border="1px solid"
            borderColor={colors.border}
            borderRadius="xl"
            p={6}
            shadow="sm"
          >
            <Text
              fontSize="xl"
              fontWeight="700"
              mb={5}
            >
              📅 Check-in History
            </Text>

      <VStack align="stretch" gap={0}>
  {challenge.checkIns.length === 0 ? (
    <>
    <Button
            mt={6}
            width="full"
            size="lg"
            bg={colors.primary}
            color="white"
            _hover={{
              bg: colors.primaryHover,
            }}
            onClick={() =>
              navigate(
                `/checkIns/${challenge._id}`
              )
            }
          >
            Today's Check-in →
          </Button>
    <Text
      fontSize="sm"
      color={colors.secondaryText}
      textAlign="center"
      py={4}
    >
      No CheckIns yet. Start your streak today!
    </Text>
    </>
  ) : (
    <>
      {challenge.checkIns.slice(0, 3).map((checkIn) => (
        <Flex
          key={checkIn._id}
          justify="space-between"
          align="center"
          py={4}
          borderBottom="1px solid"
          borderColor={colors.border}
        >
          <HStack gap={4}>
            <Box
              w="34px"
              h="34px"
              borderRadius="full"
              display="flex"
              alignItems="center"
              justifyContent="center"
              bg="green.50"
              color="green.600"
              fontWeight="700"
            >
              ✓
            </Box>

            <Box>
              <Text fontWeight="600">
                Day {checkIn.day}
              </Text>

              <Text
                fontSize="sm"
                color={colors.secondaryText}
              >
                {new Date(checkIn.date).toLocaleDateString(
                  "en-US",
                  {
                    year: "numeric",
                    month: "short",
                    day: "2-digit",
                  }
                )}
              </Text>
            </Box>
          </HStack>

          <Text
            fontSize="sm"
            fontWeight="600"
            color="green.600"
          >
            Completed
          </Text>
        </Flex>
      ))}

      {challenge.checkIns.length > 3 && (
        <Button    
          color={colors.primary}
          mt={3}
          width="100%"
        >
          View More...
        </Button>
      )}
    </>
  )}
</VStack>

          </Box>
        </GridItem>

        {/* RIGHT COLUMN */}

        <GridItem>
          {/* LEADERBOARD */}

          <Box
            bg={colors.card}
            border="1px solid"
            borderColor={colors.border}
            borderRadius="xl"
            p={4}
            shadow="sm"
          >
            <Flex
              justify="space-between"
              align="center"
              mb={5}
            >
              <HStack>
                <FaTrophy color="#EAB308" />

                <Text
                  fontSize="lg"
                  fontWeight="700"
                >
                  Challenge Leaderboard
                </Text>
              </HStack>
            </Flex>

            <VStack
              align="stretch"
              gap={2}
            >
              {leaderboard.map((user) => (
                <Flex
                  key={`${user.rank}-${user.name}`}
                  justify="space-between"
                  align="center"
                  px={3}
                  py={3}
                  borderRadius="lg"
                  bg={
                    user.name === "You"
                      ? `${colors.primary}12`
                      : "transparent"
                  }
                >
                  <HStack>
                    <Text
                      w="50px"
                      minW="50px"
                      fontWeight="700"
                      color={colors.secondaryText}
                    >
                      #{user.rank}
                    </Text>

                    <Text
                      fontWeight={
                        user.name === "You"
                          ? "700"
                          : "500"
                      }
                    >
                      {user.name}
                    </Text>
                  </HStack>

                  <Text
                    fontWeight="600"
                    color={colors.primary}
                  >
                    {user.days} days
                  </Text>
                </Flex>
              ))}
            </VStack>

            <Button
              mt={5}
              width="full"
              variant="outline"
              borderColor={colors.primary}
              color={colors.primary}
              _hover={{
                bg: colors.primary,
                color: "white",
              }}
            >
              View Full Leaderboard
            </Button>
          </Box>

          {/* REWARDS */}

          <Box
            mt={6}
            bg={colors.card}
            border="1px solid"
            borderColor={colors.border}
            borderRadius="xl"
            p={6}
            shadow="sm"
          >
            <HStack mb={5}>
              <FaMedal color="#EAB308" />

              <Text
                fontSize="lg"
                fontWeight="700"
              >
                Challenge Rewards
              </Text>
            </HStack>

            <VStack
              align="stretch"
              gap={4}
            >
              <RewardRow
                title="7-Day Streak"
                reward="🔥 On Fire Badge"
                unlocked={false}
              />

              <RewardRow
                title="14-Day Streak"
                reward="🏆 Consistent Learner"
                unlocked={false}
              />

              <RewardRow
                title="30-Day Completion"
                reward="🎓 Challenge Master"
                unlocked={false}
              />
            </VStack>
          </Box>

          {/* ACTION */}

          <Button
            mt={6}
            width="full"
            size="lg"
            bg={colors.primary}
            color="white"
            _hover={{
              bg: colors.primaryHover,
            }}
            onClick={() =>
              navigate(
                `/checkIns/${challenge._id}`
              )
            }
          >
            Today's Check-in →
          </Button>
        </GridItem>
      </Grid>
    </Box>
  );
}

/* -------------------------
   STAT CARD
------------------------- */

function StatCard({
  icon,
  label,
  value,
}) {
  return (
    <Box
      p={4}
      border="1px solid"
      borderColor={colors.border}
      borderRadius="lg"
    >
      <HStack mb={2} gap={2}>
        {icon}

        <Text
          fontSize="sm"
          color={colors.secondaryText}
        >
          {label}
        </Text>
      </HStack>

      <Text
        fontSize="xl"
        fontWeight="800"
        color={colors.text}
      >
        {value}
      </Text>
    </Box>
  );
}

/* -------------------------
   REWARD ROW
------------------------- */

function RewardRow({
  title,
  reward,
  unlocked,
}) {
  return (
    <Flex
      justify="space-between"
      align="center"
      p={3}
      borderRadius="lg"
      bg="gray.50"
    >
      <Box>
        <Text
          fontSize="sm"
          fontWeight="600"
        >
          {title}
        </Text>

        <Text
          fontSize="xs"
          color={colors.secondaryText}
          mt={1}
        >
          {reward}
        </Text>
      </Box>

      <Text
        fontSize="xs"
        fontWeight="700"
        color={
          unlocked
            ? "green.600"
            : colors.secondaryText
        }
      >
        {unlocked ? "Unlocked" : "Locked"}
      </Text>
    </Flex>
  );
}

export default ChallengeDetails;