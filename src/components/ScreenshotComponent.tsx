import React from "react";
import {
  Box,
  Text,
  Image,
  Stack,
  Heading,
  useColorModeValue,
  SimpleGrid,
} from "@chakra-ui/react";
import useGameScreenshots from "../hooks/useScreenshots";
import { Screenshots } from "../types/Screenshots";

interface ScreenshotComponentProps {
  gameId: number;
}

const TrailerComponent: React.FC<ScreenshotComponentProps> = ({ gameId }) => {
  const { data: screenshots, error, isLoading } = useGameScreenshots(gameId);
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

  if (!screenshots || screenshots.length === 0) {
    return <Text>No screenshots available for this game.</Text>;
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
        Game Screenshots
      </Heading>
      <Stack spacing={4}>
        <SimpleGrid columns={[1, 2]} spacing={4}>
          {screenshots.map((screenshot: Screenshots) => (
            <Box key={screenshot.id}>
              <Image
                src={screenshot.image}
                alt={`Screenshot ${screenshot.id}`}
                borderRadius="md"
                mb="2"
              />
            </Box>
          ))}
        </SimpleGrid>
      </Stack>
    </Box>
  );
};

export default TrailerComponent;
