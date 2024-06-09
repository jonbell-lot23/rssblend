"use client";

import { useState } from "react";
import Link from "next/link";
import { Input } from "../components/ui/input";
import Image from "next/image";

import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuItem,
} from "../components/ui/dropdown-menu";
import { Button } from "../components/ui/button";
import React from "react";

export default function Component() {
  const [showSourcesMenu, setShowSourcesMenu] = useState(false);
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
        <div className="flex flex-1 items-center gap-4 md:ml-auto md:gap-2 lg:gap-4">
          <form className="ml-auto flex-1 sm:flex-initial">
            <div className="relative">
              <SearchIcon className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500 dark:text-gray-400" />
              <Input
                type="search"
                placeholder="Search news..."
                className="pl-8 sm:w-[300px] md:w-[200px] lg:w-[300px] bg-white hidden"
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
            <Link
              href="#"
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
              prefetch={false}
            >
              <a>The New York Times</a>
            </Link>
            <Link
              href="#"
              className="flex items-center gap-3 rounded-lg bg-gray-100 px-3 py-2 text-gray-900 transition-all hover:text-gray-900 dark:bg-gray-800 dark:text-gray-50 dark:hover:text-gray-50"
              prefetch={false}
            >
              <a>The Washington Post</a>
            </Link>
            <Link
              href="#"
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
              prefetch={false}
            >
              <a>BBC News</a>
            </Link>
            <Link
              href="#"
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
              prefetch={false}
            >
              <a>CNN</a>
            </Link>
            <Link
              href="#"
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
              prefetch={false}
            >
              <a>Al Jazeera</a>
            </Link>
            <Link
              href="#"
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
              prefetch={false}
            >
              RT
            </Link>
          </nav>
        </div>
      )}
      <div className="flex">
        <aside className="hidden lg:block w-64 border-r bg-gray-100/40 dark:bg-gray-800/40">
          <nav className="flex flex-col gap-2 p-4">
            <Link
              href="#"
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
              prefetch={false}
            >
              <a>The New York Times</a>
            </Link>
            <Link
              href="#"
              className="flex items-center gap-3 rounded-lg bg-gray-100 px-3 py-2 text-gray-900 transition-all hover:text-gray-900 dark:bg-gray-800 dark:text-gray-50 dark:hover:text-gray-50"
              prefetch={false}
            >
              <a>The Washington Post</a>
            </Link>
            <Link
              href="#"
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
              prefetch={false}
            >
              <a>BBC News</a>
            </Link>
            <Link
              href="#"
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
              prefetch={false}
            >
              <a>CNN</a>
            </Link>
            <Link
              href="#"
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
              prefetch={false}
            >
              <a>Al Jazeera</a>
            </Link>
            <Link
              href="#"
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
              prefetch={false}
            >
              RT
            </Link>
          </nav>
        </aside>
        <main className="flex-1 p-6">
          <div className="space-y-4">
            <article className="p-4 bg-white rounded-lg shadow dark:bg-gray-800">
              <header className="flex items-center justify-between">
                <h2 className="text-lg font-semibold">
                  Groundbreaking Discovery in Quantum Physics
                </h2>
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  The New York Times - 2 hours ago
                </span>
              </header>
              <p className="mt-2 text-gray-700 dark:text-gray-300">
                Scientists at the University of Cambridge have made a
                significant breakthrough in the field of quantum physics, paving
                the way for advancements in quantum computing and communication.
              </p>
            </article>
            <article className="p-4 bg-white rounded-lg shadow dark:bg-gray-800">
              <header className="flex items-center justify-between">
                <h2 className="text-lg font-semibold">
                  Climate Change Impacts Intensify Globally
                </h2>
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  The Washington Post - 4 hours ago
                </span>
              </header>
              <p className="mt-2 text-gray-700 dark:text-gray-300">
                A new report from the Intergovernmental Panel on Climate Change
                (IPCC) highlights the escalating threats posed by climate
                change, including more frequent and severe natural disasters,
                rising sea levels, and ecosystem collapse.
              </p>
            </article>
            <article className="p-4 bg-white rounded-lg shadow dark:bg-gray-800">
              <header className="flex items-center justify-between">
                <h2 className="text-lg font-semibold">
                  Breakthrough in Cancer Treatment Research
                </h2>
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  BBC News - 6 hours ago
                </span>
              </header>
              <p className="mt-2 text-gray-700 dark:text-gray-300">
                Researchers at the University of Oxford have developed a new
                immunotherapy treatment that has shown promising results in
                clinical trials, offering hope for more effective cancer
                therapies.
              </p>
            </article>
            <article className="p-4 bg-white rounded-lg shadow dark:bg-gray-800">
              <header className="flex items-center justify-between">
                <h2 className="text-lg font-semibold">
                  Elon Musk Unveils New Tesla Roadster
                </h2>
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  CNN - 8 hours ago
                </span>
              </header>
              <p className="mt-2 text-gray-700 dark:text-gray-300">
                Tesla CEO Elon Musk has revealed the company&apos;s latest
                electric vehicle, the all-new Tesla Roadster, which promises to
                be the fastest production car ever made.
              </p>
            </article>
          </div>
        </main>
      </div>
    </div>
  );
}

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
