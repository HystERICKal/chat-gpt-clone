"use client"; //Ensures that the SessionProvider is a client side component
//Keep components as server components and only "clientize" smaller components

//This ensures you kinda keep the server component benefits without loosing everything since the components are server components by default

//Research on the above reason a bit more

//In the new NEXT.js 13 way, components are also server components by default
//This means things like action handlers, useState, useEffect
//Basically anything that requires a window or a local state, needs to be a client object

import { Session } from "next-auth";
import { SessionProvider as Provider } from "next-auth/react"; //This just renames SessionProvider as Provider

//Type definitions
type Props = {
  children: React.ReactNode;
  //type session or null. Session is from NEXTauth and is imported above
  session: Session | null;
};

// Children means, anything inside SessionProvider tag inside layout.tsx

export function SessionProvider({ children, session }: Props) {
  return <Provider>{children}</Provider>;
}
