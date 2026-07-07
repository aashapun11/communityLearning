import React, { useState } from "react";
import {
  Box,
  Flex,
  HStack,
  Button,
  Text,
  Image,
  Link,
} from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";
import { IconButton } from '@chakra-ui/react';
import { Spin as Hamburger } from 'hamburger-react';

function Navbar() {
  const [isOpen, setOpen] = useState(false);

  return (
    <Box
      as="nav"
      bg="white"
      shadow="sm"
      borderBottom="1px"
      borderColor="gray.200"
      position="sticky"
      top="0"
      zIndex="1000"
    >
      <Flex
        maxW="1200px"
        mx="auto"
        h="72px"
        px={{ base: 6, md: 8 }}
        align="center"
        justify="space-between"
      >
        {/* Logo */}
        <HStack gap={3}
          display={{ base: "none", md: "flex" }}
        >
          <Image
            src="./Logo.png"
            alt="Logo"
            boxSize="45px"
            borderRadius="full"
          />
          <Text
            fontSize="xl"
            fontWeight="bold"
            color="#0F766E"
          >
            LearnHub
          </Text>
        </HStack>

        {/* Navigation in Desktop */}
        <HStack
          gap={8}
          display={{ base: "none", md: "flex" }}
        >
          <Link
            as={RouterLink}
            to="/"
            color="gray.700"
            _hover={{
              color: "#0F766E",
              textDecoration: "none",
            }}
          >
            Home
          </Link>

          <Link
            as={RouterLink}
            to="/challenges"
            color="gray.700"
            _hover={{
              color: "#0F766E",
              textDecoration: "none",
            }}
          >
            Challenges
          </Link>

          <Link
            as={RouterLink}
            to="/about"
            color="gray.700"
            _hover={{
              color: "#0F766E",
              textDecoration: "none",
            }}
          >
            About
          </Link>

        {/* Guest Buttons */}
        <HStack gap={3}>
          <Button
            as={RouterLink}
            to="/login"
            variant="ghost"
            color="#0F766E"
            _hover={{
              bg: "teal.50",
            }}
          >
            Login
          </Button>

          <Button
            as={RouterLink}
            to="/register"
            bg="#0F766E"
            color="white"
            _hover={{
              bg: "#115E59",
            }}
          >
            Register
          </Button>
        </HStack>
        </HStack>
      </Flex>

        
        {/* Hamburger Menu for Mobile */}
     <Flex
  w="100%"
  align="center"
  justify="space-between"
  display={{ base: "flex", md: "none" }}
>
  <Image
    src="./Logo.png"
    alt="Logo"
    boxSize="45px"
    borderRadius="full"
  />

  {/* Hamburger */}
  <IconButton
    variant="ghost"
    display={{ base: "flex", md: "none" }}
    onClick={() => setOpen(!isOpen)}
  >
    <Hamburger toggled={isOpen} toggle={setOpen} />
  </IconButton>
</Flex>

        {/* Mobile Menu */}
{isOpen && (
  <Box
    display={{ base: "block", md: "none" }}
    bg="white"
    borderTop="1px"
    borderColor="gray.200"
    shadow="md"
    px={6}
    py={6}
  >
    <Flex direction="column" gap={5} align="center">
   {/* Logo */}
      <Link
        as={RouterLink}
        to="/challenges"
        color="gray.700"
        fontWeight="medium"
        onClick={() => setOpen(false)}
      >
        Challenges
      </Link>

      <Link
        as={RouterLink}
        to="/about"
        color="gray.700"
        fontWeight="medium"
        onClick={() => setOpen(false)}
      >
        About
      </Link>

      <Button
        as={RouterLink}
        to="/login"
        variant="ghost"
        color="#0F766E"
        w="100%"
        onClick={() => setOpen(false)}
      >
        Login
      </Button>

      <Button
        as={RouterLink}
        to="/register"
        bg="#0F766E"
        color="white"
        w="100%"
        _hover={{ bg: "#115E59" }}
        onClick={() => setOpen(false)}
      >
        Register
      </Button>
    </Flex>
  </Box>
)}
    </Box>
  );
}

export default Navbar;