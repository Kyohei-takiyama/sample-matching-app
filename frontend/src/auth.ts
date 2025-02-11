import NextAuth from "next-auth";
import Cognito from "next-auth/providers/cognito";

export const { auth, handlers, signIn, signOut } = NextAuth({
  providers: [
    Cognito({
      id: "cognito",
      checks: ["state", "nonce"],
      authorization: {
        params: {
          scope: "openid email profile",
          prompt: "login",
        },
      },
    }),
    Cognito({
      id: "google",
      checks: ["state", "nonce"],
      authorization: {
        params: {
          identity_provider: "Google",
          scope: "openid email profile",
        },
      },
    }),
  ],
  debug: true,
});
