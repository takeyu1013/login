import type { NextPage } from "next";
import { MouseEventHandler, useCallback, useEffect, useState } from "react";
import {
  getAuth,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithRedirect,
  User,
} from "firebase/auth";
import { app } from "../firebase";

const Home: NextPage = () => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const auth = getAuth(app);
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      }
    });
  }, []);

  const handleClick = useCallback<MouseEventHandler<HTMLButtonElement>>(
    (event) => {
      event.preventDefault();

      const provider = new GoogleAuthProvider();
      const auth = getAuth(app);
      signInWithRedirect(auth, provider);
    },
    []
  );
  return (
    <div>
      <button onClick={handleClick}>Login</button>
      <p>{user && user.displayName}</p>
    </div>
  );
};

export default Home;
