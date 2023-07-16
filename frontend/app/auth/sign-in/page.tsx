"use client";

import { Login } from "@/components";
import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";

export default function SignIn() {
  const router = useRouter();
  const searchParam = useSearchParams();
  return (
    <Login
      onSubmit={async (credentials) => {
        const res = await signIn("credentials", {
          ...credentials,
          redirect: false,
        });
        if (!res?.ok) {
          return;
        }
        const callbackUrl = searchParam.get("callbackUrl");
        const decodedUrl = callbackUrl
          ? decodeURIComponent(callbackUrl)
          : undefined;
        router.replace(decodedUrl ?? "/");
      }}
    />
  );
}
