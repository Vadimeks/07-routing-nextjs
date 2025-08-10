// app/notes/filter/[...slug]/page.tsx

import { fetchNotes } from "@/lib/api";
import { type Metadata } from "next";
import { Toaster } from "react-hot-toast";
import NotesClient from "./Notes.client";
import { FetchNotesResponse } from "@/types/api";

// 1. Вызначаем тып для прапсаў, якія мы чакаем пасля "await"
interface ResolvedNotesPageProps {
  searchParams: {
    page?: string;
    search?: string;
  };
  params: {
    slug: string[];
  };
}

// 2. Вызначаем тып для функцыі, выкарыстоўваючы Awaited
type NotesPageFunctionProps = {
  [K in keyof ResolvedNotesPageProps]: Promise<
    Awaited<ResolvedNotesPageProps[K]>
  >;
};

export const metadata: Metadata = {
  title: "Notes",
};

// 3. Выкарыстоўваем новы тып у сігнатуры кампанента
export default async function NotesPage({
  searchParams,
  params,
}: NotesPageFunctionProps) {
  // Цяпер params і searchParams правільна тыпізаваныя як Promise, таму іх трэба чакаць
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
