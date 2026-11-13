
"use client";

import { useEffect, useRef, useState } from "react";
import { useFormStatus } from "react-dom";
import { LogOut, ChevronDown, UserRound } from "lucide-react";

type NotesHeaderProps = {
  email: string;
  logOut: () => Promise<void>;
};

const LogoutButton = () => {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className="mt-1 flex w-full items-center gap-3 rounded-lg px-3 py-3 text-sm font-medium text-red-600 transition hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-70"
    >
      {pending ? (
        <svg
          className="h-4 w-4 animate-spin"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
          />
        </svg>
      ) : (
        <LogOut size={17} />
      )}

      {pending ? "Logging out..." : "Log out"}
    </button>
  );
};

const NotesHeader = ({ email, logOut }: NotesHeaderProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const desktopDropdownRef = useRef<HTMLDivElement>(null);
  const mobileDropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;

      const insideDesktop =
        desktopDropdownRef.current?.contains(target);

      const insideMobile =
        mobileDropdownRef.current?.contains(target);

      if (!insideDesktop && !insideMobile) {
        setIsOpen(false);
      }
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, []);

  const initials = email
    ? email.split("@")[0].slice(0, 2).toUpperCase()
    : "U";

  return (
    <header className="border-b border-slate-200 bg-white">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4 sm:px-8">

        {/* App identity */}
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600 text-white">
            <UserRound size={21} />
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

        {/* Desktop account dropdown */}
        <div
          className="relative hidden sm:block"
          ref={desktopDropdownRef}
        >
          <button
            type="button"
            onClick={() => setIsOpen((prev) => !prev)}
            aria-expanded={isOpen}
            aria-label="Open account menu"
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
                <p className="text-xs text-slate-400">
                  Logged in as
                </p>

                <p className="mt-1 truncate text-sm font-medium text-slate-800">
                  {email}
                </p>
              </div>

              <form action={logOut}>
                <LogoutButton />
              </form>
            </div>
          )}
        </div>

        {/* Mobile account dropdown */}
        <div
          className="relative sm:hidden"
          ref={mobileDropdownRef}
        >
          <button
            type="button"
            onClick={() => setIsOpen((prev) => !prev)}
            aria-expanded={isOpen}
            aria-label="Open account menu"
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
                <p className="text-xs text-slate-400">
                  Logged in as
                </p>

                <p className="mt-1 truncate text-sm font-medium text-slate-800">
                  {email}
                </p>
              </div>

              <form action={logOut}>
                <LogoutButton />
              </form>
            </div>
          )}
        </div>

      </div>
    </header>
  );
};

export default NotesHeader;
