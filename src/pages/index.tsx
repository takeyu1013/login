import type { NextPage } from "next";
import type { MouseEventHandler } from "react";

import { useCallback, useMemo, useContext } from "react";
import { GoogleAuthProvider, signInWithRedirect, signOut } from "firebase/auth";

import { AuthContext } from "./_app";

const Home: NextPage = () => {
  const { auth, name, isLoading } = useContext(AuthContext);
  const provider = useMemo(() => new GoogleAuthProvider(), []);
  const login = useCallback<MouseEventHandler<HTMLButtonElement>>(
    (event) => {
      event.preventDefault();
      signInWithRedirect(auth, provider);
    },
    [auth, provider]
  );
  const logout = useCallback<MouseEventHandler<HTMLButtonElement>>(
    (event) => {
      event.preventDefault();
      signOut(auth);
    },
    [auth]
  );

  return (
    <div>
      {!name ? (
        <button onClick={login}>Login</button>
      ) : (
        <button onClick={logout}>Logout</button>
      )}
      <p>{isLoading ? "Loading..." : name}</p>
    </div>
  );
};

export default Home;
