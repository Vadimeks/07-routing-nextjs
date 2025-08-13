// app/notes/page.tsx

import { fetchNotes } from "@/lib/api";
import { type Metadata } from "next";
import { Toaster } from "react-hot-toast";
import NotesClient from "@/app/notes/filter/[...slug]/Notes.client";
import { FetchNotesResponse } from "@/types/api";
import type { Tag } from "@/types/note";

interface ResolvedPageProps {
  searchParams: {
    page?: string;
    search?: string;
  };
}

type NotesPageProps = {
  [K in keyof ResolvedPageProps]: Promise<ResolvedPageProps[K]>;
};

export const metadata: Metadata = {
  title: "Notes",
};

export default async function NotesPage({ searchParams }: NotesPageProps) {
  const resolvedSearchParams = await searchParams;

  const pageParam = resolvedSearchParams.page;
  const searchParam = resolvedSearchParams.search;

  const page = pageParam ? Number(pageParam) : 1;
  const initialQuery = searchParam || "";

  const initialNotesData: FetchNotesResponse = await fetchNotes(
    page,
    12,
    initialQuery
  );

  const allTags: Tag[] = [
    "Todo",
    "Work",
    "Personal",
    "Meeting",
    "Shopping",
    "All",
  ];

  return (
    <>
      <NotesClient
        initialNotesData={initialNotesData}
        initialPage={page}
        initialQuery={initialQuery}
        initialTag={"All"}
        allTags={allTags}
      />
      <Toaster />
    </>
  );
}
