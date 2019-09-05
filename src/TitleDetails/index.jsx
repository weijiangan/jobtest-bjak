import React, { useState, useEffect } from "react";
import theme from "../app.css";
import styles from "./styles.css";

function TitleDetails({ match, ...props }) {
  const [state, setState] = useState({ people: [], images: [], meta: {} });
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
  const heroImage =
    state.images.find(image => image.type === "SPOTLIGHT") ||
    state.images.find(image => image.type === "BACKGROUND");
  const posterImage = state.images.find(image => image.type === "POSTER");
  const { releaseYear, ageRating, running_time_friendly: runtime } = state.meta;

  return (
    <>
      <div
        style={{
          height: 400,
          background: `linear-gradient(rgba(0,0,0, 0.3) , #333), no-repeat center / cover url("${
            heroImage ? heroImage.url : undefined
          }")`
        }}
      />
      <div className={theme.container} style={{ marginTop: -100 }}>
        <div
          style={{
            display: "flex",
            alignItems: "flex-end",
            marginBottom: "2rem"
          }}
        >
          <div className={styles.posterWrapper}>
            <img src={posterImage ? posterImage.url : undefined} />
          </div>
          <div className={styles.heading}>
            <div className={styles.pill}>{state.as}</div>
            <h1 className={styles.titleName}>{state.title}</h1>
            <div className={styles.metaBar}>
              {releaseYear && <div>{releaseYear}</div>}
              {runtime && <div>{runtime}</div>}
              {ageRating && <div>{ageRating}</div>}
            </div>
          </div>
        </div>
        <p className={styles.description}>{state.description}</p>
        <h2>Casts</h2>
        <p>{aaa(casts)}</p>
        <h2>Directors</h2>
        <p>{aaa(directors)}</p>
      </div>
    </>
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
