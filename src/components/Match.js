import {
  Box,
  Button,
  Card,
  CardBody,
  Center,
  Stack,
  Text,
  Image,
} from "@chakra-ui/react";

import DotPulse from "./DotPulse";
import "./DotPulse";

import versus from "../assets/img/versus.jpg";

export default function Match({ match }) {
  return (
    <Center>
      <Stack
        backgroundColor="white"
        mt="10px"
        borderRadius="25px"
        width="500px"
        maxWidth="500px"
      >
        <Card borderRadius="25px">
          <CardBody>
            <Stack spacing="4">
              <Text position="absolute" left="20px">
                {match.user1.username}{" "}
              </Text>
              <Image src={versus} alt="vs" width="125px" height="125px" />

              {match.user2 ? (
                <Text position="absolute" right="20px">
                  {match.user2.username}
                </Text>
              ) : (
                <Box position="absolute" right="20px">
                  <DotPulse />
                </Box>
              )}

              <Text size="sm" fontSize="14px" fontWeight="400" letterSpacing="-0.5px">
                {match.winner ? "gagnant : " + match.winner.username : "Match en cours"}
              </Text>
              <Button
                bg="#2da44e"
                color="white"
                size="sm"
                _hover={{ bg: "#2c974b" }}
                _active={{ bg: "#298e46" }}
                fontWeight="500"
              >
                blabla match
              </Button>
            </Stack>
          </CardBody>
        </Card>
      </Stack>
    </Center>
  );
}
