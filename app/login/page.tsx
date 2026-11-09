
import Link from "next/link";
import { logIn } from "./actions";

type LoginPageProps = {
  searchParams: Promise<{ error?: string }>;
};

const LoginPage = async ({ searchParams }: LoginPageProps) => {
  const params = await searchParams;

  return (
    <main className="flex min-h-screen items-center justify-center bg-gray-50 px-5 py-12">
      <div className="w-full max-w-md rounded-2xl border border-gray-200 bg-white p-7 shadow-sm sm:p-9">
        <div className="mb-9">
          <h1 className="text-2xl font-semibold tracking-tight text-gray-900">
            Welcome back
          </h1>

          <p className="mt-2 text-sm text-gray-500">
            Sign in to access your private notes.
          </p>
        </div>

        {params.error && (
          <div className="mb-5 rounded-lg bg-red-50 px-4 py-3 text-sm text-red-600">
            Wrong email or password
          </div>
        )}

        <form action={logIn} className="space-y-5">
          <div>
            <label htmlFor="email" className="mb-2 block text-sm font-medium text-gray-700">
              Email address
            </label>

            <input
              id="email"
              name="email"
              type="email"
              required
              autoComplete="email"
              placeholder="you@example.com"
              className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm outline-none transition focus:border-teal-700 focus:ring-2 focus:ring-teal-700/10"
            />
          </div>

          <div>
            <label htmlFor="password" className="mb-2 block text-sm font-medium text-gray-700">
              Password
            </label>

            <input
              id="password"
              name="password"
              type="password"
              required
              autoComplete="current-password"
              placeholder="Enter your password"
              className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm outline-none transition focus:border-teal-700 focus:ring-2 focus:ring-teal-700/10"
            />
          </div>

          <button
            type="submit"
            className="w-full rounded-lg bg-teal-800 px-4 py-3 text-sm font-medium text-white transition hover:bg-teal-900"
          >
            Sign in
          </button>
        </form>

        <p className="mt-7 text-center text-sm text-gray-500">
          Don't have an account?{" "}
          <Link href="/register" className="font-medium text-teal-800 hover:underline">
            Create account
          </Link>
        </p>
      </div>
    </main>
  );
};

export default LoginPage;
