import { useQuery } from "@tanstack/react-query";
import apiClient from "../services/api-client";
import { Screenshots } from "../types/Screenshots";

const fetchGameScreenshots = async (gameId: number) => {
    const response = await apiClient.get<{ results: Screenshots[] }>(`/games/${gameId}/screenshots`);
    return response.data.results;
  };
  
  const useGameScreenshots = (gameId: number) => {
    return useQuery(["gameScreenshots", gameId], () => fetchGameScreenshots(gameId));
};
  
  export default useGameScreenshots;