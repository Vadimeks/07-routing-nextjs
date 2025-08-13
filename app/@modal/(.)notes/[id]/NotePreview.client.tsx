// components/NotePreview/NotePreview.tsx
import { Note } from "@/types/note";
import css from "./NotePreview.module.css";
import { format } from "date-fns";

interface NotePreviewProps {
  note: Note;
}

export default function NotePreview({ note }: NotePreviewProps) {
  const formattedDate = format(new Date(note.createdAt), "dd MMM yyyy, HH:mm");

  return (
    <div className={css.container}>
      <div className={css.item}>
        <div className={css.header}>
          <h2>{note.title}</h2>
          <span className={css.tag}>{note.tag}</span>
        </div>
        <p className={css.content}>{note.content}</p>
        <span className={css.date}>{formattedDate}</span>
      </div>
    </div>
  );
}
