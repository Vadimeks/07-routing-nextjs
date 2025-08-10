// app/notes/page.tsx

import { fetchNotes } from "@/lib/api";
import { type Metadata } from "next";
import { Toaster } from "react-hot-toast";
import NotesClient from "@/app/notes/filter/[...slug]/Notes.client";
import { FetchNotesResponse } from "@/types/api";

// 1. Вызначаем тып для прапсаў, якія мы чакаем пасля "await"
interface ResolvedNotesPageProps {
  searchParams: {
    page?: string;
    search?: string;
  };
}

// 2. Вызначаем тып для функцыі, выкарыстоўваючы Awaited
// Цяпер мы апрацоўваем толькі searchParams, бо params няма
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
}: NotesPageFunctionProps) {
  // Цяпер searchParams правільна тыпізаваныя як Promise
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

  return (
    <>
      <NotesClient
        initialNotesData={initialNotesData}
        initialPage={page}
        initialQuery={initialQuery}
        initialTag={""}
      />
      <Toaster />
    </>
  );
}
