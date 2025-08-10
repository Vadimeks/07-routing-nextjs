// app/notes/filter/[...slug]/page.tsx

import { fetchNotes } from "@/lib/api";
import { type Metadata } from "next";
import { Toaster } from "react-hot-toast";
import NotesClient from "./Notes.client";

import { Tag } from "@/types/note"; // Імпартуем статычны тып Tag

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

  const page = pageParam ? Number(pageParam) : 1;
  const initialQuery = searchParam || "";

  // Статычны спіс усіх тэгаў, як і на асноўнай старонцы
  const allTags: Tag[] = ["Todo", "Work", "Personal", "Meeting", "Shopping"];

  const filterTag =
    resolvedParams.slug &&
    resolvedParams.slug.length > 0 &&
    resolvedParams.slug[0] !== "all"
      ? resolvedParams.slug[0]
      : "All";

  // Калі тэг - "All", перадаем undefined, а не пусты радок
  const tagForApi = filterTag === "All" ? undefined : filterTag;

  const initialNotesData = await fetchNotes(page, 12, initialQuery, tagForApi);

  return (
    <>
      <NotesClient
        initialNotesData={initialNotesData}
        initialPage={page}
        initialQuery={initialQuery}
        initialTag={filterTag}
        allTags={allTags}
      />
      <Toaster />
    </>
  );
}
