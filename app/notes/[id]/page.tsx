import { QueryClient, dehydrate } from "@tanstack/react-query";
import NoteDetailsClient from "@/app/notes/[id]/NoteDetails.client";
import { fetchNoteById } from "@/lib/api";
import TanStackProvider from "@/components/TanStackProvider/TanStackProvider";

export default async function NoteDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["note", id],
    queryFn: () => fetchNoteById(id),
  });

  const dehydratedState = dehydrate(queryClient);

  return (
    <TanStackProvider dehydratedState={dehydratedState}>
      <NoteDetailsClient />
    </TanStackProvider>
  );
}
