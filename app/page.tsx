
import { Suspense } from "react";
import { createClient } from "./lib/supabase/server";
import { addNote, logOut } from "./actions";

type NotesPageProps = {
  searchParams: Promise<{ error?: string }>;
};

const NotesContent = async ({ searchParams }: NotesPageProps) => {
  const params = await searchParams;
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data: notes, error } = await supabase
    .from("notes")
    .select("id, title, body, created_at")
    .order("created_at", { ascending: false });

  if (error) {
    throw new Error("Unable to load your notes.");
  }

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="mx-auto max-w-4xl px-5 py-8 sm:px-8 sm:py-12">

        {/* Header */}
        <header className="mb-10 flex flex-col gap-5 border-b border-gray-200 pb-6 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight text-gray-900">
              My Notes
            </h1>

            <p className="mt-1 text-sm text-gray-500">
              Keep track of your students' progress.
            </p>
          </div>

          <div className="flex items-center justify-between gap-4">
            <div className="min-w-0">
              <p className="text-xs text-gray-400">Logged in as</p>
              <p className="truncate text-sm font-medium text-gray-700">
                {user?.email}
              </p>
            </div>

            <form action={logOut}>
              <button
                type="submit"
                className="rounded-lg border border-gray-300 px-4 py-2.5 text-sm font-medium text-gray-700 transition hover:bg-gray-100"
              >
                Log out
              </button>
            </form>
          </div>
        </header>

        {/* New Note */}
        <section className="mb-10 rounded-2xl border border-gray-200 bg-white p-5 shadow-sm sm:p-7">
          <div className="mb-5">
            <h2 className="text-lg font-semibold text-gray-900">
              New note
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              Record a student's learning progress.
            </p>
          </div>

          {params.error === "title-required" && (
            <p className="mb-4 rounded-lg bg-red-50 px-4 py-3 text-sm text-red-600">
              Please enter a title before saving your note.
            </p>
          )}

          <form action={addNote} className="space-y-4">
            <div>
              <label
                htmlFor="title"
                className="mb-2 block text-sm font-medium text-gray-700"
              >
                Title
              </label>

              <input
                id="title"
                name="title"
                type="text"
                placeholder="e.g. Tolu, Mathematics"
                className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm outline-none transition focus:border-teal-700 focus:ring-2 focus:ring-teal-700/10"
              />
            </div>

            <div>
              <label
                htmlFor="body"
                className="mb-2 block text-sm font-medium text-gray-700"
              >
                Note
              </label>

              <textarea
                id="body"
                name="body"
                rows={5}
                placeholder="Write your observations about the student's progress..."
                className="w-full resize-y rounded-lg border border-gray-300 px-4 py-3 text-sm leading-6 outline-none transition focus:border-teal-700 focus:ring-2 focus:ring-teal-700/10"
              />
            </div>

            <div className="flex justify-end">
              <button
                type="submit"
                className="w-full rounded-lg bg-teal-800 px-6 py-3 text-sm font-medium text-white transition hover:bg-teal-900 sm:w-auto"
              >
                Save note
              </button>
            </div>
          </form>
        </section>

        {/* Notes List */}
        <section>
          <div className="mb-5 flex items-center justify-between">
            <h2 className="text-lg font-semibold text-gray-900">
              Your notes
            </h2>

            <span className="text-sm text-gray-400">
              {notes.length} {notes.length === 1 ? "note" : "notes"}
            </span>
          </div>

          {notes.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-gray-300 bg-white px-6 py-14 text-center">
              <h3 className="font-medium text-gray-800">
                No notes yet
              </h3>

              <p className="mt-2 text-sm text-gray-500">
                Your saved notes will appear here.
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {notes.map((note) => (
                <article
                  key={note.id}
                  className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm sm:p-6"
                >
                  <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                    <h3 className="font-semibold text-gray-900">
                      {note.title}
                    </h3>

                    <time className="shrink-0 text-xs text-gray-400">
                      {new Date(note.created_at).toLocaleDateString("en-GB", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      })}
                    </time>
                  </div>

                  <p className="mt-3 whitespace-pre-wrap break-words text-sm leading-7 text-gray-600">
                    {note.body}
                  </p>
                </article>
              ))}
            </div>
          )}
        </section>

        <footer className="mt-12 border-t border-gray-200 pt-6 text-center">
          <p className="text-xs text-gray-400">
            Your notes are private and only accessible to you.
          </p>
        </footer>
      </div>
    </main>
  );
};

const NotesPage = (props: NotesPageProps) => {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center text-sm text-gray-500">
          Loading your notes...
        </div>
      }
    >
      <NotesContent {...props} />
    </Suspense>
  );
};

export default NotesPage;
