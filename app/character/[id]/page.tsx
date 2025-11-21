"use client";

import Character from "@/components/character";
import NotFound from "@/components/notFound";
import { getCharacterById } from "@/lib/apiCharacters";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";

const CharacterID = () => {
  const id = Number(useParams().id);
  console.log(id);

  const { data: character, error } = useQuery({
    queryKey: ["character", id],
    queryFn: () => getCharacterById(id),
    retry: 0,
  });

  if (error || !character) return <NotFound />;

  return <Character character={character} />;
};

export default CharacterID;
