import { useParams, useNavigate } from "react-router-dom";
import {
  Box,
  Text,
  Image,
  Heading,
  Stack,
  Button,
  useColorModeValue,
} from "@chakra-ui/react";
import useGameDetails from "../hooks/useGameDetails";
import ExpandableDescription from "../components/ExpandableDescription";
import GameShowcase from "../components/GameShowcase";
import TrailerComponent from "../components/TrailerComponent";
import ScreenshotComponent from "../components/ScreenshotComponent";

const GameDetails = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();

  const validSlug = slug || "";

  const { data: game, error, isLoading } = useGameDetails(validSlug);
  const bgColor = useColorModeValue("gray.100", "gray.800");
  const textColor = useColorModeValue("gray.800", "whiteAlpha.900");
  const bgButColor = useColorModeValue("gray.200", "gray.700");

  if (isLoading) return <Text>Loading...</Text>;
  if (error && error instanceof Error)
    return <Text>Error loading game details: {error.message}</Text>;

  return (
    <Box
      p="4"
      maxW="1000px"
      mx="auto"
      bg={bgColor}
      color={textColor}
      borderRadius="md"
    >
      <Button mb="5" ml="-2" bg={bgButColor} onClick={() => navigate(-1)}>
        Go Back
      </Button>
      {game && (
        <>
          <Heading as="h1" size="xl" mb="2">
            {game.name}
          </Heading>
          <Image
            src={game.background_image}
            alt={game.name}
            borderRadius="md"
            mb="4"
          />
          {game.parent_platforms && game.parent_platforms.length > 0 && (
            <Stack direction="row" spacing={4} mt="4" mb="2">
              {game.parent_platforms.map(({ platform }) => (
                <Box key={platform.id} bg={bgButColor} p="2" borderRadius="md">
                  <Text>{platform.name}</Text>
                </Box>
              ))}
            </Stack>
          )}
          <ExpandableDescription description={game.description} />
          <GameShowcase game={game} />
          <ScreenshotComponent gameId={game.id} />
          <TrailerComponent gameId={game.id} />
        </>
      )}
    </Box>
  );
};

export default GameDetails;
