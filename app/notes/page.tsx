import NotesClient from "@/app/notes/Notes.client";
import { fetchNotes } from "@/lib/api";
import { type Metadata } from "next";

export const metadata: Metadata = {
  title: "Notes",
};

interface NotesPageProps {
  searchParams: Promise<{
    page?: string;
    search?: string;
  }>;
}

export default async function NotesPage({ searchParams }: NotesPageProps) {
  // Чакаем searchParams асінхронна
  const paramsObj = await searchParams;
  const params = new URLSearchParams(
    Object.entries(paramsObj).filter(([, value]) => value !== undefined) as [
      string,
      string,
    ][]
  );

  const page = params.get("page") ? Number(params.get("page")) : 1;
  const query = params.get("search") || "";

  const initialNotesData = await fetchNotes(page, 12, query);

  return (
    <NotesClient
      initialNotesData={initialNotesData}
      initialPage={page}
      initialQuery={query}
    />
  );
}
