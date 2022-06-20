import React, { useState } from "react";
import Button from "@mui/material/Button";
import { CircularProgressWithLabel } from "../../../../../components/lib";
import KeyboardVoiceIcon from "@mui/icons-material/KeyboardVoice";
import { Grid, IconButton, Typography } from "@mui/material";
import { useMutation } from "react-query";
import { useClient } from "../../../../../contexts/auth-context";
import { useVoiceRecorder } from "../../../../../utils/audio-recorder";
type Challenge = { token: string; difficulty: string; challenger: string };
type ChallengeGetResponse = { challenge: Challenge; phrases: string[] };
type ChallengePostResponse = { score: number };
function ChallengeCard({ data }: { data: ChallengeGetResponse }) {
  const client = useClient();
  const PHRASE_NUMBER = 5;

  /**
   * Functions could be moved to a helper function for better structure
   */

  const getScore = async (audio: Blob): Promise<ChallengePostResponse> => {
    const formData = new FormData();
    formData.append("audio", audio);
    formData.append("target_phrase", data.phrases[order]);
    formData.append("difficulty_level", data.challenge.difficulty);
    return fetch("http://localhost:4000/challenge/score", {
      method: "POST",
      body: formData,
    }).then(async (response) => {
      if (response.status === 401) {
        return Promise.reject({ message: "Please re-authenticate." });
      }
      const data = await response.json();
      if (response.ok) {
        return data;
      } else {
        return Promise.reject(data);
      }
    });
  };
  const { mutate } = useMutation(getScore, {
    onSuccess: (data) => {
      setScore(data.score);
    },
  });

  const finishChallenge = async (
    result: Record<string, number>
  ): Promise<Response> =>
    client("challenge/post", {
      data: {
        results: result,
        token: data.challenge.token,
        challenger: data.challenge.challenger,
      },
    });
  const { mutate: postChallenge } = useMutation(finishChallenge);
  const [score, setScore] = useState(0);
  const [result, setResult] = useState<Record<string, number>>({});
  const [order, setOrder] = useState(0);
  const { isRecording, stop, start } = useVoiceRecorder((data) => {
    mutate(data);
  });

  return (
    <>
      {order < PHRASE_NUMBER ? (
        <>
          <Grid
            item
            style={{
              marginBottom: 20,
              alignSelf: "center",
              textAlign: "center",
            }}
          >
            <Typography variant="h5">Phrase {order + 1} out of 5</Typography>
            <Typography variant="h5">{data.phrases[order]}</Typography>
            <Grid
              style={{ marginTop: 20 }}
              item
              container
              flexDirection="row"
              justifyContent="center"
            >
              <IconButton
                size="large"
                onMouseDown={() => start()}
                onMouseUp={() => {
                  stop();
                }}
                style={{
                  marginRight: 40,
                  backgroundColor: isRecording ? "#ffbea8" : "#ffdc4a",
                }}
              >
                <KeyboardVoiceIcon />
              </IconButton>
              <CircularProgressWithLabel value={score} />
            </Grid>
          </Grid>
          <Grid item style={{ alignSelf: "center" }}>
            <Button
              onClick={() => {
                order < PHRASE_NUMBER - 1
                  ? setResult({ ...result, [data.phrases[order]]: score })
                  : postChallenge({ ...result, [data.phrases[order]]: score });
                setOrder(order + 1);
                setScore(0);
              }}
            >
              {order < 4 ? "Next" : "Finish"}
            </Button>
          </Grid>
        </>
      ) : (
        <Grid>
          <Typography variant="h4">Thanks for taking the challenge.</Typography>
          <Typography variant="h5">
            Your results are now sent to your challenger.
          </Typography>
        </Grid>
      )}
    </>
  );
}

export default ChallengeCard;
