import { useQuery } from "@tanstack/react-query";
import apiClient from "../services/api-client";
import { Game } from "../types/GameTypes";

const fetchGameDetails = async (id: string) => {
  const response = await apiClient.get<Game>(`/games/${id}`);
  return response.data;
};

const useGameDetails = (id: string) => {
  return useQuery(["game", id], () => fetchGameDetails(id));
};

export default useGameDetails;
