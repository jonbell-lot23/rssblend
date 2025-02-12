import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { Input } from "@/components/ui/input";
import Image from "next/image"; // Add this import at the top of your file

import Sidebar from "@/components/Sidebar";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import Feed from "@/components/Feed";
import { Button } from "@/components/ui/button";

function MenuIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M3 12h18M3 6h18M3 18h18" />
    </svg>
  );
}

function SearchIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <circle cx={11} cy={11} r={8} />
      <path d="M21 21l-4.35-4.35" />
    </svg>
  );
}

const SourcePage = () => {
  const [showSourcesMenu, setShowSourcesMenu] = useState(false);
  const router = useRouter();
  const { username, sourceId } = router.query;
  const [userid, setUserid] = useState(null);

  useEffect(() => {
    const cleanUsername = Array.isArray(username)
      ? username[0].replace("@", "")
      : username?.replace("@", "");
    if (cleanUsername) {
      const url = `/api/getUserid?username=${cleanUsername}`;
      fetch(url)
        .then((response) => {
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          return response.json();
        })
        .then((data) => {
          if (!data.userid) {
            throw new Error("No userid returned from API");
          }
          setUserid(data.userid);
        })
        .catch((error) => {
          console.error("Error fetching user ID:", error);
        });
    }
  }, [username]);

  const sourceIdInt = Array.isArray(sourceId)
    ? parseInt(sourceId[0], 10)
    : parseInt(sourceId, 10);

  return (
    <div className="min-h-screen w-full overflow-hidden">
      <header className="flex h-14 lg:h-[60px] items-center gap-4 border-b bg-gray-100/40 px-6 dark:bg-gray-800/40">
        <button
          className="lg:hidden"
          onClick={() => setShowSourcesMenu(!showSourcesMenu)}
        >
          <MenuIcon className="h-6 w-6" />
          <span className="sr-only">Toggle sources menu</span>
        </button>
        <div className="flex-1">
          <h1 className="font-semibold text-lg">Firehose</h1>
        </div>
        <div className="flex flex-1 items-center gap-4 md:ml-auto md:gap-2 lg:gap-4 hidden">
          <form className="ml-auto flex-1 sm:flex-initial">
            <div className="relative">
              <SearchIcon className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500 dark:text-gray-400" />
              <Input
                type="search"
                placeholder="Search news..."
                className="pl-8 sm:w-[300px] md:w-[200px] lg:w-[300px] bg-white"
              />
            </div>
          </form>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="rounded-full">
                <Image
                  src="/placeholder.svg"
                  width={32}
                  height={32}
                  className="rounded-full"
                  alt="Avatar"
                />
                <span className="sr-only">Toggle user menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Settings</DropdownMenuItem>
              <DropdownMenuItem>Manage Feeds</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Logout</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </header>
      {showSourcesMenu && (
        <div className="lg:hidden border-b bg-gray-100/40 px-6 dark:bg-gray-800/40">
          <nav className="grid items-start text-sm font-medium">
            <Sidebar />
          </nav>
        </div>
      )}
      <div className="flex">
        <aside className="hidden lg:block w-72 border-r bg-gray-100/40 dark:bg-gray-800/40">
          <nav className="flex flex-col gap-2 p-1">
            <Sidebar />
          </nav>
        </aside>
        <main className="flex-1 p-6">
          <div className="space-y-4">
            {userid && !isNaN(sourceIdInt) ? (
              <Feed
                userid={userid}
                username={Array.isArray(username) ? username[0] : username}
                sourceId={sourceIdInt}
              />
            ) : (
              <div></div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default SourcePage;
