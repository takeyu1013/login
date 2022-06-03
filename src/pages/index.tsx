import type { NextPage } from "next";
import {
  FC,
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
  }, [auth]);

  const handleClick = useCallback<MouseEventHandler<HTMLButtonElement>>(
    (event) => {
      event.preventDefault();
      signInWithRedirect(auth, provider);
    },
    [auth, provider]
  );

  return (
    <div>
      <button onClick={handleClick}>Login</button>
      <p>{name}</p>
    </div>
  );
};

export default Home;
