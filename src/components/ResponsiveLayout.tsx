import { useState, useEffect } from "react";
import { Grid, GridItem, Box, Flex, Text } from "@chakra-ui/react";
import Navbar from "./Navbar";
import GameGrid from "./GameGrid";
import GenreGrid from "./GenreGrid";
import apiClient from "../services/api-client";
import { Genre, GenreResponse } from "./GenreTypes";
import { Game, Platform, PlatformResponse } from "./GameTypes";
import PlatformGrid from "./PlatformGrid";
import SortSelector from "./SortSelector";

interface GamesResponse {
  count: number;
  results: Game[];
}

const ResponsiveLayout = ({}) => {
  const [selectedGenre, setSelectedGenre] = useState<Genre | null>(null);
  const [selectedPlatform, setSelectedPlatform] = useState<Platform | null>(
    null
  );
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedSort, setSelectedSort] = useState<string>("");

  const [genres, setGenres] = useState<Genre[]>([]);
  const [platforms, setPlatforms] = useState<Platform[]>([]);
  const [games, setGames] = useState<Game[]>([]);
  const [error, setError] = useState("");

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

    const fetchGames = async () => {
      try {
        const res = await apiClient.get<GamesResponse>("/games");
        setGames(res.data.results);
      } catch (err) {
        setError((err as { message: string }).message);
      }
    };

    fetchGenres();
    fetchPlatforms();
    fetchGames();
  }, []);

  useEffect(() => {
    const fetchFilteredGames = async () => {
      const params: {
        genres?: number;
        platforms?: number;
        ordering?: string;
        search?: string;
      } = {};

      if (selectedGenre) params.genres = selectedGenre.id;
      if (selectedPlatform) params.platforms = selectedPlatform.id;
      if (selectedSort) params.ordering = selectedSort;
      if (searchQuery) params.search = searchQuery;

      try {
        const res = await apiClient.get<GamesResponse>("/games", { params });
        setGames(res.data.results);
      } catch (err) {
        setError((err as { message: string }).message);
      }
    };

    fetchFilteredGames();
  }, [selectedGenre, selectedPlatform, selectedSort, searchQuery]);

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
        <GenreGrid
          selectedGenre={selectedGenre}
          onGenreSelect={setSelectedGenre}
        />
      </GridItem>
      <GridItem area="main">
        <Flex direction="column" align="flex-start" p={3}>
          <Flex width="40%" mb={4} justifyContent="space-between">
            <Box width="60%">
              <PlatformGrid
                selectedPlatform={selectedPlatform}
                onPlatformSelect={setSelectedPlatform}
              />
            </Box>
            <Box width="70%">
              <SortSelector
                selectedSort={selectedSort}
                onSortSelect={setSelectedSort}
              />
            </Box>
          </Flex>
          <GameGrid games={games} error={error} />
        </Flex>
      </GridItem>
    </Grid>
  );
};

export default ResponsiveLayout;
