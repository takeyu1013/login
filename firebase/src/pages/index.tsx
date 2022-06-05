import type { NextPage } from "next";

import { useContext } from "react";
import { GoogleAuthProvider, signInWithRedirect, signOut } from "firebase/auth";

import { AuthContext } from "./_app";

const Home: NextPage = () => {
  const { auth, name } = useContext(AuthContext);

  return (
    <div>
      {!name ? (
        <button
          onClick={(event) => {
            event.preventDefault();
            signInWithRedirect(auth, new GoogleAuthProvider());
          }}
        >
          Login
        </button>
      ) : (
        <button
          onClick={(event) => {
            event.preventDefault();
            signOut(auth);
          }}
        >
          Logout
        </button>
      )}
      <p>{name}</p>
    </div>
  );
};

export default Home;
