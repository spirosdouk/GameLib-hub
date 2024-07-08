import { useEffect, useState } from "react";
import apiClient from "../services/api-client";
import {
  Box,
  SimpleGrid,
  Image,
  Text,
  useColorModeValue,
  Flex,
} from "@chakra-ui/react";
import PlatformIcons from "./PlatformIcons";

import { Game, GameGridProps } from "./GameTypes";

const GameGrid: React.FC<GameGridProps> = ({ games, error }) => {
  const bgColor = useColorModeValue("gray.100", "gray.800");
  const hoverBgColor = useColorModeValue("gray.300", "gray.700");

  return (
    <Box padding="4" bg={bgColor} maxWidth="1600px" mx="auto">
      {error ? (
        <Text fontSize="lg" color="red.500">
          {error}
        </Text>
      ) : (
        <SimpleGrid columns={{ sm: 2, md: 2, lg: 4 }} spacing={8}>
          {games.map((game) => (
            <Box
              key={game.id}
              p="4"
              shadow="xl"
              rounded="lg"
              borderWidth="1px"
              borderColor="black.200"
              bg={bgColor}
              _hover={{
                bg: hoverBgColor,
                transform: "scale(1.05)",
                transition: "all 0.3s ease-in-out",
              }}
              onClick={() => {
                console.log(game);
              }}
            >
              <Image
                src={game.background_image}
                alt={`Cover Image for ${game.name}`}
                borderRadius="md"
                objectFit="cover"
                height="250px"
              />
              <Flex align="center" justify="space-between" p="1">
                <PlatformIcons platforms={game.parent_platforms} />
                <Text fontSize="md" color="green.500">
                  {game.metacritic}%
                </Text>
              </Flex>
              <Flex align="end" mt="2">
                <Text
                  fontSize="lg"
                  fontWeight="bold"
                  lineHeight="tight"
                  isTruncated
                >
                  {game.name}
                </Text>
              </Flex>
            </Box>
          ))}
        </SimpleGrid>
      )}
    </Box>
  );
};

export default GameGrid;
