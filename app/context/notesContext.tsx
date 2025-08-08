"use client";

import { createContext, useContext, useState, ReactNode } from "react";

// 1. Ствараем інтэрфейс для дадзеных нататкі
export interface Note {
  id: string;
  title: string;
  content: string;
  tags: string[];
}

// 2. Ствараем інтэрфейс для стану і функцый NotesContext
interface NotesContextType {
  notes: Note[];
  setNotes: React.Dispatch<React.SetStateAction<Note[]>>;
  uniqueTags: string[];
  activeTag: string | null;
  handleTagFilter: (tag: string | null) => void;
  filteredNotes: Note[];
}

// 3. Ствараем NotesContext з значэннем па змаўчанні
export const NotesContext = createContext<NotesContextType | undefined>(
  undefined
);

// 4. Ствараем кастомны хук для зручнага выкарыстання кантэксту
export function useNotesContext() {
  const context = useContext(NotesContext);
  if (context === undefined) {
    throw new Error("useNotesContext must be used within a NotesProvider");
  }
  return context;
}

// 5. Ствараем NotesProvider кампанент
export const NotesProvider = ({ children }: { children: ReactNode }) => {
  const [notes, setNotes] = useState<Note[]>([]);
  const [activeTag, setActiveTag] = useState<string | null>(null);

  // Ствараем унікальны спіс тэгаў з усіх нататак
  const uniqueTags = Array.from(new Set(notes.flatMap((note) => note.tags)));

  // Фільтруем нататкі на аснове актыўнага тэга
  const filteredNotes = activeTag
    ? notes.filter((note) => note.tags.includes(activeTag))
    : notes;

  // Функцыя для апрацоўкі кліка па тэгу
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
