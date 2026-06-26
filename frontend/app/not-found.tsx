export default function NotFound() {
  return (
    <div className="flex min-h-[calc(100vh-65px)] flex-col items-center justify-center px-4 text-center">
      <p className="text-8xl font-bold text-white/10">404</p>
      <h1 className="mt-4 text-2xl font-bold text-white">Page not found</h1>
      <p className="mt-2 text-sm text-white/40">
        The page you&apos;re looking for doesn&apos;t exist or has been moved.
      </p>
      <a
        href="/"
        className="mt-8 rounded-lg bg-indigo-600 px-6 py-2.5 text-sm font-medium text-white transition hover:bg-indigo-500"
      >
        Back to Home
      </a>
    </div>
  );
}
