
"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { useFormStatus } from "react-dom";
import { Pencil, Trash2, X } from "lucide-react";
import { deleteNote, updateNote } from "../actions";

type NoteActionsProps = {
  noteId: string | number;
  title: string;
  body: string | null;
};

type SubmitButtonProps = {
  label: string;
  pendingLabel: string;
  color?: "blue" | "red";
};

const SubmitButton = ({
  label,
  pendingLabel,
  color = "blue",
}: SubmitButtonProps) => {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className={`flex items-center justify-center gap-2 rounded-lg px-6 py-3 text-sm font-medium text-white transition disabled:cursor-not-allowed disabled:opacity-60 ${
        color === "red"
          ? "bg-red-600 hover:bg-red-700"
          : "bg-blue-600 hover:bg-blue-700"
      }`}
    >
      {pending && (
        <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white" />
      )}

      {pending ? pendingLabel : label}
    </button>
  );
};

const NoteActions = ({ noteId, title, body }: NoteActionsProps) => {
  const [editOpen, setEditOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Prevent background scrolling while a modal is open.
  useEffect(() => {
    if (!editOpen && !deleteOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [editOpen, deleteOpen]);

  const closeEdit = () => setEditOpen(false);
  const closeDelete = () => setDeleteOpen(false);

  return (
    <>
      {/* Note actions */}
      <div className="relative z-10 flex shrink-0 items-center gap-1">
        <button
          type="button"
          onClick={() => setEditOpen(true)}
          title="Edit note"
          aria-label="Edit note"
          className="flex h-9 w-9 items-center justify-center rounded-lg transition hover:bg-blue-50 hover:text-blue-800"
        >
          <Pencil size={17} strokeWidth={1.8} />
        </button>

        <button
          type="button"
          onClick={() => setDeleteOpen(true)}
          title="Delete note"
          aria-label="Delete note"
          className="flex h-9 w-9 items-center justify-center rounded-lg text-gray-500 transition hover:bg-red-50 hover:text-red-600"
        >
          <Trash2 size={17} strokeWidth={1.8} />
        </button>
      </div>

      {/* Edit modal */}
      {mounted &&
        editOpen &&
        createPortal(
          <div
            className="fixed inset-0 z-[9999] flex items-center justify-center overflow-y-auto bg-black/50 p-4 sm:p-6"
            onClick={(event) => {
              if (event.target === event.currentTarget) {
                closeEdit();
              }
            }}
          >
            <div
              role="dialog"
              aria-modal="true"
              aria-labelledby={`edit-heading-${noteId}`}
              className="flex max-h-[85dvh] w-full max-w-2xl flex-col overflow-hidden rounded-2xl bg-white shadow-2xl"
            >
              {/* Modal header */}
              <div className="flex shrink-0 items-start justify-between border-b border-gray-100 p-6 sm:px-8">
                <div>
                  <h2
                    id={`edit-heading-${noteId}`}
                    className="text-xl font-semibold text-gray-900 sm:text-2xl"
                  >
                    Edit note
                  </h2>

                  <p className="mt-2 text-sm text-gray-500">
                    Make changes to your saved note.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={closeEdit}
                  aria-label="Close edit modal"
                  className="rounded-lg p-2 text-gray-400 transition hover:bg-gray-100 hover:text-gray-700"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Edit form */}
              <form
                action={updateNote}
                className="flex min-h-0 flex-1 flex-col"
              >
                <input type="hidden" name="id" value={noteId} />

                {/* Scrollable content */}
                <div className="min-h-0 flex-1 space-y-6 overflow-y-auto p-6 sm:px-8">
                  <div>
                    <label
                      htmlFor={`edit-title-${noteId}`}
                      className="mb-2 block text-sm font-medium text-gray-700"
                    >
                      Note title
                    </label>

                    <input
                      id={`edit-title-${noteId}`}
                      name="title"
                      type="text"
                      defaultValue={title}
                      required
                      className="w-full rounded-xl border border-gray-300 px-4 py-3.5 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-blue-600 focus:ring-2 focus:ring-blue-600/10"
                      placeholder="Enter note title"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor={`edit-body-${noteId}`}
                      className="mb-2 block text-sm font-medium text-gray-700"
                    >
                      Note content
                    </label>

                    <textarea
                      id={`edit-body-${noteId}`}
                      name="body"
                      defaultValue={body ?? ""}
                      rows={12}
                      className="w-full resize-y rounded-xl border border-gray-300 px-4 py-3.5 text-sm leading-7 text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-blue-600 focus:ring-2 focus:ring-blue-600/10"
                      placeholder="Write your note..."
                    />
                  </div>
                </div>

                {/* Always visible footer */}
                <div className="flex shrink-0 flex-col-reverse gap-3 border-t border-gray-100 bg-white p-6 sm:flex-row sm:justify-end sm:px-8">
                  <button
                    type="button"
                    onClick={closeEdit}
                    className="rounded-lg border border-gray-300 px-6 py-3 text-sm font-medium text-gray-700 transition hover:bg-gray-50"
                  >
                    Cancel
                  </button>

                  <SubmitButton
                    label="Save changes"
                    pendingLabel="Saving..."
                  />
                </div>
              </form>
            </div>
          </div>,
          document.body
        )}

      {/* Delete modal */}
      {mounted &&
        deleteOpen &&
        createPortal(
          <div
            className="fixed inset-0 z-[9999] flex items-center justify-center overflow-y-auto bg-black/50 p-4 sm:p-6"
            onClick={(event) => {
              if (event.target === event.currentTarget) {
                closeDelete();
              }
            }}
          >
            <div
              role="dialog"
              aria-modal="true"
              aria-labelledby={`delete-heading-${noteId}`}
              className="my-auto w-full max-w-lg rounded-2xl bg-white p-6 shadow-2xl sm:p-8"
            >
              <div className="mb-7 flex items-start justify-between">
                <div>
                  <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-red-50 text-red-600">
                    <Trash2 size={21} />
                  </div>

                  <h2
                    id={`delete-heading-${noteId}`}
                    className="text-xl font-semibold text-gray-900"
                  >
                    Delete this note?
                  </h2>

                  <p className="mt-3 text-sm leading-7 text-gray-500">
                    Are you sure you want to delete{" "}
                    <span className="font-medium text-gray-800">
                      "{title}"
                    </span>
                    ? This action cannot be undone.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={closeDelete}
                  aria-label="Close delete modal"
                  className="rounded-lg p-2 text-gray-400 transition hover:bg-gray-100 hover:text-gray-700"
                >
                  <X size={20} />
                </button>
              </div>

              <form
                action={deleteNote}
                className="flex flex-col-reverse gap-3 border-t border-gray-100 pt-5 sm:flex-row sm:justify-end"
              >
                <input type="hidden" name="id" value={noteId} />

                <button
                  type="button"
                  onClick={closeDelete}
                  className="rounded-lg border border-gray-300 px-6 py-3 text-sm font-medium text-gray-700 transition hover:bg-gray-50"
                >
                  Cancel
                </button>

                <SubmitButton
                  label="Delete note"
                  pendingLabel="Deleting..."
                  color="red"
                />
              </form>
            </div>
          </div>,
          document.body
        )}
    </>
  );
};

export default NoteActions;
