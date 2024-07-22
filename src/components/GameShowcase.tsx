import React from "react";
import {
  Box,
  Text,
  Heading,
  Badge,
  Flex,
  useColorModeValue,
} from "@chakra-ui/react";
import { Game } from "../types/GameTypes";

interface GameShowcaseProps {
  game: Game;
}

const GameShowcase: React.FC<GameShowcaseProps> = ({ game }) => {
  const bgColor = useColorModeValue("gray.100", "gray.800");
  const textColor = useColorModeValue("gray.800", "whiteAlpha.900");

  return (
    <Box
      p="4"
      bg={bgColor}
      color={textColor}
      borderRadius="md"
      boxShadow="lg"
      mb="4"
    >
      <Flex mb="4" align="center" justifyContent="space-around">
        <Flex wrap="wrap">
          <Text fontWeight="bold" mr="2">
            Metacritic:
          </Text>
          <Badge colorScheme="red" fontSize="1.2em" mr="4">
            {game.metacritic}
          </Badge>
          <Text fontWeight="bold" mr="2">
            Publishers:
          </Text>
          {game.publishers.map((publisher) => (
            <Badge key={publisher.id} colorScheme="teal" mr="2" mb="2">
              {publisher.name}
            </Badge>
          ))}
        </Flex>
      </Flex>

      <Flex mb="4" align="center" justifyContent="space-around">
        <Flex wrap="wrap">
          <Text fontWeight="bold" mr="2">
            Rating:
          </Text>
          <Badge colorScheme="blue" fontSize="1.2em" mr="4">
            {game.rating_top}
          </Badge>
          <Text fontWeight="bold" mr="2">
            Publishers:
          </Text>
          {game.genres.map((genre) => (
            <Badge key={genre.id} colorScheme="yellow" mr="2" mb="2">
              {genre.name}
            </Badge>
          ))}
        </Flex>
      </Flex>
    </Box>
  );
};

export default GameShowcase;
