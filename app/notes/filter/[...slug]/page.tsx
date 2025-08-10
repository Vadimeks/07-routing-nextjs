// app/notes/filter/[...slug]/page.tsx

import { fetchNotes } from "@/lib/api";
import { type Metadata } from "next";
import { Toaster } from "react-hot-toast";
import NotesClient from "./Notes.client";
import { FetchNotesResponse } from "@/types/api";

export const metadata: Metadata = {
  title: "Notes",
};

// Проста выкарыстоўваем прапсы напрамую, і TypeScript будзе іх правільна тыпізаваць.
export default async function NotesPage({
  searchParams,
  params,
}: {
  searchParams: {
    page?: string;
    search?: string;
  };
  params: {
    slug: string[];
  };
}) {
  // Цяпер params і searchParams з'яўляюцца Promise, таму іх трэба чакаць
  const resolvedSearchParams = await searchParams;
  const resolvedParams = await params;

  const pageParam = resolvedSearchParams.page;
  const searchParam = resolvedSearchParams.search;
  const slug = resolvedParams.slug;

  const page = pageParam ? Number(pageParam) : 1;
  const initialQuery = searchParam ?? "";

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
      />
      <Toaster />
    </>
  );
}
