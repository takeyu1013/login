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
  User,
} from "firebase/auth";
import { app } from "../firebase";

const Home: NextPage = () => {
  const { auth, provider } = useMemo(() => {
    const auth = getAuth(app);
    const provider = new GoogleAuthProvider();
    return { auth, provider };
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
    </div>
  );
};

export default Home;
