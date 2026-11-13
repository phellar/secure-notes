"use client";

import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

type ToastHandlerProps = {
  success?: string;
  error?: string;
};

const ToastHandler = ({ success, error }: ToastHandlerProps) => {
  const router = useRouter();
  const handled = useRef("");

  // Handle form submission spinner
  useEffect(() => {
    const forms = document.querySelectorAll<HTMLFormElement>(
      "form[data-loading-form]"
    );

    const handleSubmit = (event: Event) => {
      const form = event.currentTarget as HTMLFormElement;
      const button = form.querySelector<HTMLButtonElement>(
        "[data-loading-button]"
      );
      const spinner = button?.querySelector<SVGElement>("[data-spinner]");
      const buttonText = button?.querySelector<HTMLSpanElement>(
        "[data-button-text]"
      );

      if (!button || button.disabled) return;

      button.disabled = true;
      spinner?.classList.remove("hidden");

      if (buttonText) {
        buttonText.textContent = "Saving...";
      }
    };

    forms.forEach((form) => {
      form.addEventListener("submit", handleSubmit);
    });

    return () => {
      forms.forEach((form) => {
        form.removeEventListener("submit", handleSubmit);
      });
    };
  }, []);

  // Handle success and error notifications
  useEffect(() => {
    if (!success && !error) {
      handled.current = "";
      return;
    }

    const key = `${success ?? ""}:${error ?? ""}`;

    if (handled.current === key) return;

    handled.current = key;

    if (success) {
      const messages: Record<string, string> = {
        created: "Note saved successfully.",
        updated: "Note updated successfully.",
        deleted: "Note deleted successfully.",
      };

      toast.success(
        messages[success] || "Operation completed successfully."
      );
    }

    if (error) {
      const messages: Record<string, string> = {
        "title-required": "Please enter a title.",
        "invalid-note": "Invalid note.",
        "not-found": "Note not found.",
      };

      toast.error(messages[error] || "Something went wrong.");
    }

    router.replace("/", { scroll: false });
  }, [success, error, router]);

  return null;




  const messages: Record<string, string> = {
  "title-required": "Please enter a title.",
  "required-fields": "Please enter both a title and a note.",
  "save-failed": "Unable to save your note. Please try again.",
  "invalid-note": "Invalid note.",
  "not-found": "Note not found.",
};
};

export default ToastHandler;