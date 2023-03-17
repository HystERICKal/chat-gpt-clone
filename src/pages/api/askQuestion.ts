//AskQuestions API

//This is the endpoint for asking questions to chat GPT

import query from "../../../lib/queryApi";
import type { NextApiRequest, NextApiResponse } from "next";
import admin from "firebase-admin";
import { adminDb } from "firebaseAdmin";

type Data = {
  answer: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  //Explanation continued from ChatInput.tsx
  //Strip out all the values that were passed through when the endpoint is hit
  const { prompt, chatId, model, session } = req.body; //Destructure

  //Make sure there is a prompt and chat ID
  if (!prompt) {
    res.status(400).json({ answer: "Please provide a prompt!" });
    return;
  }

  if (!chatId) {
    res.status(400).json({ answer: "Please provide a valid chat ID!" });
    return;
  }

  //ChatGPT is then Queried
  const response = await query(prompt, chatId, model);

  //What comes back from chatGPT
  //ChatGPT gives back a message
  const message: Message = {
    text: response || "ChatGPT was unable to find an answer to that",
    //Get admin's firestore details (All this is done inside firebaseAdmin.ts)
    //Since a document needs to be added to the backend in firebase

    //Get timestamp from database
    createdAt: admin.firestore.Timestamp.now(),
    user: {
      _id: "ChatGPT",
      name: "ChatGPT",
      avatar: "https://Links.papareact.com/89k",
    },
  };
  //This is added from the admin (backend) into the firestore database
  await adminDb
    .collection("users")
    .doc(session?.user?.email)
    .collection("chats")
    .doc(chatId)
    .collection("messages")
    .add(message);

  //send back (return) the answer as a bit of text
  res.status(200).json({ answer: message.text });
}
