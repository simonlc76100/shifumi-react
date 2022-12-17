import { Link as ReactRouterLink } from "react-router-dom";

import {
  Card,
  CardBody,
  Center,
  Link,
  Stack,
  CloseButton,
  Container,
  Box,
  Heading,
  Text,
  Button,
  VStack,
  FormControl,
  Input,
  InputGroup,
  InputLeftElement,
  Image,
  Divider,
} from "@chakra-ui/react";

import { BsPerson } from "react-icons/bs";

import { RiLockPasswordLine } from "react-icons/ri";

import shifumi from "../assets/img/cat-shifumi.gif";

export default function Form({
  error,
  setError,
  formData,
  setFormData,
  CONSTANTS,
  submitFunction,
  route,
}) {
  return (
    <Container
      width="950px"
      maxWidth="950px"
      height="650px"
      maxH="6500px"
      p={0}
      display="flex"
      justifyContent="center"
      alignItems="center"
      backgroundColor="#F4F3FD"
      borderRadius="25px"
      border="2px solid white"
    >
      <Image
        height="630px"
        width="50%"
        marginLeft="10px"
        marginRight="10px"
        borderRadius="25px"
        src={shifumi}
        objectFit="cover"
      ></Image>
      <Box
        height="full"
        width="50%"
        borderRadius="25px"
        display="flex"
        justifyContent="center"
        alignItems="center"
      >
        <Box bg="#F4F3FD" w="308px">
          <Stack spacing="10">
            <VStack>
              <Heading as="h1" fontWeight="600" fontSize="31px" letterSpacing="-0.5px">
                Shifumi-React
              </Heading>
            </VStack>

            <Divider borderColor="gray.400" />

            {error && (
              <Card bg="#FFEBE9" variant="outline" borderColor="#FFC1C0" w="308px">
                <CardBody
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <Text color="red.500" fontSize="sm" fontWeight="600">
                    {CONSTANTS[4]}
                  </Text>
                  <CloseButton
                    color="red.600"
                    size="sm"
                    onClick={() => {
                      setError(false);
                    }}
                  />
                </CardBody>
              </Card>
            )}

            <form onSubmit={submitFunction}>
              <Stack spacing="5">
                <FormControl>
                  <InputGroup>
                    <InputLeftElement
                      height="full"
                      pointerEvents="none"
                      children={<BsPerson />}
                    />
                    <Input
                      required
                      backgroundColor="white"
                      fontSize="14px"
                      placeholder="Nom d'utilisateur"
                      type="text"
                      height="55px"
                      borderRadius="10px"
                      onChange={(e) => {
                        setFormData({
                          ...formData,
                          username: e.target.value,
                        });
                      }}
                    />
                  </InputGroup>
                </FormControl>
                <FormControl>
                  <InputGroup>
                    <InputLeftElement
                      height="full"
                      pointerEvents="none"
                      children={<RiLockPasswordLine />}
                    />
                    <Input
                      required
                      backgroundColor="white"
                      fontSize="14px"
                      placeholder="Mot de passe"
                      type="password"
                      height="55px"
                      borderRadius="10px"
                      onChange={(e) => {
                        setFormData({
                          ...formData,
                          password: e.target.value,
                        });
                      }}
                    />
                  </InputGroup>
                </FormControl>
              </Stack>
              <Button
                marginTop={10}
                width="308px"
                fontSize="15px"
                fontWeight="600"
                letterSpacing={1}
                type="submit"
                bg="#2da44e"
                color="white"
                height="55px"
                borderRadius="10px"
                _hover={{ bg: "#2c974b" }}
                _active={{ bg: "#298e46" }}
              >
                {CONSTANTS[1]}
              </Button>
            </form>
          </Stack>
          <Center fontSize="sm" spacing="1" marginTop="20px">
            <Text>{CONSTANTS[2]}</Text>
            <Link as={ReactRouterLink} to={route} color="#0969da" marginLeft="4px">
              <button>{CONSTANTS[3]}</button>
            </Link>
          </Center>
        </Box>
      </Box>
    </Container>
  );
}
