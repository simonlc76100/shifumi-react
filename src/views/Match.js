import Header from "../components/Header";
import MatchDisplay from "../components/MatchDisplay";

import { useParams } from "react-router-dom";

import { Box } from "@chakra-ui/react";

export default function Match() {
  const { idParam } = useParams();

  return (
    <Box className="match-view" width="inherit" height="inherit">
      <Header />
      <Box
        className="match-view-minus-header"
        height="calc(100vh - 64px)"
        position="absolute"
        top="64px"
        width="100%"
        display="flex"
        justifyContent="center"
        alignItems="center"
      >
        <MatchDisplay idParam={idParam} />
      </Box>
    </Box>
  );
}
