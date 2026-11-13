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

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const { error } = await supabase.from("notes").insert({
    title,
    body,
  });

  if (error) {
    throw new Error("Unable to save note. Please try again.");
  }

  revalidatePath("/");
  redirect("/?success=created");
};

export const updateNote = async (formData: FormData) => {
  const id = String(formData.get("id") ?? "").trim();
  const title = String(formData.get("title") ?? "").trim();
  const body = String(formData.get("body") ?? "");

  if (!id) {
    redirect("/?error=invalid-note");
  }

  if (!title) {
    redirect("/?error=title-required");
  }

  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const { data, error } = await supabase
    .from("notes")
    .update({
      title,
      body,
      updated_at: new Date().toISOString(),
    })
    .eq("id", id)
    .select("id")
    .maybeSingle();

  if (error) {
    throw new Error("Unable to update note. Please try again.");
  }

  if (!data) {
    redirect("/?error=not-found");
  }

  revalidatePath("/");
  revalidatePath(`/notes/${id}`);

  redirect("/?success=updated");
};

export const deleteNote = async (formData: FormData) => {
  const id = String(formData.get("id") ?? "").trim();

  if (!id) {
    redirect("/?error=invalid-note");
  }

  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const { data, error } = await supabase
    .from("notes")
    .delete()
    .eq("id", id)
    .select("id")
    .maybeSingle();

  if (error) {
    throw new Error("Unable to delete note. Please try again.");
  }

  if (!data) {
    redirect("/?error=not-found");
  }

  revalidatePath("/");
  revalidatePath(`/notes/${id}`);

  redirect("/?success=deleted");


  redirect("/?success=created");
redirect("/?success=updated");
redirect("/?success=deleted");
};