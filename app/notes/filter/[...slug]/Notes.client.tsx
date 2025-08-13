// app/notes/filter/[...slug]/Notes.client.tsx

"use client";

import { useState, useEffect } from "react";
import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { useDebounce } from "use-debounce";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { Toaster } from "react-hot-toast";
import { useNotesContext } from "@/app/context/notesContext";

import Link from "next/link";
import SearchBox from "@/components/SearchBox/SearchBox";
import Pagination from "@/components/Pagination/Pagination";
import NoteList from "@/components/NoteList/NoteList";
import Loader from "@/components/Loader/Loader";

import { fetchNotes } from "@/lib/api";
import type { FetchNotesResponse, Tag } from "@/types/note";
import css from "./page.module.css";

interface NotesClientProps {
  initialNotesData: FetchNotesResponse;
  initialPage: number;
  initialQuery: string;
  initialTag: string;
  allTags: Tag[];
}

export default function NotesClient({
  initialNotesData,
  initialPage,
  initialQuery,
  initialTag,
}: NotesClientProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { setNotes } = useNotesContext();

  const [query, setQuery] = useState(initialQuery);
  const [page, setPage] = useState(initialPage);
  const [debouncedQuery] = useDebounce(query, 500);

  const activeTag = initialTag;

  useEffect(() => {
    setNotes(initialNotesData.notes);
  }, [initialNotesData, setNotes]);

  useEffect(() => {
    if (!pathname.includes("/notes/filter")) {
      return;
    }

    const newSearchParams = new URLSearchParams();

    if (page > 1) {
      newSearchParams.set("page", String(page));
    }
    if (debouncedQuery) {
      newSearchParams.set("search", debouncedQuery);
    }

    const newUrl = `/notes/filter/${activeTag}?${newSearchParams.toString()}`;

    if (newUrl !== pathname + "?" + searchParams.toString()) {
      router.replace(newUrl);
    }
  }, [page, debouncedQuery, activeTag, router, pathname, searchParams]);

  const { data, isLoading, isFetching } = useQuery<FetchNotesResponse, Error>({
    queryKey: ["notes", debouncedQuery, page, activeTag],
    queryFn: () =>
      fetchNotes(
        page,
        12,
        debouncedQuery,
        activeTag === "All" ? undefined : activeTag
      ),
    enabled: true,
    placeholderData: keepPreviousData,
    retry: 1,
    initialData: initialNotesData,
    refetchOnMount: false,
  });

  const handleSearch = (searchQuery: string) => {
    setQuery(searchQuery);
    setPage(1);
  };

  const handlePageChange = (selectedPage: number) => {
    setPage(selectedPage);
  };

  const notesToShow = data?.notes || [];
  const showLoader = (isLoading && !notesToShow.length) || isFetching;

  return (
    <div>
      <Toaster />
      <main className={css.app}>
        <div className={css.toolbar}>
          <SearchBox onSearch={handleSearch} initialQuery={query} />
          <Link href="/notes/create" className={css.button}>
            Create note +
          </Link>
        </div>
        {data && data.totalPages > 1 && (
          <Pagination
            pageCount={Math.min(data.totalPages, 4)}
            onPageChange={handlePageChange}
            currentPage={page}
          />
        )}
        {showLoader && <Loader />}
        {notesToShow.length > 0 && <NoteList notes={notesToShow} />}
        {notesToShow.length === 0 && !showLoader && <p>No notes found.</p>}
      </main>
    </div>
  );
}
