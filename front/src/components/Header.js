import { Box, Flex, Heading, Text, Link } from "@chakra-ui/react";

import { Link as ReactRouterLink } from "react-router-dom";

import { FaPowerOff } from "react-icons/fa";

import { parseJwt } from "../utils/parseJwt";

import { useState, useEffect } from "react";

export default function Header() {
  const [username, setUsername] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const decodedToken = parseJwt(token);
      setUsername(decodedToken);
    }
  }, []);

  return (
    <Box
      className="header"
      position="fixed"
      width="100%"
      height="64px"
      top="0"
      bg="#24292F"
      px={8}
      color="white"
    >
      <Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
        <Heading size="md">SHIFUMI-REACT</Heading>
        <Box display="flex" alignItems="center">
          <Text fontSize="20px" fontWeight={300}>
            Signed as :
          </Text>
          <Text fontSize="20px" fontWeight={500} ml="15px">
            {username.toUpperCase()}
          </Text>

          <Link
            as={ReactRouterLink}
            to="/login"
            onClick={() => localStorage.removeItem("token")}
            _hover={{
              textDecoration: "none",
              backgroundColor: "#4D5258",
            }}
            width="38px"
            height="38px"
            display="flex"
            alignItems="center"
            justifyContent="center"
            borderRadius="50%"
            ml="11px"
          >
            <FaPowerOff size="24px" />
          </Link>
        </Box>
      </Flex>
    </Box>
  );
}
