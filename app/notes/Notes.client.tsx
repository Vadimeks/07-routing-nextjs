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
import { useRouter } from "next/navigation";

interface NotesClientProps {
  initialNotesData: FetchNotesResponse;
  initialPage: number;
  initialQuery: string;
}

export default function NotesClient({
  initialNotesData,
  initialPage,
  initialQuery,
}: NotesClientProps) {
  const router = useRouter();
  // Усталёўваем пачатковы стан на аснове props з сервера
  const [query, setQuery] = useState(initialQuery);
  const [page, setPage] = useState(initialPage);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [debouncedQuery] = useDebounce(query, 500);

  // Карэктна абнаўляем URL, калі змяняецца старонка ці пошукавы запыт
  useEffect(() => {
    const params = new URLSearchParams();
    if (page > 1) {
      params.set("page", String(page));
    }
    if (debouncedQuery) {
      params.set("search", debouncedQuery);
    }
    // Выкарыстоўваем 'replace', каб не засмечваць гісторыю браўзера
    router.replace(`?${params.toString()}`);
  }, [page, debouncedQuery, router]);

  // Выкарыстоўваем useQuery для кіравання станам загрузкі і кэша
  const { data, isLoading, isError, error, isFetching } = useQuery<
    FetchNotesResponse,
    Error
  >({
    queryKey: ["notes", debouncedQuery, page],
    queryFn: () => fetchNotes(page, 12, debouncedQuery),
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

  const notesToShow = data?.notes;
  const showLoader = (isLoading && !notesToShow) || isFetching;

  return (
    <div>
      <Toaster />
      <div className={css.app}>
        <header className={css.toolbar}>
          {/* Уласцівасць initialQuery выдалена, паколькі яе няма ў SearchBoxProps */}
          <SearchBox onSearch={handleSearch} />
          {data && data.totalPages > 1 && (
            <Pagination
              pageCount={Math.min(data.totalPages, 4)}
              onPageChange={handlePageChange}
              currentPage={page}
            />
          )}
          <button className={css.button} onClick={handleOpenModal}>
            Стварыць нататку +
          </button>
        </header>

        {/* Паказваем loading, калі ідзе загрузка новых даных */}
        {showLoader && <Loader />}

        {isError && (
          <div>
            Памылка пры загрузцы нататак: {error.message}
            {error.message.includes("400") && (
              <p>Праверце токен або паспрабуйце іншы пошукавы запыт.</p>
            )}
          </div>
        )}

        {notesToShow && notesToShow.length > 0 && (
          <NoteList notes={notesToShow} />
        )}

        {notesToShow && notesToShow.length === 0 && !showLoader && (
          <p>Not not found</p>
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
