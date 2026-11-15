
import Link from "next/link";
import { FileQuestion, ArrowLeft, House } from "lucide-react";
import Header from "../../components/NotesHeader";
import { logOut } from "../../actions";
import { createClient } from "@/app/lib/supabase/server";

const NoteNotFound = async () => {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <>
      <Header email={user?.email ?? ""} logOut={logOut} />

      <main className="flex min-h-[calc(100vh-64px)] items-center justify-center bg-gray-50/70 px-5 py-16">
        <div className="w-full max-w-lg text-center">
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-2xl border border-gray-200 bg-white shadow-sm">
            <FileQuestion
              size={36}
              strokeWidth={1.4}
              className="text-teal-800"
            />
          </div>

          <div className="mt-8">
            {/* <p className="text-sm font-medium text-teal-800">
              404 · Page not found
            </p> */}

            <h1 className="mt-3 text-3xl font-semibold tracking-tight text-gray-900 sm:text-4xl">
              We couldn't find this note
            </h1>

            <p className="mx-auto mt-4 max-w-md text-sm leading-7 text-gray-500 sm:text-base">
              This note may have been deleted, moved, or you may not have
              permission to access it. You can return to your notes and
              continue where you left off.
            </p>
          </div>

          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link
              href="/"
              className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-blue-600 px-6 py-3 text-sm font-medium text-white transition hover:bg-blue-700 sm:w-auto"
            >
              <House size={16} />
              Back to my notes
            </Link>

            {/* <Link
              href="/"
              className="inline-flex w-full items-center justify-center gap-2 rounded-lg border border-gray-200 bg-white px-6 py-3 text-sm font-medium text-gray-700 transition hover:bg-gray-50 sm:w-auto"
            >
              <ArrowLeft size={16} />
              Go back
            </Link> */}
          </div>

          <div className="mt-12 border-t border-gray-200 pt-6">
            <p className="text-xs text-gray-400">
              Your notes are private and accessible only to you.
            </p>
          </div>
        </div>
      </main>
    </>
  );
};

export default NoteNotFound;
