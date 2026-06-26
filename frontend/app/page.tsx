import Link from "next/link";

export default function HomePage() {
  return (
    <div className="relative flex min-h-[calc(100vh-65px)] flex-col items-center justify-center overflow-hidden px-4 text-center bg-white dark:bg-gray-950 transition-colors">
      {/* Background glow */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
        <div className="h-[500px] w-[500px] rounded-full bg-indigo-600/10 blur-[120px]" />
      </div>

      <div className="relative z-10 max-w-2xl">

        <h1 className="text-5xl font-bold leading-tight tracking-tight text-gray-900 dark:text-white sm:text-6xl">
          Welcome to{" "}
          <span className="bg-gradient-to-r from-indigo-500 to-purple-500 bg-clip-text text-transparent">
            BlogsApp
          </span>
        </h1>

        <p className="mt-6 text-lg text-gray-500 dark:text-gray-400">
          Discover stories, ideas, and voices from writers who matter.
          Share your thoughts with the world.
        </p>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <Link
            href="/blog"
            className="rounded-xl bg-indigo-600 px-8 py-3 text-sm font-semibold text-white shadow-lg shadow-indigo-500/20 transition hover:bg-indigo-500 hover:shadow-indigo-500/30"
          >
            Read Posts
          </Link>
          <Link
            href="/signup"
            className="rounded-xl border border-gray-200 bg-gray-100 px-8 py-3 text-sm font-semibold text-gray-700 transition hover:bg-gray-200 dark:border-white/10 dark:bg-white/5 dark:text-white dark:hover:bg-white/10"
          >
            Start Writing
          </Link>
        </div>
      </div>

      {/* Decorative grid */}
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:64px_64px]" />
    </div>
  );
}
