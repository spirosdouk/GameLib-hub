import { useQuery } from "@tanstack/react-query";
import apiClient from "../services/api-client";
import { Game } from "../components/GameTypes";

interface GameResponse {
  results: Game[];
}

const fetchGames = async (params: {
  genres?: number;
  platforms?: number;
  ordering?: string;
  search?: string;
}) => {
  const response = await apiClient.get<GameResponse>("/games", { params });
  return response.data.results;
};

const useGames = (params: {
  genres?: number;
  platforms?: number;
  ordering?: string;
  search?: string;
}) => {
  return useQuery(["games", params], () => fetchGames(params), {
    enabled: !!params,
  });
};

export default useGames;
