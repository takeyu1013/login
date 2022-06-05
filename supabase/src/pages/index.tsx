import type { User } from "@supabase/supabase-js";
import type { NextPage } from "next";
import type { MouseEventHandler } from "react";

import { useCallback, useEffect, useState } from "react";
import { supabase } from "../utils/supabaseClient";

const Home: NextPage = () => {
  const { auth } = supabase;
  const [email, setEmail] = useState<User["email"]>(undefined);
  useEffect(() => {
    auth.onAuthStateChange((_event, session) => {
      setEmail(session?.user?.email);
    });
    const user = auth.user();
    setEmail(user?.email);
  }, [auth]);
  const login: MouseEventHandler<HTMLButtonElement> = useCallback(
    (event) => {
      event.preventDefault();
      auth.signIn({ provider: "google" });
    },
    [auth]
  );

  return (
    <div>
      <button onClick={login}>Login</button>
      <p>{email}</p>
    </div>
  );
};

export default Home;
