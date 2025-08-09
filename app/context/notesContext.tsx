"use client";

import { createContext, useContext, useState, ReactNode } from "react";
import { Note, Tag } from "@/types/note";

interface NotesContextType {
  notes: Note[];
  setNotes: React.Dispatch<React.SetStateAction<Note[]>>;
  uniqueTags: Tag[];
  // **Зменена**: activeTag можа быць любым радком (string) або null
  activeTag: string | null;
  // **Зменена**: функцыя handleTagFilter цяпер прымае string | null
  handleTagFilter: (tag: string | null) => void;
  filteredNotes: Note[];
}

export const NotesContext = createContext<NotesContextType | undefined>(
  undefined
);

export function useNotesContext() {
  const context = useContext(NotesContext);
  if (context === undefined) {
    throw new Error("useNotesContext must be used within a NotesProvider");
  }
  return context;
}

export const NotesProvider = ({ children }: { children: ReactNode }) => {
  const [notes, setNotes] = useState<Note[]>([]);
  const [activeTag, setActiveTag] = useState<string | null>(null);

  // Каб пазбегнуць памылкі тыпу, пераўтвараем унікальныя тэгі ў адпаведны тып Tag[]
  const uniqueTags: Tag[] = Array.from(
    new Set(notes.flatMap((note) => note.tags))
  );

  const filteredNotes = activeTag
    ? notes.filter((note) => note.tags.includes(activeTag as Tag))
    : notes;

  const handleTagFilter = (tag: string | null) => {
    setActiveTag(tag);
  };

  const value = {
    notes,
    setNotes,
    uniqueTags,
    activeTag,
    handleTagFilter,
    filteredNotes,
  };

  return (
    <NotesContext.Provider value={value}>{children}</NotesContext.Provider>
  );
};
