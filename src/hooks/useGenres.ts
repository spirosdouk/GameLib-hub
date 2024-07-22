import { useQuery } from "@tanstack/react-query";
import apiClient from "../services/api-client";
import { GenreResponse } from "../types/GenreTypes";

const fetchGenres = async () => {
  const response = await apiClient.get<GenreResponse>("/genres");
  return response.data.results;
};

const useGenres = () => {
  return useQuery(["genres"], fetchGenres);
};

export default useGenres;
