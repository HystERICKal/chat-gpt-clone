"use client"; //use this since we are making use of hooks now i.e (useSession)

import { sign } from "crypto";
/* eslint-disable @next/next/no-img-element */

// The comented line above enables me to use the <img/> tag without errors
// since next.js wants me to use <Image/> instead.

import { useSession, signOut } from "next-auth/react";
import React from "react";
import NewChat from "./NewChat";
import { useCollection } from "react-firebase-hooks/firestore";
import { collection, orderBy, query } from "firebase/firestore";
import { db } from "../../firebase";
import ChatRow from "./ChatRow";
import ModelSelection from "./ModelSelection";

function SideBar() {
  //rename the data to be the session variable
  const { data: session } = useSession();
  // console.log(session);

  //react-firebase-hooks is installed to help establish a realtime connection with the database
  //In its documentation under 'Cloud Firestore Hooks' it shows how to connect to the backend in realtime using 'useCollection' hook

  const [chats, loading, error] = useCollection(
    //pass in the actual directory that you're going for
    //This is dependent on the session because the email will be used to find that collection
    //This means, the session has to exist
    //Secondly, one has to connect to the firebase collection

    //The code below basically checks if there is an existing session
    //Then goes ahead to grab the collection
    //Then goes into users>email>chats and grabs all the chats

    //The query and order by enables new chat to be created at the top
    session &&
      query(
        collection(db, "users", session.user?.email!, "chats"),
        orderBy("createdAt", "desc")
      )
  );

  // console.log(chats);

  return (
    <div className="p-2 flex flex-col h-screen">
      <div className="flex-1">
        <div>
          {/* NewChat */}
          <NewChat />

          {/* Select Model */}
          <div className="hidden sm:inline">
            <ModelSelection />

            {/* Now here useSWR which is a react Hook 
            for data fetching made by the guys at vercel
            The reason why this is used, is because it
            allows for data to be fetched in a really efficient way
            This is because data is fetched based on cached
            key value pairs. Which means,it doesn't matter which component
            One is in. You don't even need a global data layout 
            like readouts or recall */}
          </div>

          <div className="flex flex-col space-y-2 my-2">
            {loading && (
              <div className="animate-pulse text-center text-white">
                <p>Loading Chats...</p>
              </div>
            )}

            {/* Previous Chats go here */}
            {/* Map through the ChatRows */}
            {chats?.docs.map((chat) => (
              <ChatRow key={chat.id} id={chat.id} />
            ))}
          </div>
        </div>
      </div>

      {/* CHeck if there is a session before displaying profile pic at the bottom */}
      {session && (
        <img
          onClick={() => signOut()}
          src={session.user?.image!}
          alt="Profile picture "
          className="h-12 w-12 rounded-full cursor-pointer mx-auto mb-2
          hover:opacity-50"
        />
      )}
    </div>
  );
}

export default SideBar;
