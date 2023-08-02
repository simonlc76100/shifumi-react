import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { Link as ReactRouterLink } from "react-router-dom";

import { Button, Container, Heading } from "@chakra-ui/react";

import { EventSourcePolyfill } from "event-source-polyfill";

import { parseJwt } from "../utils/functions/parseJwt";

import {
  Center,
  Divider,
  Card,
  CardBody,
  Text,
  Image,
  HStack,
  Box,
  Highlight,
  Spinner,
  Link,
} from "@chakra-ui/react";

import { useToast } from "@chakra-ui/react";

import versus from "../assets/img/versus.jpg";

import DotPulse from "./DotPulse";

import { MdCelebration } from "react-icons/md";

import {
  FaHandshake,
  FaHandRock,
  FaHandPaper,
  FaHandScissors,
} from "react-icons/fa";

import { BsArrowLeftSquareFill } from "react-icons/bs";

import rock from "../assets/img/rock.jpg";

import paper from "../assets/img/paper.jpg";

import scissors from "../assets/img/scissors.jpg";

import question1 from "../assets/img/question1.jpg";

import question2 from "../assets/img/question2.jpg";

export default function MatchDisplay({ idParam }) {
  const [match, setMatch] = useState({});

  const [idTurn, setIdTurn] = useState(0);

  const navigate = useNavigate();

  const [joined, setJoined] = useState({});

  const [moveMade1, setMoveMade1] = useState(false);

  const [moveMade2, setMoveMade2] = useState(false);

  const [player1Move, setPlayer1Move] = useState(false);

  const [player2Move, setPlayer2Move] = useState(false);

  const [turnEnded, setTurnEnded] = useState({});

  const [matchEnded, setMatchEnded] = useState({});

  const getMatch = useCallback(async () => {
    const response = await fetch(`http://localhost:5000/matches/${idParam}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });

    switch (response.status) {
      case 200:
        const data = await response.json();
        console.log(data);
        setMatch(data);

        break;
      default:
        navigate("/404");
        break;
    }
  }, [idParam, navigate]);

  useEffect(() => {
    getMatch();
  }, [getMatch, joined, player1Move, player2Move, turnEnded]);

  useEffect(() => {
    const eventSource = new EventSourcePolyfill(
      `http://localhost:5000/matches/${idParam}/subscribe`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );

    eventSource.onmessage = (event) => {
      const data = JSON.parse(event.data);
      console.log(data);
      switch (data.type) {
        case "PLAYER2_JOIN":
          setJoined(data);
          break;
        case "PLAYER1_MOVED":
          setPlayer1Move(true);
          break;
        case "PLAYER2_MOVED":
          setPlayer2Move(true);
          break;
        case "TURN_ENDED":
          setTurnEnded(data);
          break;
        case "MATCH_ENDED":
          setMatchEnded(data);
          break;
        default:
          break;
      }
    };

    return () => {
      eventSource.close();
    };
  }, [idParam]);

  const toast = useToast();

  useEffect(() => {
    if (joined.payload) {
      toast({
        title: `player "${joined.payload.user}" joined !`,
        status: "info",
        duration: 3000,
        position: "top",
      });
    }
  }, [joined, toast]);

  useEffect(() => {
    if (player1Move) {
      if (match.user1) {
        if (parseJwt(localStorage.getItem("token")) === match.user1.username) {
          toast({
            title: "you posted your move !",
            status: "success",
            duration: 3000,
            position: "top",
          });
          setMoveMade1(true);
        } else {
          toast({
            title: `${match.user1.username.toUpperCase()} posted his move !`,
            status: "info",
            duration: 3000,
            position: "top",
          });
        }
        setPlayer1Move(false);
        setMoveMade2(false);
      }
    }

    if (player2Move) {
      if (match.user2) {
        if (parseJwt(localStorage.getItem("token")) === match.user2.username) {
          toast({
            title: "you posted your move !",
            status: "success",
            duration: 3000,
            position: "top",
          });
          setMoveMade2(true);
        } else {
          toast({
            title: `${match.user2.username.toUpperCase()} posted his move !`,
            status: "info",
            duration: 3000,
            position: "top",
          });
        }
        setPlayer2Move(false);
        setMoveMade1(false);
      }
    }
  }, [player1Move, player2Move, toast, match, moveMade1, moveMade2]);

  useEffect(() => {
    if (matchEnded.payload) {
      if (matchEnded.payload.winner !== "draw") {
        toast({
          render: () => (
            <Box
              borderRadius="10px"
              color="white"
              p={3}
              bg="purple.600"
              display="flex"
              fontWeight="600"
            >
              <MdCelebration
                style={{
                  marginRight: "10px",
                  fontSize: "25px",
                }}
              />
              <Text>{`player ${matchEnded.payload.winner.toUpperCase()} won the match !`}</Text>
            </Box>
          ),
          duration: 10000,
          position: "top",
        });
      } else {
        toast({
          render: () => (
            <Box
              borderRadius="5px"
              color="white"
              p="11px"
              bg="purple.600"
              display="flex"
              fontWeight="600"
            >
              <FaHandshake
                style={{
                  marginRight: "10px",
                  fontSize: "25px",
                }}
              />
              <Text>{`match ended in a draw !`}</Text>
            </Box>
          ),
          duration: 10000,
          position: "top",
        });
      }
    }
  }, [matchEnded, toast]);

  const getTurnId = useCallback(() => {
    if (match.turns) {
      if (match.turns.length > 0) {
        if (match.turns[match.turns.length - 1].winner) {
          setIdTurn(match.turns.length + 1);
        } else {
          setIdTurn(match.turns.length);
        }
      } else {
        setIdTurn(1);
      }
    }
  }, [match]);

  useEffect(() => {
    getTurnId();
  }, [getTurnId, player1Move, player2Move]);

  async function handleMove(move) {
    console.log(move);
    const response = await fetch(
      `http://localhost:5000/matches/${match._id}/turns/${idTurn}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({
          move: move,
        }),
      }
    );

    switch (response.status) {
      case 202:
        break;
      case 400:
        const data_error = await response.json();
        console.log(data_error);
        break;
      default:
        console.log("error");
        break;
    }
  }

  const disableButton = useCallback(() => {
    if (match.user1) {
      if (parseJwt(localStorage.getItem("token")) === match.user1.username) {
        if (moveMade1) {
          return true;
        } else {
          return false;
        }
      }
    }
    if (match.user2) {
      if (parseJwt(localStorage.getItem("token")) === match.user2.username) {
        if (moveMade2) {
          return true;
        } else {
          return false;
        }
      }
    }
  }, [match, moveMade1, moveMade2]);

  useEffect(() => {
    disableButton();
  }, [disableButton, player1Move, player2Move]);

  const [scores, setScores] = useState({
    user1: 0,
    user2: 0,
  });

  const handleScore = useCallback(() => {
    let user1Score = 0;
    let user2Score = 0;

    if (match.turns) {
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
    }
  }, [match]);

  useEffect(() => {
    handleScore();
  }, [handleScore]);

  function getUserMove(user) {
    if (user) {
      switch (user) {
        case "rock":
          return <Image src={rock} alt="rock" width="110px" height="110px" />;
        case "paper":
          return <Image src={paper} alt="paper" width="110px" height="110px" />;
        case "scissors":
          return (
            <Image
              src={scissors}
              alt="scissors"
              width="110px"
              height="110px"
              transform="rotate(180deg)"
            />
          );
        default:
          break;
      }
    }
  }

  function getMatchWinner(match) {
    if (match.hasOwnProperty("winner")) {
      if (match.winner === null) {
        return "Match ended in a draw";
      } else {
        return `Player ${match.winner.username.toUpperCase()} won the match !`;
      }
    }
  }

  // {!match.user2
  //   ? "WAITING FOR OPPONENT"
  //   : match.winner || match.winner === null
  //   ? "ENDED"
  //   : "IN PROGRESS"}

  return (
    <Container
      className="match-display"
      width="800px"
      maxWidth="800px"
      height="800px"
      maxHeight="800px"
      backgroundColor="#F1F3F5"
      borderRadius="25px"
      variant="outline"
      border="1px solid #D8DEE4"
      boxShadow="0px 0px 10px 0px rgba(0,0,0,0.2)"
      p={0}
      display="flex"
      alignItems="center"
      justifyContent="center"
    >
      <Card
        backgroundColor="white"
        borderRadius="20px"
        width="780px"
        height="780px"
        variant="outline"
        border="1px solid #D8DEE4"
      >
        <CardBody>
          <Text
            size="sm"
            fontSize="14px"
            fontWeight="500"
            letterSpacing="-0.5px"
          >
            <Highlight
              query={
                match.winner || match.winner === null ? "ENDED" : "IN PROGRESS"
              }
              styles={{
                width: "90px",
                backgroundColor:
                  match.winner || match.winner === null ? "#D2FFDE" : "#FFF4B6",
                color:
                  match.winner || match.winner === null ? "#2da44e" : "#D4A100",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                borderRadius: "3px",
              }}
            >
              {match.winner || match.winner === null ? "ENDED" : "IN PROGRESS"}
            </Highlight>
          </Text>

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
              {match.user1 ? (
                <Text noOfLines={1}>{match.user1.username.toUpperCase()}</Text>
              ) : (
                <Box>
                  <DotPulse />
                </Box>
              )}
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

          <Center
            display="flex"
            justifyContent="center"
            alignItems="center"
            flexDirection="column"
          >
            <Heading
              size="md"
              fontSize="20px"
              fontWeight="500"
              letterSpacing="-0.5px"
            >
              {!match.user2
                ? "WAITING FOR OPPONENT"
                : match.winner || match.winner === null
                ? "ENDED"
                : "IN PROGRESS"}
            </Heading>
            <Box mt="20px">
              {match.turns ? (
                match.turns.map((turn, index) => {
                  return (
                    <Box key={index} className="match-container">
                      <Box className="turn-number">
                        <Text
                          size="sm"
                          fontSize="14px"
                          fontWeight="500"
                          display="flex"
                          alignItems="center"
                          justifyContent="center"
                        >
                          Round {index + 1}
                        </Text>

                        <Box
                          className="move-recap"
                          display="flex"
                          justifyContent="center"
                          alignItems="center"
                        >
                          <Box mr="20px">
                            {!turn.user1 || turn.user1 === "?" ? (
                              <Image
                                src={question1}
                                alt="question"
                                width="110px"
                                height="110px"
                              />
                            ) : (
                              getUserMove(turn.user1)
                            )}
                          </Box>
                          <Divider
                            borderColor="gray.400"
                            height="80px"
                            orientation="vertical"
                          />
                          <Box ml="20px">
                            {!turn.user2 || turn.user2 === "?" ? (
                              <Image
                                src={question2}
                                alt="question"
                                width="110px"
                                height="110px"
                              />
                            ) : (
                              getUserMove(turn.user2)
                            )}
                          </Box>
                        </Box>
                      </Box>
                    </Box>
                  );
                })
              ) : (
                <Spinner />
              )}
            </Box>

            <Box mt="30px" className="winner" fontSize="20px" fontWeight="500">
              {getMatchWinner(match)}
            </Box>
          </Center>

          <Center>
            <Link
              position="absolute"
              left="20px"
              bottom="0"
              as={ReactRouterLink}
              to="/matches"
              color="#0969da"
              marginLeft="4px"
              _hover={{ color: "#0C4A94" }}
            >
              <Button leftIcon={<BsArrowLeftSquareFill />}>BACK</Button>
            </Link>
            <Box className="choices" position="absolute" bottom="0px">
              <HStack spacing="20px">
                <Button
                  border="2px solid #D8DEE4"
                  width="150px"
                  disabled={
                    disableButton() ||
                    match.winner ||
                    match.winner === null ||
                    !match.user2
                  }
                  onClick={() => {
                    handleMove("rock");
                  }}
                >
                  ROCK{" "}
                  <FaHandRock
                    style={{
                      marginLeft: "5px",
                    }}
                  />
                </Button>
                <Button
                  border="2px solid #D8DEE4"
                  width="150px"
                  disabled={
                    disableButton() ||
                    match.winner ||
                    match.winner === null ||
                    !match.user2
                  }
                  onClick={() => {
                    handleMove("paper");
                  }}
                >
                  PAPER{" "}
                  <FaHandPaper
                    style={{
                      marginLeft: "5px",
                    }}
                  />
                </Button>
                <Button
                  border="2px solid #D8DEE4"
                  width="150px"
                  disabled={
                    disableButton() ||
                    match.winner ||
                    match.winner === null ||
                    !match.user2
                  }
                  onClick={() => {
                    handleMove("scissors");
                  }}
                >
                  SCISSORS{" "}
                  <FaHandScissors
                    style={{
                      marginLeft: "5px",
                      transform: "rotate(90deg)",
                    }}
                  />
                </Button>
              </HStack>
            </Box>
          </Center>
        </CardBody>
      </Card>
    </Container>
  );
}
