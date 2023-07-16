import { FC } from "react";
import { signIn } from "next-auth/react";

export const LoginButton: FC = () => {
  return (
    <button
      className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-purple-700 rounded-md hover:bg-purple-600 focus:outline-none focus:bg-purple-600"
      onClick={() => signIn()}
    >
      Sign In
    </button>
  );
};
