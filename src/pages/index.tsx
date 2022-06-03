import type { NextPage } from "next";
import type { MouseEventHandler } from "react";
import type { User } from "firebase/auth";

import { useCallback, useEffect, useMemo, useState } from "react";
import {
  getAuth,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithRedirect,
  signOut,
} from "firebase/auth";

import { app } from "../firebase";

const Home: NextPage = () => {
  const { auth, provider } = useMemo(() => {
    return { auth: getAuth(app), provider: new GoogleAuthProvider() };
  }, []);
  const [name, setName] = useState<User["displayName"]>(null);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setName(user ? user.displayName : null);
    });
  }, [auth]);

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
