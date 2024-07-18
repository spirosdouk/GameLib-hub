import React from "react";
import { Box, Text, useColorModeValue, Select } from "@chakra-ui/react";
import usePlatforms from "../hooks/usePlatforms";
import { Platform } from "../types/GameTypes";
import useFilterStore from "../store";

const PlatformGrid: React.FC = () => {
  const { selectedPlatform, setSelectedPlatform } = useFilterStore((state) => ({
    selectedPlatform: state.selectedPlatform,
    setSelectedPlatform: state.setSelectedPlatform,
  }));

  const { data: platforms, error, isLoading } = usePlatforms();

  const bgColor = useColorModeValue("gray.100", "gray.800");
  const borderColor = useColorModeValue("gray.200", "gray.600");

  if (isLoading) {
    return <Text>Loading...</Text>;
  }

  if (error) {
    return (
      <Text fontSize="lg" color="red.500">
        {(error as Error).message}
      </Text>
    );
  }

  return (
    <Box
      padding="4"
      bg={bgColor}
      borderRadius="md"
      borderColor={borderColor}
      width="100%"
    >
      <Select
        p={2}
        shadow="md"
        borderWidth="2px"
        borderRadius="md"
        placeholder="Select platform"
        value={selectedPlatform?.id ?? ""}
        onChange={(e) => {
          const platformId = parseInt(e.target.value, 10);
          const selected =
            platforms?.find(
              (platform: Platform) => platform.id === platformId
            ) || undefined;
          setSelectedPlatform(selected);
        }}
      >
        {platforms?.map((platform) => (
          <option key={platform.id} value={platform.id}>
            {platform.name}
          </option>
        ))}
      </Select>
    </Box>
  );
};

export default PlatformGrid;
