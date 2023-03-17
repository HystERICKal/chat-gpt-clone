import "./globals.css";
import SideBar from "@/components/SideBar";
import { SessionProvider } from "@/components/SessionProvider";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import Login from "@/components/Login";
import ClientProvider from "@/components/ClientProvider";

//Since by default they are server components (explained inside SessionProvider.tsx)
//They can definitely be asynchronous too!

//But if you have a client component, that canot be asynchronous
export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  //We can use 'await' in a server component
  const session = await getServerSession(authOptions);

  //Console loge to see details of the user currently logged in
  // console.log(session);

  return (
    <html lang="en">
      {/*
        <head /> will contain the components returned by the nearest parent
        head.tsx. Find out more at https://beta.nextjs.org/docs/api-reference/file-conventions/head
      */}
      <head />
      <body>
        {/* Session Provider basically wraps the app */}
        <SessionProvider session={session}>
          {!session ? (
            //If there is no session...
            <Login />
          ) : (
            //If there is a session...

            // All the children now have the ability to share the session state
            // A session basically means that, once I log in, there will be a session, once I log out, there will be no session

            <div className="flex">
              <div
                className="bg-[#202123] max-w-xs h-screen
        overflow-y-auto md:min-w-[20rem]"
              >
                {/* Sidebar */}
                <SideBar />
              </div>

              {/* ClientProvider - Notification using hottoast notifications */}

              {/* //This component is used to push anything that needs the client
//At the top level can be injected at this level */}

              {/* For example while installing hot toast, it needs configuration to be done in client side
              Hence all Hot Toast Configuration is done inside ClientProvider.tsx, This is only done when using 
              Next.JS 13 */}

              <ClientProvider />

              <div className="bg-[#343541] flex-1">{children}</div>
            </div>
          )}
        </SessionProvider>
      </body>
    </html>
  );
}
