"use server";

import { CharactersTable } from "@/components/charactersTable";
import NotFound from "@/components/not-found";
import { getCharacters } from "@/lib/apiCharacters";
import { getQueryClient } from "@/lib/clients/tanstack";
import { HydrationBoundary, dehydrate } from "@tanstack/react-query";

interface Props {
  searchParams: { [key: string]: string | string[] | undefined };
}

export default async function Home({ searchParams }: Props) {
  const params = await searchParams;

  const page = params.page;
  const nameParam = params.nameParam;

  const name = Array.isArray(nameParam) ? nameParam[0] : nameParam;

  const data = await getCharacters(Number(page), name);

  if (!data || !data.results?.length) return <NotFound />;

  const queryClient = getQueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["characters", Number(page) || 1, name],
    queryFn: () => getCharacters(Number(page) || 1, name),
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
