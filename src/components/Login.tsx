"use client"; //Ensures that the SessionProvider is a client side component
//Keep components as server components and only "clientize" smaller components

//This ensures you kinda keep the server component benefits without loosing everything since the components are server components by default

//Research on the above reason a bit more

import React from "react";
import { signIn } from "next-auth/react";
import Image from "next/image";
import Logo from "../../assets/chatgpt_logo.png";

function Login() {
  return (
    <div className="bg-[#11A37F] h-screen flex flex-col items-center justify-center text-center">
      {/* Image component handles alot of optimisations i.e condenses the image, presents it in a certain way */}
      {/* So for it to work, you need to whitelist only the domains that you trust */}
      <Image src={Logo} width={300} height={300} alt="logo" />

      {/* If you leave the signIn brackets blank, it will take you to a window with 
      different providers, google, github e.t.c but since I have only one provider
      (google) set up, i'll just pass that provider in directly */}

      {/* On the frontend however, there will be an error since when the user presses the 
      button to sign in, google is extra paranoid and will not let the user in just yet */}

      {/* So you need to go to google and tell them that the domain is safe, so basically whitelist
      the domain. This means that even during deployment, the acquired domain will have to be 
      whitelisted as well */}

      {/* To do this, go to https://console.cloud.google.com/ and whitelist the domain*/}
      <button
        onClick={() => signIn("google")}
        className="text-white font-bold text-3xl animate-pulse"
      >
        Sign in to use ChatGPT
      </button>
    </div>
  );
}

export default Login;
