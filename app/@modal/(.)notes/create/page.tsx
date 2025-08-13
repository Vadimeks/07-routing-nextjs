// app/notes/@modal/(..)notes/create/page.tsx

"use client";

import { useRouter } from "next/navigation";
import Modal from "@/components/Modal/Modal";
import NoteForm from "@/components/NoteForm/NoteForm";

export default function InterceptedCreateNotePage() {
  const router = useRouter();

  const handleClose = () => {
    router.back();
  };

  return (
    <Modal isOpen={true} onClose={handleClose}>
      <NoteForm onClose={handleClose} />
    </Modal>
  );
}
