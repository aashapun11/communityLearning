import React from "react";
import {
  Box,
  Flex,
  Heading,
  Text,
  Input,
  Button,
  Image,
  VStack,
  Link,
  Carousel, IconButton
} from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";
import axiosInstance from "../api/axiosInstance";
import { LuArrowLeft, LuArrowRight } from "react-icons/lu"

function Register() {
  const [formData, setFormData] = React.useState({
    name: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const items = [
  {
    image: "/Learn.png",
  },
  {
    image: "/Share.png",
  },
  {
    image: "/Grow.png",
  }
];
  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };
  const submitHandler = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match.");
      return;
    }
    try {
      const { confirmPassword, ...userData } = formData;

    const result = await axiosInstance.post("/auth/register", userData);

      console.log(result.data);
    } catch (error) {
      console.error(error);
    }
  };

  const inputProps = {
    size: "lg",
    borderRadius: "12px",
    variant: "outline",
  };

  return (
    <Box minH="100vh" bg="gray.50">
      <Flex minH="100vh" direction={{ base: "column", lg: "row" }}>

        {/* Left Section */}
        <Box
    flex={1}
    bg="teal.50"
    display="flex"
    alignItems="center"
    justifyContent="center"
    p={10}
  >
        <Box
          flex={1}
          maxW="500px"
          textAlign="center"
          display="flex"
          flexDirection="column"
          alignItems="center"
          gap={6}
        >
          <Image
            src="./Logo.png"
            alt="Logo"
            boxSize="80px"
            borderRadius="full"
          />

          <Carousel.Root slideCount={items.length} maxW="xl" mx="auto" gap="4">
      <Carousel.Control justifyContent="center" gap="4" width="full">
        <Carousel.PrevTrigger asChild>
          <IconButton size="xs" variant="outline">
            <LuArrowLeft />
          </IconButton>
        </Carousel.PrevTrigger>

       <Carousel.ItemGroup width="full">
  {items.map(({ image }, index) => (
    <Carousel.Item key={index} index={index}>
      <Box
        w="100%"
        h="400px"
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <Image
          src={image}
          alt={`Slide ${index + 1}`}
          w="100%"
          h="100%"
          objectFit="contain"
        />
      </Box>
    </Carousel.Item>
  ))}
</Carousel.ItemGroup>

        <Carousel.NextTrigger asChild>
          <IconButton size="xs" variant="outline">
            <LuArrowRight />
          </IconButton>
        </Carousel.NextTrigger>
      </Carousel.Control>

      <Carousel.IndicatorGroup mt={4}>
  {items.map((_, index) => (
    <Carousel.Indicator
      key={index}
      index={index}
      bg="gray.300"
      _current={{
        bg: "gray.800",
      }}
    />
  ))}
</Carousel.IndicatorGroup>
    </Carousel.Root>

          <Heading color="#0F172A" size="lg">
            Learn. Share. Grow. Together.
          </Heading>

          <Text color="gray.600">
            Join our community learning platform and connect with amazing
            people. Start learning through challenges today.
          </Text>
        </Box>
          </Box>


        {/* Right Section */}
        <Box
    flex={1}
    display="flex"
    alignItems="center"
    justifyContent="center"
    p={10}
  >
        <Box w="100%" maxW="450px">
          <Box
            as="form"
            onSubmit={submitHandler}
            bg="white"
            p={10}
            rounded="2xl"
            shadow="xl"
          >
            <Heading color="#0F172A" size="xl" mb={2}>
              Create Your Account
            </Heading>

            <Text color="gray.600" mb={8}>
              Start your learning journey today.
            </Text>

            <VStack spacing={6} align="stretch">
              <Input
                {...inputProps}
                name="name"
                placeholder="Full Name"
                value={formData.name}
                onChange={handleChange}
                required
              />

              <Input
                {...inputProps}
                name="username"
                placeholder="Username"
                value={formData.username}
                onChange={handleChange}
                required
              />

              <Input
                {...inputProps}
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                required
              />

              <Input
                {...inputProps}
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                required
              />

              <Input
                {...inputProps}
                type="password"
                name="confirmPassword"
                placeholder="Confirm Password"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
              />

              <Button
                type="submit"
                size="lg"
                bg="#0F766E"
                color="white"
                _hover={{
                  bg: "#115E59",
                }}
              >
                Create Account
              </Button>

              <Text textAlign="center" fontSize="sm" color="gray.600">
                Already have an account?{" "}
                <Link
                  as={RouterLink}
                  to="/login"
                  color="teal.700"
                  fontWeight="semibold"
                >
                  Login
                </Link>
              </Text>
            </VStack>
          </Box>
        </Box>
        </Box>
      </Flex>
    </Box>
  );
}

export default Register;