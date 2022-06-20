import React, { useState } from "react";
import { CircularProgress, Grid, Typography } from "@mui/material";
import { useQuery } from "react-query";
import { useClient } from "../../../../contexts/auth-context";
import ChallengeCard from "./components/challenge-card";
import ChallengeIntroduction from "./components/challenge-introduction";
type Challenge = { token: string; difficulty: string; challenger: string };
type ChallengeGetResponse = { challenge: Challenge; phrases: string[] };

/**
 * A challengeId has not function in this case, but in case we want to be
 * able to go back and adjust the prior exercises adding a id to the query key
 * on line 17 could make that implementation easier. Instead of saving
 * to local storage. Response on mutate could be enough to fetch next question otherwise
 */
function Challenge({ id }: { id: string }) {
  const client = useClient();
  const [intro, setIntro] = useState(true);
  const { data, isLoading } = useQuery<ChallengeGetResponse>("challenge", () =>
    client("challenge/get?token=" + id, {})
  );
  return (
    <Grid
      container
      direction="column"
      style={{
        alignContent: "center",
        marginTop: 200,
      }}
    >
      {data ? (
        intro ? (
          <ChallengeIntroduction setIntro={setIntro} />
        ) : (
          <ChallengeCard data={data} />
        )
      ) : isLoading ? (
        <CircularProgress />
      ) : (
        <Typography>Invitation has expired</Typography>
      )}
    </Grid>
  );
}

export default Challenge;
