"use client";

import { signIn, useSession } from "next-auth/react";
import { useEffect } from "react";

export default function Index() {
  const { data: session } = useSession();
  useEffect(() => {
    if (!session?.user) {
      signIn();
    }
  }, [session?.user]);

  return <></>;
}
