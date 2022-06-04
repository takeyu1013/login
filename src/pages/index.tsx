import type { NextPage } from "next";

import { useCallback, useMemo, MouseEventHandler, useContext } from "react";
import { GoogleAuthProvider, signInWithRedirect, signOut } from "firebase/auth";

import { AuthContext } from "./_app";

const Home: NextPage = () => {
  const { auth, name, isLoading } = useContext(AuthContext);
  const provider = useMemo(() => new GoogleAuthProvider(), []);
  const Login = useCallback<MouseEventHandler<HTMLButtonElement>>(
    (event) => {
      event.preventDefault();
      signInWithRedirect(auth, provider);
    },
    [auth, provider]
  );
  const Logout = useCallback<MouseEventHandler<HTMLButtonElement>>(
    (event) => {
      event.preventDefault();
      signOut(auth);
    },
    [auth]
  );

  return (
    <div>
      {!name ? (
        <button onClick={Login}>Login</button>
      ) : (
        <button onClick={Logout}>Logout</button>
      )}
      <p>{isLoading ? "Loading..." : name}</p>
    </div>
  );
};

export default Home;
