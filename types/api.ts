// types/api.ts

// **Зменена**: Імпартуем Note з types/note.ts
import type { Note } from "./note";

export interface FetchNotesResponse {
  notes: Note[];
  total: number;
  page: number;
  perPage: number;
  totalPages: number;
}
