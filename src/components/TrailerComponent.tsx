import React from "react";
import {
  Box,
  Text,
  Image,
  Stack,
  Heading,
  useColorModeValue,
} from "@chakra-ui/react";
import useGameTrailers from "../hooks/useGameTrailers";
import { Trailer } from "../types/GameTailer";

interface TrailerComponentProps {
  gameId: number;
}

const TrailerComponent: React.FC<TrailerComponentProps> = ({ gameId }) => {
  const { data: trailers, error, isLoading } = useGameTrailers(gameId);
  const bgColor = useColorModeValue("gray.100", "gray.800");
  const textColor = useColorModeValue("gray.800", "whiteAlpha.900");

  if (isLoading) return <Text>Loading trailers...</Text>;
  if (error) {
    return (
      <Text fontSize="lg" color="red.500">
        {(error as Error).message}
      </Text>
    );
  }
  if (!trailers || trailers.length === 0) {
    return <Text>No trailers available for this game.</Text>;
  }

  return (
    <Box
      p="4"
      bg={bgColor}
      color={textColor}
      borderRadius="md"
      boxShadow="lg"
      mb="4"
    >
      <Heading as="h2" size="lg" mb="4">
        Game Trailers
      </Heading>
      <Stack spacing={4}>
        {trailers.map((trailer: Trailer) => (
          <Box key={trailer.id}>
            <Text fontWeight="bold" mb="2">
              {trailer.name}
            </Text>

            <Box as="video" controls width="100%" borderRadius="md">
              <source src={trailer.data.max} type="video/mp4" />
              Your browser does not support the video tag.
            </Box>
          </Box>
        ))}
      </Stack>
    </Box>
  );
};

export default TrailerComponent;
