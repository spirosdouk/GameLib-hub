import { useInfiniteQuery } from "@tanstack/react-query";
import apiClient from "../services/api-client";
import { Game } from "../types/GameTypes";

interface GameResponse {
  results: Game[];
  next: string | null;
}

interface FetchGamesParams {
  genres?: number;
  platforms?: number;
  ordering?: string;
  search?: string;
}


const fetchGames = async ({
  pageParam = 1,
  queryKey,
}: {
  pageParam?: number;
  queryKey: [string, FetchGamesParams];
}) => {
  const [, params] = queryKey;
  const { genres, platforms, ordering, search } = params;
  const response = await apiClient.get<GameResponse>("/games", {
    params: {
      page: pageParam,
      genres,
      platforms,
      ordering,
      search,
    },
  });
  return response.data;
};

const useGames = (params: FetchGamesParams) => {
  return useInfiniteQuery(
    ["games", params],
    fetchGames,
    {
      getNextPageParam: (lastPage) => {
        const url = new URL(lastPage.next || '');
        return url.searchParams.get('page');
      },
    }
  );
};

export default useGames;
