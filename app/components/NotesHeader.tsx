
"use client";

import { useEffect, useRef, useState } from "react";
import { LogOut, ChevronDown, FileText } from "lucide-react";

type NotesHeaderProps = {
  email: string;
  logOut: () => Promise<void>;
};

const NotesHeader = ({ email, logOut }: NotesHeaderProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsOpen(false);
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, []);

  const initials = email.charAt(0).toUpperCase() || "U";

  return (
    <header className="border-b border-slate-200 bg-white">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4 sm:px-8">
        {/* App identity */}
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600 text-white">
           <FileText size={21}  />
          </div>

          <div>
            <p className="text-base font-semibold tracking-tight text-slate-900">
              Secure Notes
            </p>
            <p className="text-xs text-slate-500">
              Your private space
            </p>
          </div>
        </div>

        {/* Desktop account section */}
        <div className="hidden items-center gap-4 sm:flex">
          <div className="text-right">
            <p className="text-xs text-slate-400">Logged in as</p>
            <p className="max-w-56 truncate text-sm font-medium text-slate-700">
              {email}
            </p>
          </div>

          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-50 text-sm font-semibold text-blue-700">
            {initials}
          </div>

          <form action={logOut}>
            <button
              type="submit"
              className="flex items-center gap-2 rounded-lg border border-slate-200 px-4 py-2.5 text-sm font-medium text-slate-600 transition hover:border-slate-300 hover:bg-slate-50 hover:text-slate-900"
            >
              <LogOut size={16} />
              Log out
            </button>
          </form>
        </div>

        {/* Mobile account dropdown */}
        <div className="relative sm:hidden" ref={dropdownRef}>
          <button
            type="button"
            onClick={() => setIsOpen((prev) => !prev)}
            aria-expanded={isOpen}
            aria-label="Account menu"
            className="flex items-center gap-2 rounded-full p-1 transition hover:bg-slate-100"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-50 text-sm font-semibold text-blue-700">
              {initials}
            </div>

            <ChevronDown
              size={16}
              className={`text-slate-500 transition-transform ${
                isOpen ? "rotate-180" : ""
              }`}
            />
          </button>

          {isOpen && (
            <div className="absolute right-0 top-14 z-50 w-64 rounded-xl border border-slate-200 bg-white p-2 shadow-lg shadow-slate-200/60">
              <div className="border-b border-slate-100 px-3 py-3">
                <p className="text-xs text-slate-400">Logged in as</p>
                <p className="mt-1 truncate text-sm font-medium text-slate-800">
                  {email}
                </p>
              </div>

              <form action={logOut}>
                <button
                  type="submit"
                  className="mt-1 flex w-full items-center gap-3 rounded-lg px-3 py-3 text-sm font-medium text-red-600 transition hover:bg-red-50"
                >
                  <LogOut size={17} />
                  Log out
                </button>
              </form>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default NotesHeader;
