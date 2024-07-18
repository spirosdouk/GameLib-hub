import React from "react";
import {
  Box,
  SimpleGrid,
  Image,
  Text,
  useColorModeValue,
  Flex,
} from "@chakra-ui/react";
import { Genre } from "../types/GenreTypes";
import useGenres from "../hooks/useGenres";

interface Props {
  selectedGenre: Genre | null;
  onGenreSelect: (genre: Genre) => void;
}

const GenreGrid = ({ selectedGenre, onGenreSelect }: Props) => {
  const { data: genres, error, isLoading } = useGenres();

  const bgColor = useColorModeValue("gray.100", "gray.800");
  const hoverBgColor = useColorModeValue("gray.300", "gray.700");
  const selectedBgColor = useColorModeValue("blue.200", "blue.800");

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

  return (
    <Box padding="3" bg={bgColor} maxWidth="200px" mx="auto">
      <SimpleGrid columns={1} spacing={3}>
        {genres?.map((genre: Genre) => (
          <Box
            key={genre.id}
            p={3}
            shadow="md"
            borderWidth="2px"
            borderRadius="md"
            alignItems="center"
            bg={selectedGenre?.id === genre.id ? selectedBgColor : bgColor}
            _hover={{
              bg: hoverBgColor,
              transform: "scale(1.05)",
              transition: "all 0.3s ease-in-out",
            }}
            cursor="pointer"
            onClick={() => {
              onGenreSelect(genre);
            }}
          >
            <Flex align="center" justify="space-between">
              <Image
                src={genre.image_background}
                alt={`Cover Image for ${genre.name}`}
                borderRadius="md"
                objectFit="cover"
                boxSize="50px"
                mr={8}
              />
              <Text fontSize="sm" isTruncated>
                {genre.name}
              </Text>
            </Flex>
          </Box>
        ))}
      </SimpleGrid>
    </Box>
  );
};

export default GenreGrid;
