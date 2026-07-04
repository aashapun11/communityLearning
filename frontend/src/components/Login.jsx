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

import { toaster } from "../components/ui/toaster";
import {useNavigate, Link as RouterLink } from "react-router-dom";
import axiosInstance from "../api/axiosInstance";
import LeftSide from "./auth/LeftSide";
function Login() {
  const [formData, setFormData] = React.useState({
    emailOrUsername: "",
    password: "",
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
    try {
      const result = await axiosInstance.post("/auth/login", formData);
      localStorage.setItem("token", result.data.token);
      localStorage.setItem("user", JSON.stringify(result.data.user));

      toaster.create({
        title: "Login successful.",
        description: "Welcome back!",
        type: "success"
      });

      navigate("/dashboard");
      
    } catch (error) {
      toaster.create({
      title: "Login failed.",
      description: "Invalid email/username or password.",
      type: "error", 
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
              Login to Your Account
            </Heading>

            <VStack spacing={6} align="stretch">

              <Input
                {...inputProps}
                name="emailOrUsername"
                placeholder="Username/Email"
                value={formData.emailOrUsername}
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

              <Button
                type="submit"
                size="lg"
                bg="#0F766E"
                color="white"
                _hover={{
                  bg: "#115E59",
                }}
              >
                Login
              </Button>

              <Text textAlign="center" fontSize="sm" color="gray.600">
                Don't have an account?{" "}
                <Link
                  as={RouterLink}
                  to="/register"
                  color="teal.700"
                  fontWeight="semibold"
                >
                  Sign Up
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

export default Login;