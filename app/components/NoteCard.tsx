
import Link from "next/link";
import { FileText, ArrowUpRight } from "lucide-react";
import NoteActions from "./NotesActions";

type NoteCardProps = {
  note: {
    id: string | number;
    title: string;
    body: string | null;
    created_at: string;
  };
  index: number;
};

const NoteCard = ({ note }: NoteCardProps) => {
  const formattedDate = new Date(note.created_at).toLocaleDateString(
    "en-GB",
    {
      day: "numeric",
      month: "short",
      year: "numeric",
    }
  );

  const preview =
    note.body && note.body.trim().length > 0
      ? note.body
      : "No additional details added to this note.";

  return (
    <article className="group relative overflow-hidden rounded-xl border border-slate-200 bg-white transition duration-200 hover:-translate-y-1 hover:border-blue-200 hover:shadow-lg hover:shadow-slate-200/60">
      <div className="h-1 w-full bg-blue-600" />

      <div className="p-5 sm:p-6">
        <div className="mb-5 flex items-start justify-between gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
            <FileText size={19} strokeWidth={1.8} />
          </div>

          <NoteActions
            noteId={note.id}
            title={note.title}
            body={note.body}
          />
        </div>

        <Link
          href={`/notes/${note.id}`}
          prefetch={true}
          className="block rounded-lg outline-none focus-visible:ring-2 focus-visible:ring-blue-600"
        >
          <h3 className="line-clamp-1 text-base font-semibold text-slate-900 transition group-hover:text-blue-700">
            {note.title}
          </h3>

          <p className="mt-3 line-clamp-3 min-h-[72px] whitespace-pre-wrap text-sm leading-6 text-slate-600">
            {preview}
          </p>

          <div className="mt-5 flex items-center justify-between border-t border-slate-100 pt-4">
            <span className="text-xs font-medium text-slate-500">
              {formattedDate}
            </span>

            <span className="flex items-center gap-1 text-xs font-medium text-blue-600 transition group-hover:text-blue-800">
              Open note
              <ArrowUpRight size={15} />
            </span>
          </div>
        </Link>
      </div>
    </article>
  );
};

export default NoteCard;
