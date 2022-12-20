import Match from "./Match";

import { useEffect } from "react";
import {
  Container,
  Heading,
  Box,
  Stack,
  Divider,
  VStack,
  Button,
  Center,
  Text,
  Card,
  CardBody,
  CloseButton,
} from "@chakra-ui/react";

export default function MatchesList({
  getMatches,
  title,
  matches,
  errorCreate,
  setErrorCreate,
  createMatch,
}) {
  useEffect(() => {
    getMatches();
  }, [getMatches]);

  return (
    <Container
      className="matches-list"
      width="900px"
      maxWidth="900px"
      backgroundColor="#F1F3F5"
      borderRadius="25px"
      variant="outline"
      border="1px solid #D8DEE4"
      boxShadow="0px 0px 10px 0px rgba(0,0,0,0.2)"
      px="20px"
    >
      <Center>
        <Box
          width="700px"
          maxWidth="700px"
          display="flex"
          justifyContent="center"
          alignItems="center"
          flexDirection="column"
          my={10}
        >
          <Stack spacing="10">
            <VStack>
              <Heading as="h1" fontWeight="500" fontSize="34px" letterSpacing="0.5px">
                {title}
              </Heading>
            </VStack>

            <Divider borderColor="gray.400" />

            {errorCreate && (
              <Card bg="#FFEBE9" variant="outline" borderColor="#FFC1C0" w="308px">
                <CardBody
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <Text
                    color="red.500"
                    fontSize="15px"
                    fontWeight="500"
                    letterSpacing="0.5px"
                  >
                    You must wait for another player to join your last game.
                  </Text>
                  <CloseButton
                    color="red.600"
                    size="sm"
                    onClick={() => {
                      setErrorCreate(false);
                    }}
                  />
                </CardBody>
              </Card>
            )}

            <Button
              marginTop={10}
              width="308px"
              fontSize="16px"
              fontWeight="600"
              letterSpacing="0.5px"
              type="submit"
              bg="#2da44e"
              color="white"
              height="55px"
              borderRadius="10px"
              _hover={{ bg: "#2c974b" }}
              _active={{ bg: "#298e46" }}
              onClick={createMatch}
            >
              Create a new game
            </Button>
          </Stack>
        </Box>
      </Center>

      {matches.map((match) => (
        <Match key={match._id} match={match} />
      ))}
    </Container>
  );
}
