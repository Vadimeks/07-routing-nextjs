// types/note.ts
// Адзіны тып Note для ўсяго праекта

export type Tag = "Todo" | "Work" | "Personal" | "Meeting" | "Shopping";

export interface Note {
  id: string;
  title: string;
  content: string;
  // **Зменена**: Цяпер гэта масіў тэгаў, як патрабуецца для фільтрацыі
  tags: Tag[];
  createdAt: string;
  updatedAt: string;
}
