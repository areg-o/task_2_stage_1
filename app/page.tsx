"use server";

import { CharactersTable } from "@/components/charactersTable";
import NotFound from "@/components/notFound";
import { getCharacters } from "@/lib/apiCharacters";
import { getQueryClient } from "@/lib/clients/tanstack";
import { ISearchParams } from "@/shared/types/searchParams";
import { HydrationBoundary, dehydrate } from "@tanstack/react-query";

export default async function Home({ searchParams }: ISearchParams) {
  const params = await searchParams;
  const page = params.page ? Number(params.page) : 1;
  const name = Array.isArray(params.name) ? params.name[0] : params.name || "";

  const data = await getCharacters(page, name);

  if (!data || !data.results?.length) return <NotFound />;

  const queryClient = getQueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["characters", page, name],
    queryFn: () => getCharacters(page, name),
    retry: 0,
  });

  return (
    <div>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <CharactersTable />
      </HydrationBoundary>
    </div>
  );
}
