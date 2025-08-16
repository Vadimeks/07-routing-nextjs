import { fetchNotes } from "@/lib/api";
import { type Metadata } from "next";
import { Toaster } from "react-hot-toast";
import NotesClient from "./Notes.client";
import type { Tag } from "@/types/note";

export const metadata: Metadata = {
  title: "Notes",
};

interface NotesPageProps {
  searchParams: Promise<{ page?: string; search?: string }>;
  params: Promise<{ slug?: string[] }>;
}

export default async function NotesPage({
  searchParams,
  params,
}: NotesPageProps) {
  const resolvedSearchParams = await searchParams;
  const resolvedParams = await params;

  const pageParam = resolvedSearchParams.page;
  const searchParam = resolvedSearchParams.search;

  const page = pageParam ? Number(pageParam) : 1;
  const search = searchParam || "";

  const validTags: Tag[] = [
    "Todo",
    "Work",
    "Personal",
    "Meeting",
    "Shopping",
    "All",
  ];
  const slugTag =
    resolvedParams.slug &&
    resolvedParams.slug.length > 0 &&
    resolvedParams.slug[0] !== "all"
      ? resolvedParams.slug[0]
      : "All";

  const tag: Tag = validTags.includes(slugTag as Tag)
    ? (slugTag as Tag)
    : "All";

  const tagForApi = tag === "All" ? undefined : tag;

  const notesData = await fetchNotes(page, 12, search, tagForApi);

  return (
    <>
      <NotesClient notesData={notesData} tag={tag} />
      <Toaster />
    </>
  );
}
