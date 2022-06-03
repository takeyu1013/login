import type { NextPage } from "next";
import {
  MouseEventHandler,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import {
  getAuth,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithRedirect,
  signOut,
  User,
} from "firebase/auth";
import { app } from "../firebase";

const Home: NextPage = () => {
  const { auth, provider } = useMemo(() => {
    return { auth: getAuth(app), provider: new GoogleAuthProvider() };
  }, []);
  const [name, setName] = useState<User["displayName"]>(null);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setName(user.displayName);
      }
    });
  }, []);

  return (
    <div>
      <button
        onClick={useCallback<MouseEventHandler<HTMLButtonElement>>((event) => {
          event.preventDefault();
          signInWithRedirect(auth, provider);
        }, [])}
      >
        Login
      </button>
      <p>{name}</p>
      <button
        onClick={useCallback<MouseEventHandler<HTMLButtonElement>>((event) => {
          event.preventDefault();
          signOut(auth).then(() => {
            onAuthStateChanged(auth, (user) => {
              if (!user) {
                setName(null);
              }
            });
          });
        }, [])}
      >
        Logout
      </button>
    </div>
  );
};

export default Home;
