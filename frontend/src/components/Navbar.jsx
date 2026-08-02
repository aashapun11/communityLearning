import React, { useState, useContext} from "react";
import {
  Box,
  Flex,
  HStack,
  Button,
  Text,
  Image,
  Link,
  Icon
} from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";
import { IconButton } from '@chakra-ui/react';
import { Spin as Hamburger } from 'hamburger-react';
import { AuthContext } from "../context/AuthContext";
import UserProfileMenu from "./UserProfileMenu";
import {colors} from '../theme/colors';
import {FaBell} from 'react-icons/fa';
function Navbar() {
  const [isOpen, setOpen] = useState(false);
  const { user, logout} = useContext(AuthContext);

  return (
    <Box
      as="nav"
      bg="#111827"
      shadow="sm"
      borderBottom="1px solid"
      borderColor={colors.border}
      boxShadow="0 6px 24px rgba(0,0,0,.18)"
      position="sticky"
      top="0"
      zIndex="1000"
    >
      <Flex
        maxW="100%"
        px={8}
        mx="auto"
        h="72px"
        align="center"
        justify="space-between"
      >
        {/* Logo */}
       <HStack gap={3}>
    <Image
        src="./Logo.png"
        boxSize="42px"
        rounded="full"
    />

    <Text
        fontWeight="800"
        fontSize="2xl"
        color={colors.primary}
        letterSpacing="tight"
    >
        LearnHub
    </Text>
</HStack>
        {/* Navigation in Desktop */}
        <HStack
          gap={8}
          display={{ base: "none", md: "flex" }}
        >

          {/* <Link
            as={RouterLink}
            to="/challengesCategory"
            color="white"
            _hover={{
              color: "#0F766E",
              textDecoration: "none",
            }}
          >
            Challenges
          </Link> */}

          <Link
            as={RouterLink}
            to="/about"
            color="white"
          align="center"
          gap={3}
          px={4}
          py={3}
          borderRadius="full"
          cursor="pointer"
          _hover={{
            bg: "gray.800",
          }}
          >
            About
          </Link>

          {user ? (
            <HStack gap={3}>
              <Link
            as={RouterLink}
            to="/notifications"
            color="white"

          align="center"
          gap={3}
          px={4}
          py={3}
          borderRadius="full"
          cursor="pointer"
          _hover={{
            bg: "gray.800",
          }}
          >
          <Icon as={FaBell} />
          </Link>

              <UserProfileMenu user={user} logout={logout} />
  
            </HStack>
          ) : (

        <HStack gap={3}>
          
          <Button
            as={RouterLink}
            to="/login"
            color="white"
            bg={colors.primary}
          _hover={{
            bg: colors.primaryHover  
          }}
          align="center"
          gap={3}
          px={4}
          py={3}
          borderRadius="full"
          cursor="pointer"
          
          >
            Login
          </Button>

          <Button
            as={RouterLink}
            to="/register"
            color="white"
          bg={colors.primary}
          _hover={{
            bg: colors.primaryHover  
          }}
          align="center"
          gap={3}
          px={4}
          py={3}
          borderRadius="full"
          cursor="pointer"
          
          >
            Register
          </Button>
        </HStack>
          )}
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
    bg="gray.950"
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
        to="/about"
       color="white"
          align="center"
          gap={3}
          px={4}
          py={3}
          borderRadius="full"
          cursor="pointer"
          _hover={{
            bg: "gray.800",
          }}
        onClick={() => setOpen(false)}
      >
        About
      </Link>

      {user ? (
        <>
              <Link
            as={RouterLink}
            to="/notifications"
            color="white"
          align="center"
          gap={3}
          px={4}
          py={3}
          borderRadius="full"
          cursor="pointer"
          _hover={{
            bg: "gray.800",
          }}
          >
          <Icon as={FaBell} />
          </Link>

              <UserProfileMenu user={user} logout={logout} />
              </>
          ) : (
        <>

      <Button
        as={RouterLink}
        to="/login"
        color="white"
        bg={colors.primary}
          _hover={{
            bg: colors.primaryHover  
          }}

          align="center"
          gap={3}
          px={4}
          py={3}
          borderRadius="full"
          cursor="pointer"
         
        onClick={() => setOpen(false)}
      >
        Login
      </Button>

      <Button
        as={RouterLink}
        to="/register"
        color="white"
        bg={colors.primary}
          _hover={{
            bg: colors.primaryHover  
          }}

          align="center"
          gap={3}
          px={4}
          py={3}
          borderRadius="full"
          cursor="pointer"
        onClick={() => setOpen(false)}
      >
        Register
      </Button>
        </>
      )}
    </Flex>
  </Box>
)}
    </Box>
  );
}

export default Navbar;

