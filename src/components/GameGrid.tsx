import React from "react";
import {
  Box,
  SimpleGrid,
  Image,
  Text,
  useColorModeValue,
  Flex,
  Button,
} from "@chakra-ui/react";
import PlatformIcons from "./PlatformIcons";
import useGames from "../hooks/useGames";
import { Game } from "../types/GameTypes";
import { Genre } from "../types/GenreTypes";
import { Platform } from "../types/GameTypes";
import InfiniteScroll from "react-infinite-scroll-component";

interface GameGridProps {
  selectedGenre?: Genre | null;
  selectedPlatform?: Platform | null;
  selectedSort?: string;
  searchQuery?: string;
}

const GameGrid: React.FC<GameGridProps> = ({
  selectedGenre,
  selectedPlatform,
  selectedSort,
  searchQuery,
}) => {
  const { data, error, isLoading, fetchNextPage, hasNextPage } = useGames({
    genres: selectedGenre?.id,
    platforms: selectedPlatform?.id,
    ordering: selectedSort,
    search: searchQuery,
  });

  const bgColor = useColorModeValue("gray.100", "gray.800");
  const hoverBgColor = useColorModeValue("gray.300", "gray.700");

  if (isLoading) {
    return <Text>Loading...</Text>;
  }

  if (error) {
    return (
      <Text fontSize="lg" color="red.500">
        {(error as Error).message}
      </Text>
    );
  }

  const games = data?.pages.flatMap((page) => page.results) || [];

  return (
    <Box padding="4" bg={bgColor} maxWidth="1600px" mx="auto">
      <InfiniteScroll
        dataLength={games.length}
        next={fetchNextPage}
        hasMore={!!hasNextPage}
        loader={<Text>Loading more...</Text>}
        endMessage={<Text>No more games to load.</Text>}
      >
        <SimpleGrid columns={{ sm: 2, md: 2, lg: 4 }} spacing={8}>
          {games.map((game: Game) => (
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
                <PlatformIcons platforms={game.parent_platforms || []} />
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
      </InfiniteScroll>
    </Box>
  );
};

export default GameGrid;
