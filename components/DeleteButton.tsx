"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

type Props = {
  action: () => Promise<void>;
  label?: string;
};

export default function DeleteButton({ action, label = "Delete" }: Props) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function handleClick() {
    if (!confirm("Are you sure you want to delete this record?")) return;
    setLoading(true);
    try {
      await action();
      router.refresh();
    } finally {
      setLoading(false);
    }
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      disabled={loading}
      className="rounded-lg border border-red-200 bg-white px-3 py-1.5 text-sm font-medium text-red-700 hover:bg-red-50 disabled:opacity-50"
    >
      {loading ? "Deleting…" : label}
    </button>
  );
}
