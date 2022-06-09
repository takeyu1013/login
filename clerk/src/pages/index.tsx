import { useAuth, useSignIn, useUser } from "@clerk/nextjs";
import type { NextPage } from "next";

const Home: NextPage = () => {
  const { signIn } = useSignIn();
  const { signOut } = useAuth();
  const { user, isSignedIn } = useUser();

  return (
    <div>
      {isSignedIn ? (
        <div>
          <button
            onClick={(event) => {
              event.preventDefault();
              signOut();
            }}
          >
            Logout
          </button>
          <p>{user.fullName}</p>
        </div>
      ) : (
        <button
          onClick={(event) => {
            event.preventDefault();
            signIn?.authenticateWithRedirect({
              strategy: "oauth_google",
              redirectUrl: "/",
              redirectUrlComplete: "/",
            });
          }}
        >
          Login
        </button>
      )}
    </div>
  );
};

export default Home;
