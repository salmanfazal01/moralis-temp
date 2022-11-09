import React from "react";
import { handleGoogleLogin, handleSignOut } from "@lib/auth";
import { useAppSelector } from "@hooks/useRedux";

const Login = () => {
  const { user } = useAppSelector((state) => state.user);

  console.log(user);

  return (
    <div>
      <button onClick={handleGoogleLogin}>Login with google</button>
      <button onClick={handleSignOut}>Sign out</button>
    </div>
  );
};

export default Login;
