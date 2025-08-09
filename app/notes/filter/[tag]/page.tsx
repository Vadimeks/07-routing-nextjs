"use client";

import React, { use } from "react";
import { useNotesContext } from "@/app/context/notesContext";
import NoteList from "@/components/NoteList/NoteList";
import { Tag } from "@/types/note";

interface FilteredNotesPageProps {
  // Вызначаем params як Promise, каб TypeScript быў у курсе.
  params: Promise<{
    tag: string;
  }>;
}

const FilteredNotesPage = ({ params }: FilteredNotesPageProps) => {
  const { notes } = useNotesContext();

  // Цяпер params мае правільны тып, і мы можам выкарыстоўваць use без прымусовых пераводаў.
  const resolvedParams = use(params);
  const { tag } = resolvedParams;

  const activeTag = tag as Tag;
  const filteredNotes = notes.filter((note) => note.tags.includes(activeTag));

  return (
    <div className="notes-container">
      <h1 className="notes-title">Notes tagged with &quot;{tag}&quot;</h1>
      <NoteList notes={filteredNotes} />
    </div>
  );
};

export default FilteredNotesPage;
