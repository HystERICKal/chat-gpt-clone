"use client";

import { PlusIcon } from "@heroicons/react/24/outline";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

import React from "react";
import { db } from "../../firebase";

function NewChat() {
  //This is used to direct users to a new screen afterwards
  const router = useRouter(); //make sure this is imported from next/navigation and not next/router

  //Pull user info from the session
  const { data: session } = useSession(); //This just renames 'data' to 'session'

  const createNewChat = async () => {
    //Push a value into the firestore database
    const doc = await addDoc(
      //Specify the collection (argument 1)
      collection(db, "users", session?.user?.email!, "chats"),
      {
        //The data that we gonna store in the db(argument 2)
        userId: session?.user?.email!,
        createdAt: serverTimestamp(),
      }
    );

    //Redirect the user to the chat screen
    //Uses string interpolation
    router.push(`/chat/${doc.id}`);
  };

  return (
    <div onClick={createNewChat} className="border-gray-700 border chatRow">
      <PlusIcon className="h-4 w-4" />
      <p>New Chat</p>
    </div>
  );
}

export default NewChat;
