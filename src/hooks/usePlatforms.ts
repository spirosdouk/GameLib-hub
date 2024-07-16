import { useQuery } from "@tanstack/react-query";
import apiClient from "../services/api-client";
import { Platform, PlatformResponse } from "../components/GameTypes";

const fetchPlatforms = async () => {
  const response = await apiClient.get<PlatformResponse>("/platforms");
  return response.data.results;
};

const usePlatforms = () => {
    return useQuery(["platforms"], fetchPlatforms);
  };
  
  export default usePlatforms;
