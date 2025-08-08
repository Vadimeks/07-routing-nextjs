"use client";

import { useQuery } from "@tanstack/react-query";
import NoteList from "@/components/NoteList/NoteList";
import type { Note } from "@/types/note";
import { PlusCircle } from "lucide-react";
import Link from "next/link";

// Заўвага: каб пазбегнуць памылак, пераканайцеся, што NoteList таксама абноўлены,
// каб прымаць у якасці prop масіў аб'ектаў з уласцівасцю `tag`.

const mockFetchNotes = async (): Promise<Note[]> => {
  // Імітуем затрымку сеткі
  await new Promise((resolve) => setTimeout(resolve, 500));
  return [
    {
      id: "1",
      title: "Weekly Plan",
      content: "Complete the project, send the report, meet with the team.",
      createdAt: "2025-08-08T10:00:00Z",
      updatedAt: "2025-08-08T10:00:00Z",
      tag: "Work",
    },
    {
      id: "2",
      title: "Shopping List",
      content: "Milk, bread, eggs, vegetables, cheese.",
      createdAt: "2025-08-07T15:30:00Z",
      updatedAt: "2025-08-07T15:30:00Z",
      tag: "Shopping",
    },
    {
      id: "3",
      title: "NoteHub Ideas",
      content:
        "Add search functionality, change color scheme, add mobile version.",
      createdAt: "2025-08-06T08:00:00Z",
      updatedAt: "2025-08-06T08:00:00Z",
      tag: "Work",
    },
  ];
};

export default function NotesPage() {
  const {
    data: notes,
    isLoading,
    isError,
  } = useQuery<Note[]>({
    queryKey: ["notes"],
    queryFn: mockFetchNotes,
  });

  if (isLoading) {
    return (
      <div className="container mx-auto p-4 flex justify-center items-center h-screen">
        <p className="text-xl text-gray-500">Loading notes...</p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="container mx-auto p-4 flex justify-center items-center h-screen">
        <p className="text-xl text-red-500">Error loading notes.</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4 md:p-8">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold text-gray-900">My Notes</h2>
        <Link
          href="/notes/new"
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-xl shadow-md transition-colors duration-200 flex items-center gap-2"
        >
          <PlusCircle size={20} />
          <span>New Note</span>
        </Link>
      </div>
      <NoteList notes={notes || []} />
    </div>
  );
}
