import React from "react";
import {
  SimpleGrid,
} from "@chakra-ui/react";

import ChallengeCard from "./ChallengeCard/ChallengeCard";

function ChallengeGrid({ challenges }) {
  return (
    <SimpleGrid
      columns={{
        base: 1,
        md: 2 }}
      gap={6}
    >
      {challenges.map((challenge) => (
        <ChallengeCard
          key={challenge._id}
          challenge={challenge}
        />
      ))}
    </SimpleGrid>
  );
}

export default ChallengeGrid;