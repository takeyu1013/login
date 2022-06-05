import type { SupabaseClient, User } from "@supabase/supabase-js";
import type { AppProps } from "next/app";
import { createContext, useEffect, useState } from "react";
import { supabase } from "../utils/supabaseClient";

const CONTEXT: Readonly<{
  auth: SupabaseClient["auth"];
  email: User["email"];
}> = { auth: supabase.auth, email: undefined } as const;

export const AuthContext = createContext(CONTEXT);

const App = ({ Component, pageProps }: AppProps) => {
  const { auth } = CONTEXT;
  const [email, setEmail] = useState(CONTEXT.email);
  useEffect(() => {
    auth.onAuthStateChange((_event, session) => {
      setEmail(session?.user?.email);
    });
    setEmail(auth.user()?.email);
  }, [auth]);

  return (
    <AuthContext.Provider value={{ auth, email }}>
      <Component {...pageProps} />
    </AuthContext.Provider>
  );
};

export default App;
