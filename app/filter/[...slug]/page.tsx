import NotesClient from "@/app/filter/[...slug]/Notes.client";
import { fetchNotes } from "@/lib/api";
import { type Metadata } from "next";

export const metadata: Metadata = {
  title: "Notes",
};

interface NotesPageProps {
  // Add dynamic route parameters
  params: {
    slug: string[];
  };
  searchParams: {
    page?: string;
    search?: string;
  };
}

export default async function NotesPage({
  params,
  searchParams,
}: NotesPageProps) {
  // Extract the tag from the dynamic route parameters
  // Handle cases where slug might be empty or the 'all' tag is used
  const tag = params.slug?.[0] !== "all" ? params.slug?.[0] : undefined;

  const page = searchParams.page ? Number(searchParams.page) : 1;
  const query = searchParams.search || "";

  // Call fetchNotes with the tag, page, and query parameters
  const initialNotesData = await fetchNotes(page, 12, query, tag);

  return (
    <NotesClient
      initialNotesData={initialNotesData}
      initialPage={page}
      initialQuery={query}
      initialTag={tag} // Pass the tag to the client component
    />
  );
}
