import { TCharacterResult } from "@/shared/types/character";
import { JSX } from "react";

export interface ICharacterTable {
  characters: TCharacterResult[] | [];
  page: number | undefined;
  paginationLinks: JSX.Element[];
  pagesCount: number | undefined;
  nextPage: () => void;
  prevPage: () => void;
  goPage: (p: number) => void;
}
