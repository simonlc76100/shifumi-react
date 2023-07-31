import Match from "./Match";
import "../assets/styles/MatchesList.css";

import empty from "../assets/img/empty.jpg";

import { useEffect } from "react";

import {
  Container,
  Heading,
  Stack,
  Divider,
  VStack,
  Button,
  Center,
  Image,
} from "@chakra-ui/react";

export default function MatchesList({ matches, getMatches, errorGet, createMatch }) {
  useEffect(() => {
    getMatches();
  }, [getMatches]);

  return (
    <Container
      className="matches-list"
      width="700px"
      maxWidth="700px"
      height="650px"
      maxHeight="100%"
      backgroundColor="#F1F3F5"
      borderRadius="25px"
      variant="outline"
      border="1px solid #D8DEE4"
      boxShadow="0px 0px 10px 0px rgba(0,0,0,0.2)"
      pl="27px"
      pr="20px"
      bottom="0"
      overflow="auto"
    >
      <Center>
        <Stack
          width="500px"
          maxWidth="500px"
          display="flex"
          justifyContent="center"
          alignItems="center"
          flexDirection="column"
          spacing={10}
          my={10}
        >
          <VStack>
            <Heading as="h1" fontWeight="500" fontSize="34px" letterSpacing="0.5px">
              {errorGet ? "No games found" : "Your games"}
            </Heading>
          </VStack>

          <Divider borderColor="gray.400" />

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
          {errorGet && <Image src={empty} alt="empty" width="300px" height="300px" />}
        </Stack>
      </Center>

      {matches.map((match) => (
        <Match key={match._id} match={match} />
      ))}
    </Container>
  );
}
