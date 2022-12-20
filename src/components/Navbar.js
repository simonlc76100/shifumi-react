import { Box, Flex, Heading, Text, Link } from "@chakra-ui/react";

import { Link as ReactRouterLink } from "react-router-dom";

import { FaPowerOff } from "react-icons/fa";

export default function Navbar() {
  return (
    <div className="navbar">
      <Box bg="#24292F" color="white" px={8}>
        <Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
          <Heading size="md">SHIFUMI-REACT</Heading>
          <Box display="flex" alignItems="center" minWidth="240px">
            <Text fontSize="20px" fontWeight={300}>
              Logged as :
            </Text>
            <Text fontSize="20px" fontWeight={400} ml="5px">
              {localStorage.getItem("username")}
            </Text>

            <Link
              as={ReactRouterLink}
              to="/login"
              onClick={() => localStorage.clear()}
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
            >
              <FaPowerOff size="24px" />
            </Link>
          </Box>
        </Flex>
      </Box>
    </div>
  );
}
