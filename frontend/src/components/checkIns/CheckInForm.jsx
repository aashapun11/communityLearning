import { useState, useEffect } from "react";
import {
  Box,
  Button,
  Card,
  Field,
  Heading,
  Input,
  Text,
  Textarea,
  VStack,
  HStack,
  Badge,
} from "@chakra-ui/react";
import { colors } from "../../theme/colors";
import { useParams } from "react-router-dom";
import axiosInstance from "../../api/axiosInstance"
import RewardModal from "./RewardModal";
import { toaster } from "../../components/ui/toaster";

function CheckInForm() {

  const [formData, setFormData] = useState({
    note: "",
    mediaUrl: "",
  });
  const [challenge, setChallenge] = useState({});
  const [showRewardModal, setShowRewardModal] = useState(false);
  const [stats, setStats] = useState({});
  const [rewards, setRewards] = useState(null);
const [streak, setStreak] = useState(null);
  const { challengeId } = useParams();

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try{
      const response = await axiosInstance.post(`/checkins/createCheckIn/${challengeId}`, formData);

      setRewards(response.data.rewards);
      setStreak(response.data.streak);
      setShowRewardModal(true);

    } catch (error) {
     toaster.create({
      title: "Error",
      description: error.response.data.message || "Failed to create check-in.",
      type: "error"
     })
}};

  useEffect(() => {
  async function fetchChallenge() {
    const response = await axiosInstance.get(
      `/challenges/getChallengeById/${challengeId}`
    );

    setChallenge(response.data.challenge);
    setStats(response.data.stats);
  }

  fetchChallenge();
}, [challengeId]);

  return (
    <Card.Root
      maxW="3xl"
      mx="auto"
      bg={colors.card}
      borderRadius="2xl"
      border="1px solid"
      borderColor={colors.border}
      boxShadow="xl"
      overflow="hidden"
      mt={12}
    >
      <Card.Body p={8}>
        <VStack align="stretch" gap={6}>

          {/* Header */}

          <Box>
            <Badge
              bg={colors.primary}
              color="white"
              px={3}
              py={1}
              borderRadius="full"
              mb={3}
            >
              🔥 Daily Check-in
            </Badge>

            <Heading
              size="xl"
              color={colors.text}
              mb={2}
            >
              {challenge?.title}
            </Heading>

            <HStack color="gray.500">
              <Text>
                Day <span style={{ fontWeight: "bold" }}>{stats?.completedDays}</span>  of {challenge?.duration}
              </Text>

              <Text>
                Keep your streak alive!
              </Text>
            </HStack>
          </Box>

          {/* Notes */}

          <Field.Root required>
            <Field.Label color={colors.text}>
              📝 What did you accomplish today?
            </Field.Label>

            <Textarea
              name="note"
              rows={7}
              resize="vertical"
              value={formData.note}
                          color={colors.text}

              onChange={handleChange}
              placeholder="Share what you learned, built, solved or improved today..."
              bg={colors.background}
               _focus={{
            borderColor: colors.primary,
            boxShadow: `0 0 0 1px ${colors.primary}`,
            }}
            />

           
          </Field.Root>

          {/* Media URL */}

          <Field.Root>
            <Field.Label color={colors.text}>
              🔗 Media URL (Optional)
            </Field.Label>

            <Input
            color={colors.text}
              name="mediaUrl"
              value={formData.mediaUrl}
              onChange={handleChange}
              placeholder="GitHub commit,Screenshot, Live Demo, Blog or YouTube "
              bg={colors.background}
               _focus={{
            borderColor: colors.primary,
            boxShadow: `0 0 0 1px ${colors.primary}`,
            }}
            />

         
          </Field.Root>

         

          <Button
            size="lg"
            bg={colors.primary}
            color="white"
            _hover={{
              bg: colors.primaryHover,
              transform: "translateY(-2px)",
            }}
            onClick={handleSubmit}
          >
            ✨ Submit Check-in
          </Button>

        </VStack>
        <RewardModal
        open={showRewardModal}
        onClose={() => setShowRewardModal(false)}
        rewards={rewards}
        streak={streak}
        challengeId={challengeId}
      />
      </Card.Body>
    </Card.Root>
  );
}

export default CheckInForm;