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
        const users = [
          { id: "1", email: "user1@example.com", password: "password1" },
          { id: "2", email: "user2@example.com", password: "password2" },
          { id: "3", email: "abc@abc", password: "123" },
        ];

        const user = users.find((user) => user.email === credentials?.email);
        console.log(user);

        if (user && user?.password === credentials?.password) {
          return {
            id: user.id,
            name: user.email,
            email: user.email,
            role: "admin",
          };
        } else {
          return null;
        }
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
      console.log({ token, user, account, profile });
      return token;
    },
    session: ({ session, user, token }) => {
      console.log({ session, user, token });
      return session;
    },
  },
};

const handler = NextAuth(options);

export { handler as GET, handler as POST };
