// app/notes/filter/[...slug]/page.tsx

import { fetchNotes } from "@/lib/api";
import { type Metadata } from "next";
import { Toaster } from "react-hot-toast";
import NotesClient from "./Notes.client";
import { FetchNotesResponse } from "@/types/api";
import type { Tag } from "@/types/note";

// 1. Вызначаем тып для прапсаў, якія мы чакаем пасля "await"
interface ResolvedPageProps {
  searchParams: {
    page?: string;
    search?: string;
  };
  params: {
    slug?: string[];
  };
}

// 2. Абгортваем тып у Promise, каб адпавядаць патрабаванням Next.js 15
type NotesPageProps = {
  [K in keyof ResolvedPageProps]: Promise<ResolvedPageProps[K]>;
};

export const metadata: Metadata = {
  title: "Notes",
};

export default async function NotesPage({
  searchParams,
  params,
}: NotesPageProps) {
  const resolvedSearchParams = await searchParams;
  const resolvedParams = await params;

  const pageParam = resolvedSearchParams.page;
  const searchParam = resolvedSearchParams.search;
  const slug = resolvedParams.slug;

  const page = pageParam ? Number(pageParam) : 1;
  const initialQuery = searchParam || "";

  const filterTag =
    slug && slug.length > 0 && slug[0] !== "all" ? slug[0] : "All";
  const tagForApi = filterTag === "All" ? undefined : filterTag;

  const initialNotesData: FetchNotesResponse = await fetchNotes(
    page,
    12,
    initialQuery,
    tagForApi
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
        initialTag={filterTag}
        allTags={allTags}
      />
      <Toaster />
    </>
  );
}
