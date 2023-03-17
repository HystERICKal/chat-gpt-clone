// API backend endpoints are still in the pages Folder

import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

export const authOptions = {
  // Configure one or more authentication providers

  // The exclamation mark down below is to just ensure that the ID and secret keys are present
  //The code on this page has been copied from NEXT_AUTH website
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID!,
      clientSecret: process.env.GOOGLE_SECRET!,
    }),
    // ...add more providers here
  ],
};
export default NextAuth(authOptions);
