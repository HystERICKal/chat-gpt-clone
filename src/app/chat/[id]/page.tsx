import Chat from "@/components/Chat";
import ChatInput from "@/components/ChatInput";
import React from "react";

type Props = {
  params: {
    id: string;
  };
};

//react-firebase-hooks is installed to help establish a realtime connection with the database
//In its documentation under 'Cloud Firestore Hooks' it shows how to connect to the backend in realtime

function ChatPage({ params: { id } }: Props) {
  //The 'overflow-hidden' property makes it so that it is scrollable
  //When it becomes long so that the page has a set/defined height
  return (
    <div className="flex flex-col h-screen overflow-hidden">
      {/* These will be decoupled elements */}

      {/* Chat */}
      <Chat chatId={id} />

      {/* Chat Input */}

      <ChatInput chatId={id} />
    </div>
  );
}

export default ChatPage;
