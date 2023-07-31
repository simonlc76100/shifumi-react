import {
  Box,
  Card,
  CardBody,
  Stack,
  Text,
  Image,
  Center,
  Divider,
  Highlight,
} from "@chakra-ui/react";

import DotPulse from "./DotPulse";
import "./DotPulse";

import versus from "../assets/img/versus.jpg";

import { useNavigate } from "react-router-dom";

import { useState, useEffect, useCallback } from "react";

export default function Match({ match }) {
  const navigate = useNavigate();

  const [scores, setScores] = useState({
    user1: 0,
    user2: 0,
  });

  const handleScore = useCallback(() => {
    let user1Score = 0;
    let user2Score = 0;

    match.turns.forEach((turn) => {
      switch (turn.winner) {
        case "draw":
          user1Score += 0;
          user2Score += 0;
          break;
        case "user1":
          user1Score += 1;
          break;
        case "user2":
          user2Score += 1;
          break;
        default:
          break;
      }
    });

    setScores({
      user1: user1Score,
      user2: user2Score,
    });
  }, [match]);

  useEffect(() => {
    handleScore();
  }, [handleScore]);

  return (
    <Center>
      <Card
        backgroundColor="white"
        mt="30px"
        borderRadius="10px"
        width="600px"
        maxWidth="500px"
        variant="outline"
        border="1px solid #D8DEE4"
      >
        <CardBody>
          <Text size="sm" fontSize="14px" fontWeight="500" letterSpacing="-0.5px">
            <Highlight
              query={match.winner || match.winner === null ? "ENDED" : "IN PROGRESS"}
              styles={{
                width: "90px",
                backgroundColor:
                  match.winner || match.winner === null ? "#D2FFDE" : "#FFF4B6",
                color: match.winner || match.winner === null ? "#2da44e" : "#D4A100",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                borderRadius: "3px",
              }}
            >
              {match.winner || match.winner === null ? "ENDED" : "IN PROGRESS"}
            </Highlight>
          </Text>
          <Stack spacing="2">
            <Box
              position="relative"
              width="100%"
              height="79px"
              display="flex"
              justifyContent="center"
              alignItems="center"
            >
              <Box
                position="absolute"
                left="0"
                backgroundColor="#6262FF"
                color="white"
                borderRadius="10px"
                width="150px"
                height="50px"
                display="flex"
                justifyContent="center"
                alignItems="center"
                fontSize="16px"
                padding="20px"
              >
                <Text noOfLines={1}>{match.user1.username.toUpperCase()} </Text>
              </Box>
              <Image ml={0} src={versus} alt="vs" width="75px" height="66px" />

              <Box
                position="absolute"
                right="0"
                backgroundColor="#FF6262"
                color="white"
                borderRadius="10px"
                width="150px"
                height="50px"
                display="flex"
                justifyContent="center"
                alignItems="center"
                fontSize="16px"
                padding="20px"
              >
                {match.user2 ? (
                  <Text noOfLines={1}>{match.user2.username.toUpperCase()}</Text>
                ) : (
                  <Box>
                    <DotPulse />
                  </Box>
                )}
              </Box>
            </Box>

            <Center>
              <Box
                position="relative"
                width="100%"
                height="50px"
                display="flex"
                justifyContent="center"
                alignItems="center"
              >
                <Box
                  position="absolute"
                  left="0"
                  borderRadius="10px"
                  width="150px"
                  height="50px"
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                  fontSize="16px"
                  padding="20px"
                >
                  <Box
                    height="50px"
                    width="50px"
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                    border="2px solid black"
                    borderRadius="12px"
                    fontSize="24px"
                    fontWeight="500"
                  >
                    <Text> {scores.user1}</Text>
                  </Box>
                </Box>

                <Divider borderColor="gray.400" width="200px" />

                <Box
                  position="absolute"
                  right="0"
                  borderRadius="10px"
                  width="150px"
                  height="50px"
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                  fontSize="16px"
                  padding="20px"
                >
                  <Box
                    height="50px"
                    width="50px"
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                    border="2px solid black"
                    borderRadius="12px"
                    fontSize="24px"
                    fontWeight="500"
                  >
                    <Text> {scores.user2}</Text>
                  </Box>
                </Box>
              </Box>
            </Center>

            <Center>
              <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                flexDirection="column"
              >
                <button
                  onClick={() => {
                    navigate(`/matches/${match._id}`);
                  }}
                >
                  <Text
                    color="#0969da"
                    marginLeft="4px"
                    _hover={{
                      backgroundColor: "#D6D6FF",
                      color: "#0C4A94",
                    }}
                    borderRadius="5px"
                    py="3px"
                    px="6px"
                  >
                    {match.winner || match.winner === null ? "GAME DETAILS" : "JOIN GAME"}
                  </Text>
                </button>
              </Box>
            </Center>
          </Stack>
        </CardBody>
      </Card>
    </Center>
  );
}
