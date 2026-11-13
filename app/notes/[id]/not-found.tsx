import Link from "next/link";

const NoteNotFound = () => {
  return (
    <main className="flex min-h-screen items-center justify-center bg-gray-50 px-5">
      <div className="w-full max-w-md rounded-2xl border border-gray-200 bg-white p-8 text-center shadow-sm">
        <h1 className="text-xl font-semibold text-gray-900">
          Note not found
        </h1>

        <p className="mt-2 text-sm leading-6 text-gray-500">
          This note does not exist or you do not have permission to view it.
        </p>

        <Link
          href="/"
          className="mt-6 inline-flex rounded-lg bg-teal-800 px-5 py-2.5 text-sm font-medium text-white hover:bg-teal-900"
        >
          Back to notes
        </Link>
      </div>
    </main>
  );
};

export default NoteNotFound;