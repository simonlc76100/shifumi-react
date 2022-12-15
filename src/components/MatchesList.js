import Match from "./Match";

import { useState, useEffect } from "react";

export default function MatchesList() {
  const [matches, setMatches] = useState([]);

  useEffect(() => {
    async function getMatches() {
      const response = await fetch("http://fauques.freeboxos.fr:3000/matches", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      });

      if (response.status === 200) {
        const data = await response.json();
        setMatches(data);
        console.log(data);
      }
    }

    getMatches();
  }, []);

  return (
    <div>
      {matches.map((match) => (
        <Match key={match._id} match={match} />
      ))}
    </div>
  );
}
