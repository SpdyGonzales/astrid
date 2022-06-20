import React, { useState } from "react";
import { UseMutateFunction, useMutation } from "react-query";
import { client } from "../utils/api";
export type Credentials = { email: string; password: string };
type UserResponse = {
  token: string;
  user: string;
  challenge: Record<string, number>;
};
const AuthContext = React.createContext<
  | {
      login: UseMutateFunction<
        UserResponse,
        unknown,
        {
          email: string;
          password: string;
        },
        unknown
      >;
      invite: UseMutateFunction<
        any,
        unknown,
        {
          email: string;
          difficulty: string;
        },
        unknown
      >;
      user: {
        user: string;
        token: string;
        challenge: Record<string, number>;
      } | null;
      isLoggingIn: boolean;
    }
  | undefined
>(undefined);

function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<UserResponse | null>(null);
  const postInvite = async (body: {
    email: string;
    difficulty: string;
  }): Promise<any> =>
    client("challenge/invite", {
      data: { email: body.email, difficulty: body.difficulty },
    });
  const { mutate: invite } = useMutation(postInvite, {});
  const login = async (body: {
    email: string;
    password: string;
  }): Promise<UserResponse> =>
    client("auth/login", {
      data: { email: body.email, password: body.password },
    });
  const { mutate, isLoading } = useMutation(login, {
    onSuccess: (data) => {
      setUser(data);
    },
  });
  const value = { user, login: mutate, invite, isLoggingIn: isLoading };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

function useAuth() {
  const context = React.useContext(AuthContext);
  if (context === undefined) {
    throw new Error(`useAuth must be used within a AuthProvider`);
  }
  return context;
}

function useClient() {
  const { user } = useAuth();
  const token = user?.token;
  return React.useCallback(
    (endpoint: string, config: any) => client(endpoint, { ...config, token }),
    [token]
  );
}

export { AuthProvider, useAuth, useClient };
