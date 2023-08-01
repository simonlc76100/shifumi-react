import { Link as ReactRouterLink } from "react-router-dom";

import {
  Container,
  Box,
  Heading,
  Link,
  Center,
  Image,
  HStack,
  Text,
} from "@chakra-ui/react";

import backroom from "../assets/img/backroom.jpg";
import danger from "../assets/img/danger.jpg";
import ascending from "../assets/img/ascending-meme.jpg";
import backgroundMeme from "../assets/img/background-meme.jpg";

export default function NotFound() {
  return (
    <Center
      className="not-found-view"
      width="inherit"
      height="inherit"
      backgroundImage={`url(${backgroundMeme})`}
      backgroundSize="cover"
    >
      <Container
        width="1280px"
        maxWidth="1280px"
        height="820px"
        maxH="820px"
        display="flex"
        justifyContent="center"
        alignItems="center"
        flexDirection="column"
        backgroundColor="#F1F3F5"
        borderRadius="25px"
        boxShadow="0px 0px 10px 0px rgba(0,0,0,0.2)"
        p={0}
      >
        <Box
          px="10px"
          pt="10px"
          width="1280px"
          display="flex"
          justifyContent="center"
          alignItems="center"
        >
          <Image borderRadius="20px" src={backroom}></Image>
        </Box>
        <Box
          width="1260px"
          height="101px"
          display="flex"
          justifyContent="center"
          alignItems="center"
          flexDirection="column"
        >
          <HStack>
            <Image src={ascending} width="50px" height="50px" />
            <Image src={danger} width="50px" height="50px" />
            <Image src={ascending} width="50px" height="50px" />
            <Image src={danger} width="50px" height="50px" />
            <Image src={ascending} width="50px" height="50px" />
            <Image src={danger} width="50px" height="50px" />
            <Heading fontSize="22px" fontWeight="500">
              <Text>YOU ASCENDED TO THE BACKROOMS, QUICK GO BACK</Text>
            </Heading>
            <Image src={danger} width="50px" height="50px" />
            <Image src={ascending} width="50px" height="50px" />
            <Image src={danger} width="50px" height="50px" />
            <Image src={ascending} width="50px" height="50px" />
            <Image src={danger} width="50px" height="50px" />
            <Image src={ascending} width="50px" height="50px" />
          </HStack>

          <Link
            as={ReactRouterLink}
            to="/matches"
            fontSize="24px"
            fontWeight="500"
            color="RED"
          >
            BACK
          </Link>
        </Box>
      </Container>
    </Center>
  );
}
