import { QueryClient, dehydrate } from "@tanstack/react-query";
import NoteDetailsClient from "@/app/notes/[id]/NoteDetails.client";
import TanStackProvider from "@/components/TanStackProvider/TanStackProvider";
import ModalContainer from "./modal";
import { fetchNoteById } from "@/lib/api";

export default async function InterceptedNoteDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const resolvedParams = await params; // Апрацоўваем асінхронны params
  const { id } = resolvedParams;

  const queryClient = new QueryClient();

  const note = await queryClient.fetchQuery({
    queryKey: ["note", id],
    queryFn: () => fetchNoteById(id),
  });

  const dehydratedState = dehydrate(queryClient);

  if (!note) {
    return (
      <ModalContainer>
        <p>Note not found.</p>
      </ModalContainer>
    );
  }

  return (
    <ModalContainer>
      <TanStackProvider dehydratedState={dehydratedState}>
        <NoteDetailsClient />
      </TanStackProvider>
    </ModalContainer>
  );
}
