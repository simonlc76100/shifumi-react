import Navbar from "../components/Navbar";
import MatchesList from "../components/MatchesList";
import "../assets/styles/Matches.css";

import { useState, useCallback } from "react";
import { Center } from "@chakra-ui/react";

export default function Matches() {
  const [matches, setMatches] = useState([]);
  const [title, setTitle] = useState("");
  const [errorCreate, setErrorCreate] = useState(false);

  const getMatches = useCallback(async () => {
    console.log("getMatches");
    const response = await fetch("http://fauques.freeboxos.fr:3000/matches", {
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
        setTitle("You have no games yet");
      } else {
        setTitle("Your games");
      }
    }
  }, []);

  async function createMatch() {
    const res = await fetch("http://fauques.freeboxos.fr:3000/matches", {
      method: "POST",
      headers: {
        "Content-Type": "application",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });

    switch (res.status) {
      case 201:
        console.log(await res.json());
        getMatches();
        break;
      case 400:
        console.log(await res.json());
        setErrorCreate(true);
        break;
      default:
        console.log("error");
        break;
    }
  }

  return (
    <div className="matches-view">
      <Navbar />
      <Center>
        <MatchesList
          matches={matches}
          title={title}
          getMatches={getMatches}
          errorCreate={errorCreate}
          setErrorCreate={setErrorCreate}
          createMatch={createMatch}
        />
      </Center>
    </div>
  );
}
