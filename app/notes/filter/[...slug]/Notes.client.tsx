// app/notes/filter/[...slug]/Notes.client.tsx
"use client";

import { useState, useEffect } from "react";
import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { useDebounce } from "use-debounce";
import SearchBox from "@/components/SearchBox/SearchBox";
import Pagination from "@/components/Pagination/Pagination";
import NoteList from "@/components/NoteList/NoteList";
import Loader from "@/components/Loader/Loader";
import Modal from "@/components/Modal/Modal";
import NoteForm from "@/components/NoteForm/NoteForm";
import { fetchNotes } from "@/lib/api";
import type { FetchNotesResponse } from "@/types/api";
import css from "./page.module.css";
import { Toaster } from "react-hot-toast";
import { useRouter, usePathname } from "next/navigation";
import { useNotesContext } from "@/app/context/notesContext";
// ❌ Выдаляем імпарт, бо ён не выкарыстоўваецца
// import type { Tag } from "@/types/note";

interface NotesClientProps {
  initialNotesData: FetchNotesResponse;
  initialPage: number;
  initialQuery: string;
  initialTag: string;
  // ❌ Выдаляем прапс, бо ён не выкарыстоўваецца
  // allTags: string[];
}

export default function NotesClient({
  initialNotesData,
  initialPage,
  initialQuery,
  initialTag,
  // ❌ Выдаляем прапс
  // allTags,
}: NotesClientProps) {
  const router = useRouter();
  const pathname = usePathname();
  const { setNotes } = useNotesContext();

  const [query, setQuery] = useState(initialQuery);
  const [page, setPage] = useState(initialPage);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [debouncedQuery] = useDebounce(query, 500);

  const activeTag = initialTag;

  useEffect(() => {
    setNotes(initialNotesData.notes);
  }, [initialNotesData, setNotes]);

  useEffect(() => {
    const params = new URLSearchParams();
    if (page > 1) {
      params.set("page", String(page));
    }
    if (debouncedQuery) {
      params.set("search", debouncedQuery);
    }

    let newPath = pathname;
    if (activeTag && activeTag !== "All") {
      newPath = `/notes/filter/${activeTag}`;
    } else {
      newPath = "/notes";
    }

    const newUrl = `${newPath}?${params.toString()}`;

    if (newUrl !== `${pathname}?${params.toString()}`) {
      router.replace(newUrl);
    }
  }, [page, debouncedQuery, router, activeTag, pathname]);

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

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const notesToShow = data?.notes || [];
  const showLoader = (isLoading && !notesToShow.length) || isFetching;

  return (
    <div>
      <Toaster />
      <div className={css.app}>
        <header className={css.toolbar}>
          <SearchBox onSearch={handleSearch} initialQuery={query} />
          {data && data.totalPages > 1 && (
            <Pagination
              pageCount={data.totalPages}
              onPageChange={handlePageChange}
              currentPage={page}
            />
          )}
          <button className={css.button} onClick={handleOpenModal}>
            Стварыць нататку +
          </button>
        </header>

        {showLoader && <Loader />}

        {notesToShow.length > 0 && <NoteList notes={notesToShow} />}

        {notesToShow.length === 0 && !showLoader && (
          <p>Нататак не знойдзена.</p>
        )}

        {isModalOpen && (
          <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
            <NoteForm onClose={handleCloseModal} />
          </Modal>
        )}
      </div>
    </div>
  );
}
