import React, { useState, useEffect } from "react";
import styles from "../app.css";

function TitleDetails({ match, ...props }) {
  const [state, setState] = useState({ people: [] });
  useEffect(() => {
    (async function load() {
      const data = await fetch(
        `https://cdn-discover.hooq.tv/v1.2/discover/titles/${match.params.id}`
      ).then(response => response.json());
      console.log(data);
      setState(data.data);
    })();
  }, []);

  const casts = state.people.filter(item => item.role === "CAST");
  const directors = state.people.filter(item => item.role === "DIRECTOR");

  return (
    <div className={styles.container}>
      <h1>{state.title}</h1>
      <p>{state.description}</p>
      <p>Casts: {aaa(casts)}</p>
      <p>Directors: {aaa(directors)}</p>
    </div>
  );
}

function aaa(casts) {
  return casts.reduce(
    (acc, cur, idx) =>
      `${acc}${cur.name}${idx === casts.length - 1 ? "" : ", "}`,
    ""
  );
}

export default TitleDetails;
