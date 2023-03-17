"use client";

import { PaperAirplaneIcon } from "@heroicons/react/24/solid";
import { FormEvent, useState } from "react";
import { useSession } from "next-auth/react";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "../../firebase";
import toast from "react-hot-toast";
import ModelSelection from "./ModelSelection";
import useSWR from "swr";

type Props = {
  chatId: string;
};

function ChatInput({ chatId }: Props) {
  const [prompt, setPrompt] = useState(""); //Can't use this inside a server component. So make this component a client component
  const { data: session } = useSession();

  const { data: model } = useSWR("model", {
    fallbackData: "text-davinci-003",
  });

  // //   useSWR to get model
  // const model = "text-davinci-003";

  //To get what type the event is (FormEvent<HTMLFormElement>)
  //...just go down to the onSubmit at the form and add this onSubmit={e=>sendMessage}
  //Then hover over the 'e' to get the event type. Typescript Hacks yo!
  const sendMessage = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault(); //preventDefault is called on the event when submitting the form to prevent a browser reload/refresh

    if (!prompt) return; //Defensive programming, return if there is no prompt

    const input = prompt.trim(); //remove any whitespace at the end
    setPrompt(""); //Sets the prompt to blank once input is submited

    const message: Message = {
      //Custom type definition for this 'Message' was created in 'typings.d.ts'
      //Message is a custom type
      text: input,
      createdAt: serverTimestamp(), //From firebase firestore
      user: {
        _id: session?.user?.email!,
        name: session?.user?.name!,
        avatar:
          session?.user?.image! ||
          `https://ui-avatars.com/api/?name=${session?.user?.name}`, //This API creates an avatar with the users initials if they don't have a picture
      },
    };

    //Now we add the message/Document from the client into the database
    await addDoc(
      collection(
        db,
        "users",
        session?.user?.email!,
        "chats",
        chatId,
        "message"
      ),
      message
    );

    //Toast notification to say Loading...
    const notification = toast.loading("Gimme a sec...");

    //Fetch method to the backend that communicates with my API
    //The client basically queries our own API (make request to our API)
    await fetch("/api/askQuestion", {
      //API hits this endpoint that we created (//Explanation continued in askQuestions.ts)
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        prompt: input,
        chatId,
        model,
        session,
      }),
    }).then(() => {
      //If the fetch was successful
      //Toast notification to say successful
      toast.success("ChatGPT has found an answer!", {
        id: notification,
      });
    });
  };

  return (
    // bg-gray-700/50 -> Grey background of 700 with a 50% opacity
    <div className="bg-gray-700/50 text-gray-400 rounded-lg text-sm">
      <form onSubmit={sendMessage} className="p-5 space-x-5 flex">
        <input
          className="bg-transparent focus:outline-none flex-1
          disabled:cursor-not-allowed disabled:text-gray-300"
          disabled={!session}
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          type="text"
          placeholder="Type your message here..."
        />

        {/*Button disabled when there is no prompt or session */}
        <button
          disabled={!prompt || !session}
          type="submit"
          className="bg-[#11A37F] hover:opacity-50 text-white font-bold
        px-4 py-2 rounded disabled:bg-gray-300 
        disabled:cursor-not-allowed"
        >
          <PaperAirplaneIcon className="h-4 w-4 -rotate-45" />
        </button>
      </form>

      {/* Model Selection */}
      {/* //"md:hidden"---->So it can be viewd on smaller screens in the chat input area */}
      <div className="md:hidden">
        <ModelSelection />
      </div>
    </div>
  );
}

export default ChatInput;
