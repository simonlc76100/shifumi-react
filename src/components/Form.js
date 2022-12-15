import { Link as ReactRouterLink } from "react-router-dom";

import {
  Card,
  CardBody,
  Center,
  Link,
  Stack,
  CloseButton,
  Container,
  Flex,
  Box,
  Heading,
  Text,
  IconButton,
  Button,
  VStack,
  HStack,
  Wrap,
  WrapItem,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputLeftElement,
  Image,
  Divider,
} from "@chakra-ui/react";

import { BsGithub, BsPerson } from "react-icons/bs";

import { RiLockPasswordLine } from "react-icons/ri";
import { hover } from "@testing-library/user-event/dist/hover";

export default function Form({
  error,
  setError,
  setUsername,
  setPassword,
  submitFunction,
  text1,
  text2,
  text3,
  text4,
  text5,
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
      <Box
        height="630px"
        width="50%"
        marginLeft="10px"
        marginRight="10px"
        backgroundColor="#7F7FFF"
        borderRadius="25px"
      ></Box>
      <Box
        height="full"
        width="50%"
        backgroundColor="#F4F3FD"
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
                <CardBody display="flex" justifyContent="space-between" alignItems="center">
                  <Text color="red.500" fontSize="sm" fontWeight="600">
                    {text5}
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

            <form id="form">
              <Stack spacing="5">
                <FormControl>
                  <InputGroup>
                    <InputLeftElement height="full" pointerEvents="none" children={<BsPerson />} />
                    <Input
                      backgroundColor="white"
                      fontSize="14px"
                      placeholder="Nom d'utilisateur"
                      type="text"
                      height="55px"
                      borderRadius="10px"
                      onChange={(e) => {
                        setUsername(e.target.value);
                      }}
                    />
                  </InputGroup>
                </FormControl>
                <FormControl>
                  <InputGroup>
                    <InputLeftElement height="full" pointerEvents="none" children={<RiLockPasswordLine />} />
                    <Input
                      borderColor="gray.300"
                      backgroundColor="white"
                      fontSize="14px"
                      placeholder="Mot de passe"
                      type="password"
                      height="55px"
                      borderRadius="10px"
                      onChange={(e) => {
                        setPassword(e.target.value);
                      }}
                    />
                  </InputGroup>
                </FormControl>
              </Stack>
            </form>
            <Button
              width="308px"
              fontSize="14px"
              type="submit"
              bg="#2da44e"
              color="white"
              height="55px"
              borderRadius="10px"
              _hover={{ bg: "#2c974b" }}
              _active={{ bg: "#298e46" }}
              fontWeight="500"
              form="form"
              onClick={submitFunction}
            >
              {text2}
            </Button>
          </Stack>
          <Center fontSize="sm" spacing="1" marginTop="20px">
            <Text>{text3}</Text>
            <Link as={ReactRouterLink} to={route} color="#0969da" marginLeft="4px">
              <button>{text4}</button>
            </Link>
          </Center>
        </Box>
      </Box>
    </Container>
    // <Container maxW="full" mt={0} centerContent overflow="hidden">
    //   <Box bg="#DAE5F3" color="white" borderRadius="lg">
    //     <Box>
    //       <Wrap spacing={{ base: 20, sm: 3, md: 5, lg: 20 }}>
    //         <WrapItem>
    //           <Box>
    //             <Heading>Shifumi-React</Heading>
    //             <VStack mt={{ lg: 10, md: 10 }} spacing={5} px={5} display="flex">
    //               <Image src={icon} alt="logo" borderRadius="full" boxSize="230px" />

    //               <IconButton
    //                 aria-label="github"
    //                 variant="ghost"
    //                 size="lg"
    //                 isRound={true}
    //                 _hover={{ bg: "#84ADE1" }}
    //                 icon={<BsGithub size="28px" />}
    //               />
    //             </VStack>
    //           </Box>
    //         </WrapItem>
    //         <WrapItem height="100%">
    //           <Box>
    //             <Center>
    //               <Stack spacing="4">
    //                 {error && (
    //                   <Card
    //                     bg="#FFEBE9"
    //                     variant="outline"
    //                     borderColor="#FFC1C0"
    //                     w="308px"
    //                   >
    //                     <CardBody
    //                       display="flex"
    //                       justifyContent="space-between"
    //                       alignItems="center"
    //                     >
    //                       <Text color="red.500" fontSize="sm" fontWeight="600">
    //                         {text5}
    //                       </Text>
    //                       <CloseButton
    //                         color="red.600"
    //                         size="sm"
    //                         onClick={() => {
    //                           setError(false);
    //                         }}
    //                       />
    //                     </CardBody>
    //                   </Card>
    //                 )}
    //                 <Card bg="#f6f8fa" variant="outline" borderColor="#d8dee4" w="308px">
    //                   <CardBody padding="30px">
    //                     <form onSubmit={submitFunction}>
    //                       <Stack spacing="4">
    //                         <FormControl>
    //                           <FormLabel
    //                             size="sm"
    //                             fontSize="14px"
    //                             fontWeight="400"
    //                             letterSpacing="-0.5px"
    //                           >
    //                             Nom d'utilisateur
    //                           </FormLabel>
    //                           <InputGroup borderColor="#E0E1E7">
    //                             <InputLeftElement
    //                               pointerEvents="none"
    //                               children={<BsPerson color="gray.800" />}
    //                             />
    //                             <Input
    //                               type="text"
    //                               size="md"
    //                               onChange={(e) => {
    //                                 setUsername(e.target.value);
    //                               }}
    //                             />
    //                           </InputGroup>
    //                         </FormControl>
    //                         <FormControl>
    //                           <FormLabel
    //                             size="sm"
    //                             fontSize="14px"
    //                             fontWeight="400"
    //                             letterSpacing="-0.5px"
    //                           >
    //                             Mot de passe
    //                           </FormLabel>
    //                           <InputGroup borderColor="#E0E1E7">
    //                             <InputLeftElement
    //                               pointerEvents="none"
    //                               children={<RiLockPasswordLine color="gray.800" />}
    //                             />
    //                             <Input
    //                               type="password"
    //                               size="md"
    //                               onChange={(e) => {
    //                                 setPassword(e.target.value);
    //                               }}
    //                             />
    //                           </InputGroup>
    //                         </FormControl>

    //                         <Button
    //                           type="submit"
    //                           bg="#2da44e"
    //                           color="white"
    //                           size="sm"
    //                           _hover={{ bg: "#2c974b" }}
    //                           _active={{ bg: "#298e46" }}
    //                           fontWeight="500"
    //                         >
    //                           {text2}
    //                         </Button>
    //                       </Stack>
    //                     </form>
    //                     <Center fontSize="sm" spacing="1" marginTop="30px">
    //                       <Text>{text3}</Text>
    //                       <Link as={ReactRouterLink} to={route} color="#0969da">
    //                         <button>{text4}</button>
    //                       </Link>
    //                     </Center>
    //                   </CardBody>
    //                 </Card>
    //               </Stack>
    //             </Center>
    //           </Box>
    //         </WrapItem>
    //       </Wrap>
    //     </Box>
    //   </Box>
    // </Container>
  );
}
