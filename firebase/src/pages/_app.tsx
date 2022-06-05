import type { Auth, User } from "firebase/auth";
import type { AppProps } from "next/app";

import { getAuth, onAuthStateChanged } from "firebase/auth";
import { createContext, useEffect, useState } from "react";

import { app } from "../firebase";

const CONTEXT: Readonly<{
  auth: Auth;
  name: User["displayName"];
  isLoading: boolean;
}> = { auth: getAuth(app), name: null, isLoading: false } as const;

export const AuthContext = createContext(CONTEXT);

const App = ({ Component, pageProps }: AppProps) => {
  const { auth } = CONTEXT;
  const [name, setName] = useState(CONTEXT.name);
  const [isLoading, setIsLoading] = useState(CONTEXT.isLoading);

  useEffect(() => {
    setIsLoading(true);
    onAuthStateChanged(auth, (user) => {
      setName(user && user.displayName);
      setIsLoading(false);
    });
  }, [auth]);

  return (
    <AuthContext.Provider value={{ auth, name, isLoading }}>
      <Component {...pageProps} />
    </AuthContext.Provider>
  );
};

export default App;
