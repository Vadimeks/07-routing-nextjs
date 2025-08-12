// app/notes/layout.tsx
import React from "react";

export default function NotesLayout({
  children,
  modal,
}: {
  children: React.ReactNode;
  modal: React.ReactNode;
}) {
  return (
    <div>
      {children}
      <div id="modal-root" /> {/* <-- Вось ён, фінальны элемент! */}
      {modal}
    </div>
  );
}
