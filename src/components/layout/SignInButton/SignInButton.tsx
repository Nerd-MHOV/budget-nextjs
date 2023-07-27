"use client";

import { signIn, signOut, useSession } from "next-auth/react";
import React from "react";

const SignInButton = () => {
  const { data: session } = useSession();

  console.log(session?.user);

  if (session && session.user) {
    return (
      <div>
        <p>{session.user.name}</p>
        <button onClick={() => signOut()}>Sign Out</button>
      </div>
    );
  }
  return (
    <div>
      <button onClick={() => signIn()}>Sign In</button>
    </div>
  );
};

export default SignInButton;
