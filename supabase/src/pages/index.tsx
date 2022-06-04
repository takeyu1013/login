import type { User } from "@supabase/supabase-js";
import type { NextPage } from "next";
import type { MouseEventHandler } from "react";

import { useCallback, useEffect, useState } from "react";
import { supabase } from "../utils/supabaseClient";

const Home: NextPage = () => {
  const auth = supabase.auth;
  const [name, setName] = useState<User["email"]>(undefined);
  useEffect(() => {
    auth.onAuthStateChange((_event, session) => {
      setName(session && session.user ? session.user.email : undefined);
    });
  });
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
      <p>{name}</p>
    </div>
  );
};

export default Home;
