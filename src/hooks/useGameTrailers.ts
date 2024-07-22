import { useQuery } from "@tanstack/react-query";
import apiClient from "../services/api-client";
import { Trailer } from "../types/GameTailer";

const fetchGameTrailers = async (gameId: number) => {
    const response = await apiClient.get<{ results: Trailer[] }>(`/games/${gameId}/movies`);
    return response.data.results;
  };
  
  const useGameTrailers = (gameId: number) => {
    return useQuery(["gameTrailers", gameId], () => fetchGameTrailers(gameId));
  };
  
  export default useGameTrailers;