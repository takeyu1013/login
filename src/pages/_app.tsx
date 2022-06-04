import type { Auth, User } from "firebase/auth";
import type { AppProps } from "next/app";

import { getAuth, onAuthStateChanged } from "firebase/auth";
import { createContext, useEffect, useState } from "react";

import { app } from "../firebase";

const CONTEXT: {
  auth: Auth;
  name: User["displayName"];
} = { auth: getAuth(app), name: null } as const;

export const AuthContext = createContext(CONTEXT);

const App = ({ Component, pageProps }: AppProps) => {
  const { auth } = CONTEXT;
  const [name, setName] = useState(CONTEXT.name);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setName(user ? user.displayName : null);
    });
  }, [auth]);

  return (
    <AuthContext.Provider value={{ auth, name }}>
      <Component {...pageProps} />
    </AuthContext.Provider>
  );
};

export default App;
