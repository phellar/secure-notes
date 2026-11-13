
import Link from "next/link";
import { Suspense } from "react";
import { notFound, redirect } from "next/navigation";
import { ChevronLeft, Lock } from "lucide-react";
import { createClient } from "../../lib/supabase/server";
import { logOut } from "../../actions";
import NotesHeader from "../../components/NotesHeader";
import NoteActions from "../../components/NotesActions";

type NotePageProps = {
  params: Promise<{
    id: string;
  }>;
};

const NoteContent = async ({ params }: NotePageProps) => {
  const { id } = await params;
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const { data: note, error } = await supabase
    .from("notes")
    .select("id, title, body, created_at")
    .eq("id", id)
    .eq("user_id", user.id)
    .single();

  if (error || !note) {
    notFound();
  }

  return (
    <>
      <NotesHeader email={user.email ?? ""} logOut={logOut} />

      <div className="mx-auto max-w-4xl px-5 py-8 sm:px-8 sm:py-10">
        {/* Navigation */}
        <div className="mb-7">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm font-medium text-slate-500 transition hover:text-blue-600"
          >
            <ChevronLeft size={17} />
            All notes
          </Link>
        </div>

        {/* Note card */}
        <article className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
          <div className="p-6 sm:p-9">
            {/* Note title, date and actions */}
            <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-start">
              <div className="min-w-0">
                <h1 className="break-words text-2xl font-semibold tracking-tight text-slate-900">
                  {note.title}
                </h1>

                <p className="mt-2 text-xs text-slate-400">
                  Created on{" "}
                  {new Date(note.created_at).toLocaleDateString("en-US", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })}
                </p>
              </div>

              {/* Existing edit and delete functionality */}
              <NoteActions
                noteId={note.id}
                title={note.title}
                body={note.body}
              />
            </div>

            {/* Note content */}
            <div className="mt-8 border-t border-slate-100 pt-7">
              <div className="min-h-48 rounded-xl bg-slate-50 px-5 py-6 sm:px-7 sm:py-8">
                <p className="whitespace-pre-wrap text-sm leading-8 text-slate-600">
                  {note.body || "No content available for this note."}
                </p>
              </div>
            </div>
          </div>

          {/* Privacy footer */}
          <div className="flex items-center gap-2 border-t border-slate-100 bg-slate-50/70 px-6 py-4 sm:px-9">
            <Lock size={15} className="text-blue-600" />

            <p className="text-xs text-slate-500">
              Your notes are private and only accessible to your account.
            </p>
          </div>
        </article>

        <footer className="mt-9 text-center">
          <p className="text-xs text-slate-400">
            Secure Notes · Your thoughts, kept private.
          </p>
        </footer>
      </div>
    </>
  );
};

const NotePage = ({ params }: NotePageProps) => {
  return (
    <main className="min-h-screen bg-[#F3F6FA]">
      <Suspense
        fallback={
          <div className="min-h-screen">
            <div className="border-b border-slate-200 bg-white px-5 py-6">
              <div className="mx-auto h-8 max-w-6xl animate-pulse rounded bg-slate-100" />
            </div>

            <div className="mx-auto max-w-4xl px-5 py-10 sm:px-8">
              <div className="h-64 animate-pulse rounded-2xl border border-slate-200 bg-white" />
            </div>
          </div>
        }
      >
        <NoteContent params={params} />
      </Suspense>
    </main>
  );
};

export default NotePage;
