"use client";

import { createContext, useContext, useState, ReactNode } from "react";

export interface Note {
  id: string;
  title: string;
  content: string;
  tags: string[];
}

interface NotesContextType {
  notes: Note[];
  setNotes: React.Dispatch<React.SetStateAction<Note[]>>;
  uniqueTags: string[];
  activeTag: string | null;
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

  const uniqueTags = Array.from(new Set(notes.flatMap((note) => note.tags)));

  const filteredNotes = activeTag
    ? notes.filter((note) => note.tags.includes(activeTag))
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
