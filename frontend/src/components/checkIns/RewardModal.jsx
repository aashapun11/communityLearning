import React from "react";
import {
  Dialog,
  Portal,
  Button,
  Text,
  VStack,
  HStack,
  Box,
  Badge,
} from "@chakra-ui/react";

import { FaCoins, FaFire, FaTrophy } from "react-icons/fa";


function RewardModal({
  open,
  onClose,
  rewards,
  streak,
  challengeId,
}) {

  return (
    <Dialog.Root
      open={open}
      onOpenChange={(e) => {
        if (!e.open) onClose();
      }}
      placement="center"
    >

      <Portal>

        <Dialog.Backdrop
          bg="blackAlpha.700"
          backdropFilter="blur(8px)"
        />


        <Dialog.Positioner>

          <Dialog.Content
            bg="gray.900"
            color="white"
            borderRadius="2xl"
            border="1px solid"
            borderColor="cyan.400"
            boxShadow="0 0 30px rgba(34,211,238,0.4)"
          >

            <Dialog.Header textAlign="center">
              🎉 Daily Check-in Completed!
            </Dialog.Header>



            <Dialog.Body>

              <VStack gap={5}>


                {/* Coins */}

                <Box
                  w="100%"
                  p={4}
                  borderRadius="xl"
                  bg="yellow.400"
                  color="black"
                >

                  <HStack justify="center">

                    <FaCoins size={24}/>

                    <Text
                      fontSize="2xl"
                      fontWeight="bold"
                    >
                      +{rewards?.totalCoinsEarned || 0} Coins
                    </Text>

                  </HStack>


                </Box>



                {/* Streak */}

                <Box
                  w="100%"
                  p={4}
                  borderRadius="xl"
                  bg="gray.800"
                >

                  <HStack justify="space-between">

                    <HStack>
                      <FaFire color="orange"/>
                      <Text>
                        Current Streak
                      </Text>
                    </HStack>


                    <Text fontWeight="bold">
                      {streak?.currentStreak || 0} Days
                    </Text>

                  </HStack>



                  <HStack
                    justify="space-between"
                    mt={3}
                  >

                    <HStack>
                      <FaTrophy color="gold"/>
                      <Text>
                        Longest Streak
                      </Text>
                    </HStack>


                    <Text fontWeight="bold">
                      {streak?.longestStreak || 0} Days
                    </Text>

                  </HStack>

                </Box>



                {/* Badges */}

                {
                  rewards?.badgesEarned?.length > 0 && (

                    <Box
                      w="100%"
                      p={4}
                      bg="purple.700"
                      borderRadius="xl"
                    >

                      <Text fontWeight="bold" mb={3}>
                        🏆 Badges Unlocked
                      </Text>


                      <HStack wrap="wrap">

                        {
                          rewards.badgesEarned.map(
                            (badge,index)=>(
                              <Badge
                                key={index}
                                p={2}
                              >
                                {badge}
                              </Badge>
                            )
                          )
                        }

                      </HStack>

                    </Box>

                  )
                }



              </VStack>

            </Dialog.Body>



            <Dialog.Footer>

              <Button
                width="100%"
                colorPalette="cyan"
                onClick={onClose}
              >
                Continue Learning 🚀
              </Button>

            </Dialog.Footer>


          </Dialog.Content>

        </Dialog.Positioner>


      </Portal>

    </Dialog.Root>
  );
}


export default RewardModal;