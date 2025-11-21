"use client";

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { getCharacters } from "@/lib/apiCharacters";
import useUrl from "@/shared/hooks/useUrl";
import { useSuspenseQuery } from "@tanstack/react-query";
import Image from "next/image";
import { notFound } from "next/navigation";
import { JSX, useMemo } from "react";

export function CharactersTable() {
  const { updateParams, getParam, router } = useUrl();

  const page = Number(getParam("page") || 1);
  const name = getParam("name") || "";

  const { data, error } = useSuspenseQuery({
    queryKey: ["characters", page, name],
    queryFn: () => getCharacters(page, name),
    retry: 0,
  });

  if (error) notFound();

  const charactersAPI = data?.results || [];
  const pagesCount = data?.info.pages || 1;

  const localCharactersJSON =
    page === pagesCount ? window.localStorage.getItem("characters") : undefined;

  const characters = localCharactersJSON
    ? charactersAPI.concat(JSON.parse(localCharactersJSON))
    : charactersAPI;

  const paginationLinks = useMemo(() => {
    const links: JSX.Element[] = [];

    for (let index = page - 2; index <= pagesCount; index++) {
      if (index > 0 && pagesCount > 1) {
        links.push(
          <PaginationLink
            key={index}
            isActive={index === page}
            href="#"
            onClick={(e) => {
              e.preventDefault();
              updateParams({ page: index });
            }}
          >
            {index}
          </PaginationLink>
        );
      }
      if (index == page + 2) break;
    }

    return links;
  }, [page, pagesCount]);

  const handleCharacterCard = (charID: number) => {
    router.push(`/character/${charID}`);
  };

  return (
    <>
      <Table className="table-fixed">
        {characters.length !== 0 && <TableCaption>Character list</TableCaption>}
        <TableHeader>
          <TableRow>
            <TableHead className="w-16">ID</TableHead>
            <TableHead className="w-16">Image</TableHead>
            <TableHead className="w-70">Name</TableHead>
            <TableHead className="w-40">Species</TableHead>
            <TableHead className="w-40">Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {characters.length === 0 ? (
            <TableRow>
              <TableCell colSpan={5} className="text-center text-[1.4vw]">
                Sorry, but character{" "}
                <span className="text-blue-600 font-bold">{name}</span> not
                found.
              </TableCell>
            </TableRow>
          ) : (
            characters.map((char) => (
              <TableRow
                key={char.id}
                onClick={() => handleCharacterCard(char.id)}
              >
                <TableCell>{char.id}</TableCell>
                <TableCell>
                  <Image
                    src={char.image || "/avatar.png"}
                    alt={char.name}
                    width={40}
                    height={40}
                    className="rounded-full"
                  />
                </TableCell>
                <TableCell>{char.name}</TableCell>
                <TableCell>{char.species}</TableCell>
                <TableCell>{char.status}</TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>

      <Pagination>
        <PaginationContent>
          <PaginationItem>
            {page != 1 && (
              <PaginationPrevious
                onClick={(e) => {
                  e.preventDefault();
                  updateParams({ page: page - 1 });
                }}
                href="#"
              />
            )}
          </PaginationItem>

          {paginationLinks.map((link) => (
            <PaginationItem key={link.key}>{link}</PaginationItem>
          ))}

          {pagesCount > 1 && (
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
          )}
          <PaginationItem>
            {page != pagesCount && (
              <PaginationNext
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  updateParams({ page: page + 1 });
                }}
              />
            )}
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </>
  );
}
