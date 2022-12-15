import {
  Box,
  Button,
  Card,
  CardBody,
  Center,
  Heading,
  Stack,
  Text,
  VStack,
  Spinner,
} from "@chakra-ui/react";

export default function Match({ match }) {
  return (
    <Box>
      <Center>
        <Stack spacing="4">
          <VStack as="header" spacing="6" mt="8">
            <Heading as="h1" fontWeight="300" fontSize="24px" letterSpacing="-0.5px">
              {match.user1.username} vs {match.user2 ? match.user2.username : <Spinner />}
            </Heading>
          </VStack>
          <Card bg="#f6f8fa" variant="outline" borderColor="#d8dee4" w="308px">
            <CardBody>
              <Stack spacing="4">
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
                  test
                </Button>
              </Stack>
            </CardBody>
          </Card>
        </Stack>
      </Center>
    </Box>
  );
}
