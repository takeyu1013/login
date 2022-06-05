import type { NextPage } from "next";
import { useContext } from "react";

import { AuthContext } from "./_app";

const Home: NextPage = () => {
  const { auth, email } = useContext(AuthContext);

  return (
    <div>
      {!email ? (
        <button
          onClick={(event) => {
            event.preventDefault();
            auth.signIn({ provider: "google" });
          }}
        >
          Login
        </button>
      ) : (
        <button
          onClick={(event) => {
            event.preventDefault();
            auth.signOut();
          }}
        >
          Logout
        </button>
      )}
      <p>{email}</p>
    </div>
  );
};

export default Home;
