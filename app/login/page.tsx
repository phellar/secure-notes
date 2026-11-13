
import Link from "next/link";
import { Suspense } from "react";
import { FileText } from "lucide-react";
import { logIn } from "./actions";
import LoginButton from "./LoginButton";

type LoginPageProps = {
  searchParams: Promise<{
    error?: string;
  }>;
};

const LoginForm = async ({ searchParams }: LoginPageProps) => {
  const params = await searchParams;

  return (
    <div className="w-full max-w-sm">
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-7">
        <div className="mb-7">
          <h1 className="text-2xl font-semibold tracking-tight text-slate-900">
            Welcome back
          </h1>
          <p className="mt-2 text-sm text-slate-500">
            Log in to access your private notes.
          </p>
        </div>

        {params.error === "invalid" && (
          <div className="mb-5 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
            Wrong email or password.
          </div>
        )}

        <form action={logIn} className="space-y-4">
          <div>
            <label htmlFor="email" className="mb-1.5 block text-sm font-medium text-slate-700">
              Email address
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              className="w-full rounded-lg border border-slate-200 px-3.5 py-3 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10"
              placeholder="you@example.com"
            />
          </div>

          <div>
            <label htmlFor="password" className="mb-1.5 block text-sm font-medium text-slate-700">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              required
              className="w-full rounded-lg border border-slate-200 px-3.5 py-3 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10"
              placeholder="Enter your password"
            />
          </div>

          <LoginButton />
        </form>

        <p className="mt-6 text-center text-sm text-slate-500">
          Don't have an account?{" "}
          <Link href="/register" className="font-medium text-blue-600 hover:text-blue-700">
            Create account
          </Link>
        </p>
      </div>

      <p className="mt-5 text-center text-xs text-slate-400">
        Your notes are private and only accessible to you.
      </p>
    </div>
  );
};

const LoginPage = ({ searchParams }: LoginPageProps) => {
  return (
    <main className="flex min-h-screen flex-col bg-[#F3F6FA]">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex w-full max-w-6xl items-center gap-3 px-5 py-4">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600 text-white">
            <FileText size={21} strokeWidth={1.8} />
          </div>
          <div>
            <h1 className="text-base font-semibold tracking-tight text-slate-900">
              Secure Notes
            </h1>
            <p className="text-xs text-slate-500">Your private space</p>
          </div>
        </div>
      </header>

      <section className="flex flex-1 items-center justify-center px-5 py-8">
        <Suspense
          fallback={
            <div className="w-full max-w-sm animate-pulse rounded-2xl border border-slate-200 bg-white p-7 shadow-sm">
              <div className="mb-6 h-7 w-36 rounded bg-slate-100" />
              <div className="mb-4 h-10 rounded bg-slate-100" />
              <div className="mb-4 h-10 rounded bg-slate-100" />
              <div className="h-11 rounded bg-slate-100" />
            </div>
          }
        >
          <LoginForm searchParams={searchParams} />
        </Suspense>
      </section>
    </main>
  );
};

export default LoginPage;
