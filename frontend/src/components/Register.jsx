import React from "react";
import {
  Box,
  Flex,
  Heading,
  Text,
  Input,
  Button,
  VStack,
  Link
} from "@chakra-ui/react";
import { useNavigate, Link as RouterLink } from "react-router-dom";
import axiosInstance from "../api/axiosInstance";
import LeftSide from "./auth/LeftSide";
import { toaster } from "./ui/toaster";
function Register() {
  const [formData, setFormData] = React.useState({
    name: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const navigate = useNavigate();
  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };
  const submitHandler = async (e) => {
    e.preventDefault();

    if (!formData.name || !formData.username || !formData.email || !formData.password || !formData.confirmPassword) {
      toaster.create({
        title: "Registration failed.",
        description: "Please fill in all fields.",
        type: "error"
      });
      return;
    }

    if (formData.password !== formData.confirmPassword) {
        toaster.create({
          title: "Registration failed.",
          description: "Passwords do not match.",
          type: "error"
        });
      return;
    }
    try {
      const { confirmPassword, ...userData } = formData;

     await axiosInstance.post("/auth/register", userData);
     toaster.create({
       title: "Registration successful.",
       description: "You can now log in.",
       type: "success"
     });
     navigate("/login");

    } catch (error) {
      console.error("Registration error:", error);
      toaster.create({
        title: "Registration failed.",
        description: error.response?.data?.message || "An error occurred during registration.",
        type: "error"
      });
    }
  };

  const inputProps = {
    size: "lg",
    borderRadius: "12px",
    variant: "outline",
    color: "gray.800",
    _placeholder: { color: "gray.400" }
  };

  return (
    <Box minH="100vh" bg="gray.50">
      <Flex minH="100vh" direction={{ base: "column", lg: "row" }}>

        {/* Left Section */}
        
<LeftSide />

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