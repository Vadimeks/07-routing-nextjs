// app/notes/page.tsx

import { fetchNotes } from "@/lib/api";
import { type Metadata } from "next";
import { Toaster } from "react-hot-toast";
import NotesClient from "@/app/notes/filter/[...slug]/Notes.client";
import { FetchNotesResponse } from "@/types/api";
// ❌ Гэты імпарт больш не патрэбны, калі мы не выкарыстоўваем allTags
// import { Tag } from "@/types/note";

export const metadata: Metadata = {
  title: "Notes",
};

interface NotesPageProps {
  searchParams: {
    page?: string;
    search?: string;
  };
}

export default async function NotesPage({ searchParams }: NotesPageProps) {
  const resolvedSearchParams = await Promise.resolve(searchParams);

  const pageParam = resolvedSearchParams.page;
  const searchParam = resolvedSearchParams.search;

  const page = pageParam ? Number(pageParam) : 1;
  const initialQuery = searchParam || "";

  // ❌ Гэты масіў больш не патрэбны
  // const allTags: Tag[] = ["Todo", "Work", "Personal", "Meeting", "Shopping"];

  const initialNotesData: FetchNotesResponse = await fetchNotes(
    page,
    12,
    initialQuery
  );

  return (
    <>
      <NotesClient
        initialNotesData={initialNotesData}
        initialPage={page}
        initialQuery={initialQuery}
        initialTag={""}
        // ❌ Выдаляем гэты радок
        // allTags={allTags}
      />
      <Toaster />
    </>
  );
}
