"use client";

import { useSession } from "next-auth/react";
import Link from "next/link";
import { FC } from "react";
import { LogoutButton } from "./Button";

export const AppBar: FC = () => {
  const { data: session } = useSession();
  return (
    <div className="bg-gradient-to-b from-cyan-50 to-cyan-200 p-2 flex gap-5">
      <Link href="/">Home</Link>
      <div className="ml-auto flex gap-2">
        {session?.user && (
          <>
            <p className="text-sky-600">{session.user.name}</p>
            <LogoutButton />
          </>
        )}
      </div>
    </div>
  );
};
