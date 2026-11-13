
import Link from "next/link";
import { Suspense } from "react";
import { FileText } from "lucide-react";
import { register } from "./actions";
import RegisterButton from "./RegisterButton";

type RegisterPageProps = {
  searchParams: Promise<{
    error?: string;
  }>;
};

const RegisterForm = async ({ searchParams }: RegisterPageProps) => {
  const { error } = await searchParams;

  return (
    <div className="w-full max-w-sm">
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-7">
        <div className="mb-6">
          <h1 className="text-xl font-semibold tracking-tight text-slate-900">
            Create an account
          </h1>

          <p className="mt-1.5 text-sm text-slate-500">
            Create your account to start managing your private notes.
          </p>
        </div>

        {error === "failed" && (
          <div className="mb-4 rounded-lg border border-red-100 bg-red-50 px-3 py-2.5 text-xs text-red-600">
            Unable to create your account. Try another email or log in.
          </div>
        )}

        {error === "invalid" && (
          <div className="mb-4 rounded-lg border border-red-100 bg-red-50 px-3 py-2.5 text-xs text-red-600">
            Enter a valid email and a password of at least 8 characters.
          </div>
        )}

        <form action={register} className="space-y-4">
          <div>
            <label
              htmlFor="email"
              className="mb-1.5 block text-sm font-medium text-slate-700"
            >
              Email address
            </label>

            <input
              id="email"
              name="email"
              type="email"
              required
              autoComplete="email"
              placeholder="you@example.com"
              className="w-full rounded-lg border border-slate-200 px-3.5 py-2.5 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="mb-1.5 block text-sm font-medium text-slate-700"
            >
              Password
            </label>

            <input
              id="password"
              name="password"
              type="password"
              required
              minLength={8}
              autoComplete="new-password"
              placeholder="At least 8 characters"
              className="w-full rounded-lg border border-slate-200 px-3.5 py-2.5 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10"
            />
          </div>

          <RegisterButton />
        </form>

        <div className="mt-5 border-t border-slate-100 pt-4">
          <p className="text-center text-sm text-slate-500">
            Already have an account?{" "}
            <Link
              href="/login"
              className="font-medium text-blue-600 transition hover:text-blue-700 hover:underline"
            >
              Log in
            </Link>
          </p>
        </div>
      </div>

      <p className="mt-5 text-center text-xs text-slate-400">
        Your notes are private and only accessible to you.
      </p>
    </div>
  );
};

const RegisterPage = (props: RegisterPageProps) => {
  return (
    <main className="flex min-h-screen flex-col bg-[#F3F6FA]">
      {/* Header */}
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex w-full max-w-6xl items-center gap-3 px-5 py-4">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600 text-white">
            <FileText size={21} strokeWidth={1.8} />
          </div>

          <div>
            <h2 className="text-base font-semibold tracking-tight text-slate-900">
              Secure Notes
            </h2>
            <p className="text-xs text-slate-500">
              Your private space
            </p>
          </div>
        </div>
      </header>

      {/* Registration section */}
      <section className="flex flex-1 items-center justify-center px-5 py-8">
        <Suspense
          fallback={
            <div className="w-full max-w-sm animate-pulse rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-7">
              <div className="mb-4 h-6 w-48 rounded bg-slate-200" />
              <div className="mb-6 h-4 w-64 rounded bg-slate-100" />
              <div className="mb-4 h-10 rounded-lg bg-slate-100" />
              <div className="h-10 rounded-lg bg-slate-100" />
            </div>
          }
        >
          <RegisterForm searchParams={props.searchParams} />
        </Suspense>
      </section>
    </main>
  );
};

export default RegisterPage;
