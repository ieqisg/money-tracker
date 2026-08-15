
import { createAuthClient } from "better-auth/react";
import { inferAdditionalFields } from "better-auth/client/plugins";
/* const API_URL = import.meta.env.VITE_API_URL; */
export const authClient = createAuthClient({
  baseURL:/*  API_URL || */ "http://localhost:8000/",
  plugins: [
    inferAdditionalFields({
      user: {
        isProfileComplete: {
          type: "boolean",
          input: false,
        },
      },
    }),
  ],
});

export const {
  signIn,
  signUp,
  signOut,
  useSession,
} = authClient;

