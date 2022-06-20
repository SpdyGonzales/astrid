import * as React from "react";
import { Card, Grid, List, ListItem, Typography } from "@mui/material";
import { useAuth } from "../../contexts/auth-context";
import ChallengeInviter from "./components/challenge-inviter";
import { CircularProgressWithLabel } from "../../components/lib";

function AuthenticatedApp() {
  const { user } = useAuth();
  return (
    <Grid>
      <ChallengeInviter />
      {user?.challenge && (
        <Grid
          container
          direction="column"
          justifyContent="center"
          style={{ marginTop: 100, alignContent: "center" }}
        >
          <Typography variant="h6">Completed challenges scoreboard</Typography>
          <Card>
            <List>
              {Object.entries(user.challenge).map(([phrase, score]) => (
                <ListItem key={phrase}>
                  <Typography>{phrase}</Typography>
                  <CircularProgressWithLabel value={score} />
                </ListItem>
              ))}
            </List>
          </Card>
        </Grid>
      )}
    </Grid>
  );
}

export default AuthenticatedApp;
