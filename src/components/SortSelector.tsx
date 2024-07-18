import React from "react";
import { Box, Select, useColorModeValue } from "@chakra-ui/react";
import useFilterStore from "../store";

const SortSelector: React.FC = () => {
  const { selectedSort, setSelectedSort } = useFilterStore((state) => ({
    selectedSort: state.selectedSort,
    setSelectedSort: state.setSelectedSort,
  }));

  const sortOptions = [
    { label: "Order by: Date added", value: "added" },
    { label: "Order by: Name", value: "name" },
    { label: "Order by: Average rating", value: "-rating" },
    { label: "Order by: Release Date", value: "-released" },
    { label: "Order by: Popularity", value: "-metacritic" },
  ];

  const bgColor = useColorModeValue("gray.100", "gray.800");
  const borderColor = useColorModeValue("gray.200", "gray.600");

  return (
    <Box padding="4" bg={bgColor} borderRadius="md" borderColor={borderColor}>
      <Select
        p={2}
        shadow="md"
        borderWidth="2px"
        borderRadius="md"
        placeholder="Order by: Relevance"
        value={selectedSort}
        onChange={(e) => setSelectedSort(e.target.value)}
      >
        {sortOptions.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </Select>
    </Box>
  );
};

export default SortSelector;
