import {
  Box,
    Flex,
Text,
  Button,
  Container,
  Field,
  Heading,
  Input,
  NativeSelect,
  Stack,
  Switch,
  Textarea,
} from "@chakra-ui/react";
import { useState, useRef } from "react";
import { useNavigate } from "react-router";
import axiosInstance from "../api/axiosInstance";
import { colors } from "../theme/colors";
import { toaster } from "../components/ui/toaster";

function CreateChallenge() {
  const navigate = useNavigate();
  const inputRef = useRef(null);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    topic: "",
    difficulty: "",
    duration: "",
    startDate: "",
    isPublic: true,
  });

  const [loading, setLoading] = useState(false);

  function handleChange(e) {
    const { name, value, type, checked } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  }

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      setLoading(true);

      const response = await axiosInstance.post("/challenges/createChallenge",
        formData
      );

      console.log("Challenge created:", response.data.challenge);

      toaster.create({
        title: "Challenge created.",
        description: "Challenge created successfully.",
        type: "success"
      });
 
      navigate(`/challenges/${response.data.challenge._id}`);
    } catch (error) {
      toaster.create({
        title: "Error",
        description: error.response.data.message || "Failed to create challenge.",
        type: "error"
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <Box bg={colors.bg} minH="100vh" py={10}>
      <Container maxW="2xl">

        <Box
          bg={colors.card}
          p={8}
          rounded="xl"
          shadow="md"
        >
          <Heading mb={8} color={colors.text}>
            Create Challenge
          </Heading>

          <form onSubmit={handleSubmit}>

            <Stack gap={5}>

              <Field.Root color={colors.text} required>
                <Field.Label>Title</Field.Label>

                <Input
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  placeholder="60 Days of React"
                />
              </Field.Root>

              <Field.Root color={colors.text} required>
                <Field.Label>Description</Field.Label>

                <Textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Describe your challenge..."
                />
              </Field.Root>

              <Field.Root color={colors.text} required>
                <Field.Label>Topic</Field.Label>

                <NativeSelect.Root>
                  <NativeSelect.Field
                    name="topic"
                    value={formData.topic}
                    onChange={handleChange}
                  >
                    <option value="">Select Topic</option>
                    <option value="javascript">javascript</option>
                    <option value="databases">databases</option>
                    <option value="fullstack">Full Stack</option>
                    <option value="dsa">DSA</option>
                  </NativeSelect.Field>
                </NativeSelect.Root>
              </Field.Root>

              <Field.Root color={colors.text} required>
                <Field.Label>Difficulty</Field.Label>

                <NativeSelect.Root>
                  <NativeSelect.Field
                    name="difficulty"
                    value={formData.difficulty}
                    onChange={handleChange}
                  >
                    <option value="">Select Difficulty</option>
                    <option value="beginner">Beginner</option>
                    <option value="intermediate">Intermediate</option>
                    <option value="advanced">Advanced</option>
                  </NativeSelect.Field>
                </NativeSelect.Root>
              </Field.Root>

              <Field.Root color={colors.text} required>
                <Field.Label>Duration (Days)</Field.Label>

                <Input
                  type="number"
                  name="duration"
                  placeholder="30"
                  value={formData.duration}
                  onChange={handleChange}
                  min={1}
                />
              </Field.Root>

              <Field.Root color={colors.text} required>
                <Field.Label>Start Date</Field.Label>

                <Input
                  type="date"
                  name="startDate"
                  value={formData.startDate}
                  onChange={handleChange}
                   bg="white"
                    color={colors.text}
                    css={{
                        colorScheme: "light",
                    }}
                  
               />
              </Field.Root>

            <Field.Root color={colors.text} required>
            <Field.Label >Visibility</Field.Label>

            <Flex
                align="center"
                justify="space-between"
                w="full"
                mt={2}
            >
                <Flex align="center" gap={3}>
                <Switch.Root
                    checked={formData.isPublic}
                    onCheckedChange={(e) =>
                    setFormData((prev) => ({
                        ...prev,
                        isPublic: e.checked,
                    }))
                    }
                >
                    <Switch.HiddenInput />

                    <Switch.Control
                    w="40px"
                    h="20px"
                    bg={formData.isPublic ? colors.primary : "gray.300"}
                    >
                    <Switch.Thumb />
                    </Switch.Control>
                </Switch.Root>

                <Text fontWeight="medium">
                    {formData.isPublic ? "Public Challenge" : "Private Challenge"}
                </Text>
                </Flex>
            </Flex>
            </Field.Root>

              <Button
                type="submit"
                loading={loading}
                bg={colors.primary}
                color="white"
                _hover={{
                  bg: colors.primaryHover,
                }}
              >
                Create Challenge
              </Button>

            </Stack>

          </form>
        </Box>

      </Container>
    </Box>
  );
}

export default CreateChallenge;