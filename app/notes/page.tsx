import NotesClient from "./Notes.client";
import { fetchNotes } from "@/lib/api";
import type { FetchNotesResponse } from "@/types/api";

export default async function NotesPage() {
  const initialNotesData: FetchNotesResponse = await fetchNotes(1, 12, "");

  return (
    <main>
      {}
      <NotesClient initialNotesData={initialNotesData} />
    </main>
  );
}
