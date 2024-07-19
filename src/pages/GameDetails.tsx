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

const GameDetails = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();

  if (!slug) {
    return <Text>No game Name provided.</Text>;
  }

  const { data: game, error, isLoading } = useGameDetails(slug);

  if (isLoading) return <Text>Loading...</Text>;
  if (error && error instanceof Error)
    return <Text>Error loading game details: {error.message}</Text>;

  const bgColor = useColorModeValue("gray.100", "gray.800");
  const textColor = useColorModeValue("gray.800", "whiteAlpha.900");
  const bgButColor = useColorModeValue("gray.200", "gray.700");

  return (
    <>
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
            <Image
              src={game.background_image}
              alt={game.name}
              borderRadius="md"
              objectFit="cover"
              mb="4"
            />
            <Heading as="h1" size="xl" mb="4">
              {game.name}
            </Heading>
            <Box
              dangerouslySetInnerHTML={{ __html: game.description }}
              sx={{
                p: {
                  marginBottom: "1em",
                  lineHeight: "1.6",
                },
                br: {
                  marginBottom: "0.5em",
                },
              }}
            />
            {game.parent_platforms && game.parent_platforms.length > 0 && (
              <Stack direction="row" spacing={4} mt="4">
                {game.parent_platforms.map(({ platform }) => (
                  <Box
                    key={platform.id}
                    bg={bgButColor}
                    p="2"
                    borderRadius="md"
                  >
                    <Text>{platform.name}</Text>
                  </Box>
                ))}
              </Stack>
            )}
          </>
        )}
      </Box>
    </>
  );
};
export default GameDetails;
