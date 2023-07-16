import jwtDecode from "jwt-decode";
import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const options: NextAuthOptions = {
  debug: true,
  session: { strategy: "jwt" },
  pages: {
    signIn: "/auth/sign-in",
  },
  providers: [
    CredentialsProvider({
      id: "credentials",
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const res = await fetch("http://localhost:8000/signin/", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(credentials),
        });

        if (!res.ok) {
          return null;
        }

        const data = await res.json();

        if (!data || !data.access_token) {
          return null;
        }

        const decoded = jwtDecode<{
          user_id: number;
          email: string;
          info: string;
          exp: number;
        }>(data.access_token);

        return {
          id: String(decoded.user_id),
          name: undefined,
          email: decoded.email,
          image: undefined,
          accessToken: data.access_token,
        };
      },
    }),
  ],
  callbacks: {
    // signIn: async ({ user, account, profile, email, credentials }) => {
    //   return true;
    // },
    // redirect: async ({ url, baseUrl }) => {
    //   return baseUrl;
    // },
    jwt: async ({ token, user, account, profile }) => {
      console.log("JWT", { token, user, account, profile });
      return { ...token, ...user };
    },
    session: ({ session, user, token }) => {
      session.user = token;
      console.log("SESSION", { session, user, token });
      return session;
    },
  },
};

const handler = NextAuth(options);

export { handler as GET, handler as POST };
