import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useAuth, useClient } from "../../../contexts/auth-context";
import Button from "@mui/material/Button";
import {
  AstridLogo,
  SelectFieldForm,
  TextFieldForm,
} from "../../../components/lib";
import { Grid, Typography } from "@mui/material";
import { useMutation } from "react-query";
type EmailInvite = { email: string; difficulty: string };
function ChallengeInviter() {
  const client = useClient();
  const { user } = useAuth();
  const [response, setResponse] = useState<string | undefined>(undefined);
  const { mutate } = useMutation(
    async (data: EmailInvite) =>
      client("challenge/invite", {
        data: {
          email: data.email,
          difficulty: data.difficulty,
          challenger: user?.user,
        },
      }),
    {
      onSuccess: (data) => {
        setResponse(data);
      },
      onError: () => {
        setResponse("Did not manage to send. Try again");
      },
    }
  );

  const { control, handleSubmit } = useForm<EmailInvite>();
  return (
    /* "handleSubmit" will validate inputs before invoking "onSubmit"
     * Inline styling is not my prefered way but a quick way to get
     * an idea of the preferred style. A library with customizable style
     * components would be a better option long term.
     */
    <Grid
      container
      direction="column"
      style={{
        alignContent: "center",
        marginTop: 100,
      }}
    >
      <Grid item style={{ alignSelf: "center", marginBottom: 50 }}>
        <AstridLogo />
      </Grid>
      {response ? (
        <Typography variant="h5">{response}</Typography>
      ) : (
        <form>
          <Grid item>
            <TextFieldForm
              style={{ marginBottom: 10, width: 300 }}
              label="email"
              control={control}
              name="email"
              type="email"
              required
            />
          </Grid>
          <Grid item>
            <SelectFieldForm
              name="difficulty"
              style={{ marginBottom: 10, width: 300 }}
              control={control}
              label="Difficulty"
              type="string"
              required
              options={[
                { title: "Beginner", id: "beginner" },
                { title: "Intermediate", id: "intermediate" },
                { title: "Proficient", id: "proficient" },
              ]}
            />
          </Grid>
          <Grid container style={{ justifyContent: "center", marginTop: 10 }}>
            <Button
              onClick={handleSubmit((data) => mutate(data))}
              variant="contained"
            >
              Send challenge!
            </Button>
          </Grid>
        </form>
      )}
    </Grid>
  );
}

export default ChallengeInviter;
