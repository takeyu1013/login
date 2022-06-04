import type { Auth, User } from "firebase/auth";
import type { AppProps } from "next/app";

import { getAuth, onAuthStateChanged } from "firebase/auth";
import { createContext, FC, ReactNode, useEffect, useState } from "react";

import { app } from "../firebase";

const CONTEXT: {
  auth: Auth;
  name: User["displayName"];
} = { auth: getAuth(app), name: null } as const;

export const AuthContext = createContext(CONTEXT);

const AuthProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const { auth } = CONTEXT;
  const [name, setName] = useState(CONTEXT.name);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setName(user ? user.displayName : null);
    });
  }, [auth]);

  return (
    <AuthContext.Provider value={{ auth, name }}>
      {children}
    </AuthContext.Provider>
  );
};

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <Component {...pageProps} />
    </AuthProvider>
  );
}

export default MyApp;
