import Header from "../components/Header";
import MatchesList from "../components/MatchesList";

import { useState, useEffect, useCallback } from "react";

import { useNavigate } from "react-router-dom";

import { Box } from "@chakra-ui/react";

export default function Matches() {
  const [matches, setMatches] = useState([]);

  const [match, setMatch] = useState({});

  const [errorGet, setErrorGet] = useState(false);

  const getMatches = useCallback(async () => {
    const response = await fetch("http://server:5000:3000/matches", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    });

    if (response.status === 200) {
      const data = await response.json();
      setMatches(data.reverse());
      console.log(data);

      if (data.length === 0) {
        setErrorGet(true);
      }
    }
  }, []);

  async function createMatch() {
    const res = await fetch("http://server:5000:3000/matches", {
      method: "POST",
      headers: {
        "Content-Type": "application",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });

    const data = await res.json();

    switch (res.status) {
      case 201:
        setMatch(data);
        console.log(data);
        break;
      case 400:
        console.log(await res.json());
        break;
      default:
        console.log("error");
        break;
    }
  }

  const navigate = useNavigate();

  useEffect(() => {
    if (match._id) {
      navigate(`/matches/${match._id}`);
    }
  }, [match, navigate]);

  return (
    <Box className="matches-view" width="inherit" height="inherit">
      <Header />
      <Box
        className="matches-view-minus-header"
        height="calc(100vh - 64px)"
        position="absolute"
        top="64px"
        width="100%"
        display="flex"
        justifyContent="center"
        alignItems="center"
      >
        <MatchesList
          matches={matches}
          getMatches={getMatches}
          errorGet={errorGet}
          createMatch={createMatch}
        />
      </Box>
    </Box>
  );
}
