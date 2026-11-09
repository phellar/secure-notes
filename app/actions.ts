
"use server";

import { createClient } from "./lib/supabase/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export const logOut = async () => {
  const supabase = await createClient();

  await supabase.auth.signOut();

  redirect("/login");
};

export const addNote = async (formData: FormData) => {
  const title = String(formData.get("title") ?? "").trim();
  const body = String(formData.get("body") ?? "");

  if (!title) {
    redirect("/?error=title-required");
  }

  const supabase = await createClient();

  const { error } = await supabase.from("notes").insert({
    title,
    body,
  });

  if (error) {
    throw new Error("Unable to save note. Please try again.");
  }

  revalidatePath("/");
};
