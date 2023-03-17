import { ChatBubbleLeftIcon, TrashIcon } from "@heroicons/react/24/outline";
import { db } from "../../firebase";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useCollection } from "react-firebase-hooks/firestore";
import { collection, deleteDoc, doc, orderBy, query } from "firebase/firestore";

type Props = {
  id: string;
};

function ChatRow({ id }: Props) {
  const pathname = usePathname(); //Gets the pathname
  const router = useRouter();
  const { data: session } = useSession();
  const [active, setActive] = useState(false);

  const [messages, loading, error] = useCollection(
    collection(db, "users", session?.user?.email!, "chats", id, "messages")
  );

  //Research on this useEffect more..

  //So basically the useEffect checks if the pathname
  //that you get from usePathname is the one that is currently active
  useEffect(() => {
    //If there is no pathname return immediately
    if (!pathname) return;

    setActive(pathname.includes(id));
  }, [pathname, id]);

  const removeChat = async () => {
    //When deleteDoc() is called, there is a realtime listener
    //rendering things out in the background, so when documents are deleted, they will
    //get affected in real time

    //This deletes the chat with an id of something
    await deleteDoc(doc(db, "users", session?.user?.email!, "chats", id));
    router.replace("/");
  };

  return (
    <Link
      href={`/chat/${id}`}
      className={`chatRow justify-center ${active && "bg-gray-700/50"}`}
    >
      <ChatBubbleLeftIcon className="h-5 w-5" />
      {/* Hidden on mobile devices since tailwindCSS is mobile first */}
      <p className="flex-1 hidden md:inline-flex truncate">
        {/* The line below basically pulls the lates message from the chat and if there isn't one it returns the string "New Chat" */}
        {messages?.docs[messages?.docs.length - 1]?.data().text || "New Chat"}
      </p>
      <TrashIcon
        onClick={removeChat}
        className="h-5 w-5 text-gray-700 hover:text-red-700"
      />
    </Link>
  );
}

export default ChatRow;
