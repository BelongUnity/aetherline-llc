"use client";

import { FormEvent, useState } from "react";

type Status = "idle" | "sending" | "sent" | "error";

function statusCopy(status: Status): string {
  switch (status) {
    case "idle":
      return "";
    case "sending":
      return "Sending…";
    case "sent":
      return "Received. We will reply from Pristina, CET.";
    case "error":
      return "Could not send. Try again or email cancolak666@icloud.com.";
    default: {
      const _never: never = status;
      return _never;
    }
  }
}

export function EngageForm() {
  const [status, setStatus] = useState<Status>("idle");

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    setStatus("sending");
    try {
      const response = await fetch("/api/engage", {
        method: "POST",
        body: new FormData(form),
      });
      if (!response.ok) {
        setStatus("error");
        return;
      }
      form.reset();
      setStatus("sent");
    } catch {
      setStatus("error");
    }
  }

  const message = statusCopy(status);

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-5">
      <label className="flex flex-col gap-2 text-sm">
        Name
        <input required name="name" className="engage-field" />
      </label>
      <label className="flex flex-col gap-2 text-sm">
        Email
        <input required type="email" name="email" className="engage-field" />
      </label>
      <label className="flex flex-col gap-2 text-sm">
        What needs running
        <textarea required name="message" rows={5} className="engage-field min-h-32" />
      </label>
      <button
        type="submit"
        disabled={status === "sending"}
        className="mt-1 min-h-11 rounded-full bg-[#2bd4d9] px-6 py-3 font-mono text-[11px] tracking-[0.22em] text-[#050607] uppercase outline-none transition-transform duration-200 ease-out enabled:active:scale-[0.97] disabled:opacity-50 focus-visible:ring-2 focus-visible:ring-[#2bd4d9] focus-visible:ring-offset-2 focus-visible:ring-offset-[#030508]"
      >
        Send
      </button>
      {message ? (
        <p className="font-mono text-[11px] tracking-[0.08em] text-[#8a9398]">{message}</p>
      ) : null}
    </form>
  );
}
