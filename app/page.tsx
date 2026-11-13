
import { Suspense } from "react";
import { redirect } from "next/navigation";
import { createClient } from "./lib/supabase/server";
import { addNote, logOut } from "./actions";
import ToastHandler from "./components/ToastHandler";
import NoteCard from "./components/NoteCard";
import NotesHeader from "./components/NotesHeader";
import NewNoteModal from "./components/NewNoteModal";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";

type NotesPageProps = {
  searchParams: Promise<{
    success?: string;
    error?: string;
    page?: string;
  }>;
};

const PAGE_SIZE = 9;

const NotesContent = async ({ searchParams }: NotesPageProps) => {
  const params = await searchParams;
  const requestedPage = Math.max(1, Number(params.page) || 1);

  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/login");

  const from = (requestedPage - 1) * PAGE_SIZE;
  const to = from + PAGE_SIZE - 1;

  const { data: notes, error, count } = await supabase
    .from("notes")
    .select("id, title, body, created_at", { count: "exact" })
    .order("created_at", { ascending: false })
    .range(from, to);

  if (error) {
    throw new Error("Unable to load your notes.");
  }

  const totalNotes = count ?? 0;
  const totalPages = Math.ceil(totalNotes / PAGE_SIZE);
  const currentPage = totalPages > 0
    ? Math.min(requestedPage, totalPages)
    : 1;

  return (
    <main className="min-h-screen bg-[#F3F6FA]">
      <ToastHandler success={params.success} error={params.error} />

      <NotesHeader email={user.email ?? ""} logOut={logOut} />

      <div className="mx-auto max-w-6xl px-5 py-8 sm:px-8 sm:py-10">
        <section className="mb-9 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight text-slate-900">
              My Notes
            </h1>
            <p className="mt-2 text-sm text-slate-500">
              Keep your thoughts and important information organised.
            </p>
          </div>

          <NewNoteModal addNote={addNote} />
        </section>

        <section>
          <div className="mb-5 flex items-center justify-between">
            <h2 className="text-base font-semibold text-slate-900">
              Your notes
            </h2>

            <span className="text-sm text-slate-500">
              {totalNotes} {totalNotes === 1 ? "note" : "notes"}
            </span>
          </div>

          {notes.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-slate-300 bg-white px-6 py-16 text-center">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                <span className="text-xl">+</span>
              </div>

              <h3 className="mt-4 font-medium text-slate-900">
                No notes yet
              </h3>

              <p className="mt-2 text-sm text-slate-500">
                Create your first note to get started.
              </p>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {notes.map((note, index) => (
                  <NoteCard key={note.id} note={note} index={index} />
                ))}
              </div>

              {totalPages > 1 && (
                <div className="mt-8 flex items-center justify-between border-t border-slate-200 pt-5">
                  <p className="text-sm text-slate-500">
                    Page {currentPage} of {totalPages}
                  </p>

                  <div className="flex items-center gap-2">
                    <Link
                      href={`/?page=${currentPage - 1}`}
                      aria-disabled={currentPage === 1}
                      className={`flex items-center gap-1 rounded-lg border px-3 py-2 text-sm transition ${
                        currentPage === 1
                          ? "pointer-events-none border-slate-200 text-slate-300"
                          : "border-slate-200 bg-white text-slate-600 hover:bg-slate-50"
                      }`}
                    >
                      <ChevronLeft size={16} />
                      Previous
                    </Link>

                    <Link
                      href={`/?page=${currentPage + 1}`}
                      aria-disabled={currentPage === totalPages}
                      className={`flex items-center gap-1 rounded-lg border px-3 py-2 text-sm transition ${
                        currentPage === totalPages
                          ? "pointer-events-none border-slate-200 text-slate-300"
                          : "border-slate-200 bg-white text-slate-600 hover:bg-slate-50"
                      }`}
                    >
                      Next
                      <ChevronRight size={16} />
                    </Link>
                  </div>
                </div>
              )}
            </>
          )}
        </section>

        <footer className="mt-12 border-t border-slate-200 pt-6 text-center">
          <p className="text-xs text-slate-400">
            Your notes are private and only accessible to you.
          </p>
        </footer>
      </div>
    </main>
  );
};

const NotesPage = (props: NotesPageProps) => (
  <Suspense
    fallback={
      <div className="flex min-h-screen items-center justify-center text-sm text-slate-500">
        Loading your notes...
      </div>
    }
  >
    <NotesContent {...props} />
  </Suspense>
);

export default NotesPage;
