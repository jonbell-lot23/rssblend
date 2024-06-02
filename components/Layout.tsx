export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div className="relative inset-0 flex justify-center bg-[#E9496D] sm:px-8">
        <div className="flex w-full max-w-7xl lg:px-8">
          <div className="w-full bg-white ring-1 ring-zinc-100 dark:bg-zinc-900 dark:ring-zinc-300/20" />
        </div>
      </div>
      <div className="relative flex flex-col w-full">
        <main className="flex-auto">{children}</main>
      </div>
    </>
  );
}
