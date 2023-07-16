"use client";

import { signIn, useSession } from "next-auth/react";
import { useEffect } from "react";

export default function Index() {
  const { data: session, status } = useSession();
  useEffect(() => {
    if (status === "unauthenticated") {
      signIn();
    }
  }, [status]);

  return <></>;
}
