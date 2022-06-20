import React from "react";
import Button from "@mui/material/Button";
import { AstridLogo } from "../../../../../components/lib";
import { Grid, Typography } from "@mui/material";
function ChallengeIntroduction({
  setIntro,
}: {
  setIntro: (intro: boolean) => void;
}) {
  return (
    <Grid
      container
      direction="column"
      style={{
        alignContent: "center",
      }}
    >
      <Grid style={{ alignSelf: "center" }}>
        <AstridLogo />
      </Grid>
      <Grid item style={{ alignSelf: "center", marginTop: 50 }}>
        <Typography variant="h5">Welcome to the English challenge</Typography>
      </Grid>
      <Grid item style={{ justifyContent: "center" }}>
        <Typography
          display="block"
          style={{ textAlign: "center" }}
          variant="body1"
        >
          You will be given a few short English tests. There is no time limit.
        </Typography>
        <Typography style={{ alignSelf: "center" }} variant="body1">
          Please make sure you allow us to use your microphone when asked, and
          click "Next" when you are ready
        </Typography>
      </Grid>
      <Grid item style={{ alignSelf: "center" }}>
        <Button onClick={() => setIntro(false)}>Next</Button>
      </Grid>
    </Grid>
  );
}

export default ChallengeIntroduction;
