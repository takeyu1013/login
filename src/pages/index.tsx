import type { NextPage } from "next";

import { useCallback, useMemo, MouseEventHandler, useContext } from "react";
import { GoogleAuthProvider, signInWithRedirect, signOut } from "firebase/auth";

import { AuthContext } from "./_app";

const Home: NextPage = () => {
  const { auth, name } = useContext(AuthContext);
  const provider = useMemo(() => new GoogleAuthProvider(), []);

  return (
    <div>
      <button
        onClick={useCallback<MouseEventHandler<HTMLButtonElement>>(
          (event) => {
            event.preventDefault();
            signInWithRedirect(auth, provider);
          },
          [auth, provider]
        )}
      >
        Login
      </button>
      <p>{name}</p>
      <button
        onClick={useCallback<MouseEventHandler<HTMLButtonElement>>(
          (event) => {
            event.preventDefault();
            signOut(auth);
          },
          [auth]
        )}
      >
        Logout
      </button>
    </div>
  );
};

export default Home;
