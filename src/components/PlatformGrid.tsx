import { useEffect, useState } from "react";
import apiClient from "../services/api-client";
import { Box, Text, useColorModeValue, Select } from "@chakra-ui/react";
import { Platform, PlatformResponse } from "./GameTypes";

interface Props {
  selectedPlatform: Platform | null;
  onPlatformSelect: (platform: Platform | null) => void;
}

const PlatformGrid = ({ selectedPlatform, onPlatformSelect }: Props) => {
  const [platforms, setPlatforms] = useState<Platform[]>([]);
  const [error, setError] = useState("");

  useEffect(() => {
    apiClient
      .get<PlatformResponse>("/platforms")
      .then((res: { data: PlatformResponse }) => setPlatforms(res.data.results))
      .catch((err: { message: string }) => setError(err.message));
  }, []);

  const bgColor = useColorModeValue("gray.100", "gray.800");
  const borderColor = useColorModeValue("gray.200", "gray.600");

  return (
    <Box
      padding="4"
      bg={bgColor}
      borderRadius="md"
      borderColor={borderColor}
      width="100%"
    >
      {error ? (
        <Text fontSize="lg" color="red.500">
          {error}
        </Text>
      ) : (
        <Select
          p={2}
          shadow="md"
          borderWidth="2px"
          borderRadius="md"
          placeholder="Select platform"
          onChange={(e) => {
            const platformId = parseInt(e.target.value);
            const selected =
              platforms.find((platform) => platform.id === platformId) || null;
            onPlatformSelect(selected);
          }}
        >
          {platforms.map((platform) => (
            <option key={platform.id} value={platform.id}>
              {platform.name}
            </option>
          ))}
        </Select>
      )}
    </Box>
  );
};

export default PlatformGrid;
