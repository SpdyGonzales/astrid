import React from "react";
import { useForm } from "react-hook-form";
import { Credentials, useAuth } from "../../../contexts/auth-context";
import Button from "@mui/material/Button";
import { AstridLogo, TextFieldForm } from "../../../components/lib";
import { Grid } from "@mui/material";
/**
 * I implemented token auth instead of session with the mobile application
 * in mind. The need to scale with an authentication method that’s
 * mobile-ready will draw many developers to using tokens
 */
function Login() {
  const { control, handleSubmit } = useForm<Credentials>();
  const { login } = useAuth();

  return (
    /* "handleSubmit" will validate inputs before invoking "onSubmit"
     * Inline styling is not my prefered way but a quick way to get
     * an idea of the prefered style
     */
    <Grid
      container
      direction="column"
      style={{
        alignContent: "center",
        marginTop: 150,
      }}
    >
      <Grid item style={{ alignSelf: "center", marginBottom: 20 }}>
        <AstridLogo />
      </Grid>
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
          <TextFieldForm
            style={{ marginBottom: 30, width: 300 }}
            label="password"
            control={control}
            name="password"
            type="password"
            required
          />
        </Grid>
        <Grid container style={{ justifyContent: "center" }}>
          <Button
            onClick={handleSubmit((data) => login(data))}
            variant="contained"
          >
            Login
          </Button>
        </Grid>
      </form>
    </Grid>
  );
}

export default Login;
