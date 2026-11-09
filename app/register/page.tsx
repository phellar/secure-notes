
import Link from "next/link";
import { Suspense } from "react";
import { register } from "./actions";

type RegisterPageProps = {
  searchParams: Promise<{
    error?: string;
  }>;
};

const RegisterForm = async ({ searchParams }: RegisterPageProps) => {
  const { error } = await searchParams;

  return (
    <div className="w-full max-w-md">
      <div className="mb-8">
        <h1 className="text-3xl font-semibold tracking-tight text-gray-900">
          Create an account
        </h1>

        <p className="mt-2 text-sm text-gray-500">
          Create your account to start managing your private notes.
        </p>
      </div>

      {error === "failed" && (
        <div className="mb-5 rounded-lg border border-red-100 bg-red-50 p-3 text-sm text-red-600">
          Unable to create your account. Try another email or log in.
        </div>
      )}

      {error === "invalid" && (
        <div className="mb-5 rounded-lg border border-red-100 bg-red-50 p-3 text-sm text-red-600">
          Enter a valid email and a password of at least 8 characters.
        </div>
      )}

      <form action={register} className="space-y-5">
        <div>
          <label
            htmlFor="email"
            className="mb-2 block text-sm font-medium text-gray-700"
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
            className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm outline-none transition focus:border-teal-700 focus:ring-2 focus:ring-teal-700/10"
          />
        </div>

        <div>
          <label
            htmlFor="password"
            className="mb-2 block text-sm font-medium text-gray-700"
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
            className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm outline-none transition focus:border-teal-700 focus:ring-2 focus:ring-teal-700/10"
          />
        </div>

        <button
          type="submit"
          className="w-full rounded-lg bg-teal-800 px-4 py-3 text-sm font-medium text-white transition hover:bg-teal-900"
        >
          Create account
        </button>
      </form>

      <p className="mt-6 text-center text-sm text-gray-500">
        Already have an account?{" "}
        <Link
          href="/login"
          className="font-medium text-teal-800 hover:underline"
        >
          Log in
        </Link>
      </p>
    </div>
  );
};

const RegisterPage = (props: RegisterPageProps) => {
  return (
    <main className="flex min-h-screen items-center justify-center bg-gray-50 px-5 py-12">
      <Suspense
        fallback={
          <div className="w-full max-w-md animate-pulse space-y-4">
            <div className="h-8 w-48 rounded bg-gray-200" />
            <div className="h-4 w-64 rounded bg-gray-200" />
            <div className="h-12 rounded-lg bg-gray-200" />
            <div className="h-12 rounded-lg bg-gray-200" />
          </div>
        }
      >
        <RegisterForm searchParams={props.searchParams} />
      </Suspense>
    </main>
  );
};

export default RegisterPage;
