import React from 'react'
import { Box,Image, Carousel, IconButton, Heading, Text} from "@chakra-ui/react";
import { LuArrowLeft, LuArrowRight } from "react-icons/lu"

function LeftSide() {
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
  return (
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
  )
}

export default LeftSide
