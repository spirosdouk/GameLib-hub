import {
  Flex,
  Input,
  Box,
  useColorMode,
  IconButton,
  Image,
  InputGroup,
  InputRightElement,
  useColorModeValue,
} from "@chakra-ui/react";
import { MoonIcon, SunIcon, SearchIcon } from "@chakra-ui/icons";
import { useState } from "react";

interface Props {
  onSearch: (query: string) => void;
}

const Navbar = ({ onSearch }: Props) => {
  const { colorMode, toggleColorMode } = useColorMode();
  const bgColor = useColorModeValue("gray.300", "gray.700");
  const [searchQuery, setSearchQuery] = useState<string>("");

  const handleSearch = () => {
    onSearch(searchQuery);
  };

  return (
    <Flex
      as="nav"
      align="center"
      justify="space-evenly"
      p={5}
      bg="black.800"
      h="100px"
    >
      <Box>
        <Image
          src="/images/nicelog.webp"
          alt="Logo"
          boxSize="65px"
          display={{ base: "none", md: "block" }}
        />
      </Box>
      <InputGroup size="lg" width="80%">
        <Input
          pr="4.5rem"
          placeholder="Search..."
          borderWidth="2px"
          borderColor={bgColor}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <InputRightElement width="4.5rem">
          <IconButton
            aria-label="Search"
            icon={<SearchIcon />}
            size="lg"
            variant="unstyled"
            onClick={handleSearch}
            isRound
          />
        </InputRightElement>
      </InputGroup>
      <IconButton
        aria-label="Toggle color mode"
        icon={colorMode === "light" ? <MoonIcon /> : <SunIcon />}
        onClick={toggleColorMode}
      />
    </Flex>
  );
};

export default Navbar;
