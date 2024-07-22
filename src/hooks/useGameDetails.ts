import { useQuery } from "@tanstack/react-query";
import apiClient from "../services/api-client";
import { Game } from "../types/GameTypes";

const fetchGameDetails = async (slug: string) => {
    const response = await apiClient.get<Game>(`/games/${slug}`);
    return response.data;
};

const useGameDetails = (slug: string) => {
    return useQuery<Game, Error>(["game", slug], () => fetchGameDetails(slug));
};

export default useGameDetails;
