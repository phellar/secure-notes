
"use server";

import { createClient } from "../lib/supabase/server";
import { redirect } from "next/navigation";

export const register = async (formData: FormData) => {
  const email = String(formData.get("email") ?? "").trim();
  const password = String(formData.get("password") ?? "");

  if (!email || password.length < 8) {
    redirect("/register?error=invalid");
  }

  const supabase = await createClient();

  try {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      console.error("SUPABASE SIGNUP ERROR:", error);
      console.error("ERROR MESSAGE:", error.message);

      redirect("/register?error=failed");
    }

    console.log("SIGNUP SUCCESS:", {
      userCreated: !!data.user,
      sessionCreated: !!data.session,
    });

    if (!data.session) {
      redirect("/register?error=confirmation");
    }

    redirect("/");
  } catch (error) {
    // Next.js redirect errors must be allowed to propagate.
    if (
      error instanceof Error &&
      error.message === "NEXT_REDIRECT"
    ) {
      throw error;
    }

    console.error("SIGNUP EXCEPTION:", error);

    if (error instanceof Error) {
      console.error("EXCEPTION MESSAGE:", error.message);
      console.error("EXCEPTION STACK:", error.stack);
    }

    redirect("/register?error=failed");
  }
};
