// app/notes/filter/[...slug]/page.tsx

import { fetchNotes } from "@/lib/api";
import { type Metadata } from "next";
import { Toaster } from "react-hot-toast";
import NotesClient from "./Notes.client";
import { FetchNotesResponse } from "@/types/api";
// ❌ Гэты імпарт больш не патрэбны
// import { Tag } from "@/types/note";

export const metadata: Metadata = {
  title: "Notes",
};

interface NotesPageProps {
  searchParams: {
    page?: string;
    search?: string;
  };
  params: {
    slug?: string[];
  };
}

export default async function NotesPage({
  searchParams,
  params,
}: NotesPageProps) {
  const resolvedSearchParams = await Promise.resolve(searchParams);
  const resolvedParams = await Promise.resolve(params);

  const pageParam = resolvedSearchParams.page;
  const searchParam = resolvedSearchParams.search;
  const slug = resolvedParams.slug;

  const page = pageParam ? Number(pageParam) : 1;
  const initialQuery = searchParam || "";

  // ❌ Гэты масіў больш не патрэбны
  // const allTags: Tag[] = ["Todo", "Work", "Personal", "Meeting", "Shopping"];

  const filterTag =
    slug && slug.length > 0 && slug[0] !== "all" ? slug[0] : "All";
  const tagForApi = filterTag === "All" ? undefined : filterTag;

  const initialNotesData: FetchNotesResponse = await fetchNotes(
    page,
    12,
    initialQuery,
    tagForApi
  );

  return (
    <>
      <NotesClient
        initialNotesData={initialNotesData}
        initialPage={page}
        initialQuery={initialQuery}
        initialTag={filterTag}
        // ❌ Выдаляем гэты радок
        // allTags={allTags}
      />
      <Toaster />
    </>
  );
}
