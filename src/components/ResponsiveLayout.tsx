import React, { useEffect } from "react";
import { Grid, GridItem, Box, Flex, Text } from "@chakra-ui/react";
import Navbar from "./Navbar";
import GameGrid from "./GameGrid";
import GenreGrid from "./GenreGrid";
import apiClient from "../services/api-client";
import { Genre, GenreResponse } from "../types/GenreTypes";
import { Platform, PlatformResponse } from "../types/GameTypes";
import PlatformGrid from "./PlatformGrid";
import SortSelector from "./SortSelector";
import useFilterStore from "../store";

const ResponsiveLayout = ({}) => {
  const {
    setSelectedGenre,
    setSelectedPlatform,
    setSelectedSort,
    setSearchQuery,
  } = useFilterStore((state) => ({
    setSelectedGenre: state.setSelectedGenre,
    setSelectedPlatform: state.setSelectedPlatform,
    setSelectedSort: state.setSelectedSort,
    setSearchQuery: state.setSearchQuery,
  }));

  const [genres, setGenres] = React.useState<Genre[]>([]);
  const [platforms, setPlatforms] = React.useState<Platform[]>([]);
  const [error, setError] = React.useState<string>("");

  useEffect(() => {
    const fetchGenres = async () => {
      try {
        const res = await apiClient.get<GenreResponse>("/genres");
        setGenres(res.data.results);
      } catch (err) {
        setError((err as { message: string }).message);
      }
    };

    const fetchPlatforms = async () => {
      try {
        const res = await apiClient.get<PlatformResponse>("/platforms");
        setPlatforms(res.data.results);
      } catch (err) {
        setError((err as { message: string }).message);
      }
    };

    fetchGenres();
    fetchPlatforms();
  }, []);

  if (error) {
    return (
      <Box padding="4" bg="red.100" borderRadius="md">
        <Text fontSize="lg" color="red.500">
          {error}
        </Text>
      </Box>
    );
  }

  return (
    <Grid
      h="100vh"
      templateAreas={{
        base: `"navbar" "main"`,
        md: `"navbar navbar" "aside main"`,
      }}
      templateRows={{ base: "auto 1fr", md: "auto 1fr" }}
      templateColumns={{ base: "1fr", md: "240px 1fr" }}
      gap={3}
    >
      <GridItem area="navbar">
        <Navbar onSearch={setSearchQuery} />
      </GridItem>
      <GridItem area="aside" display={{ base: "none", md: "block" }}>
        <GenreGrid />
      </GridItem>
      <GridItem area="main">
        <Flex direction="column" align="flex-start" p={3}>
          <Flex width="40%" mb={4} justifyContent="space-between">
            <Box width="60%">
              <PlatformGrid />
            </Box>
            <Box width="70%">
              <SortSelector />
            </Box>
          </Flex>
          <GameGrid />
        </Flex>
      </GridItem>
    </Grid>
  );
};

export default ResponsiveLayout;
