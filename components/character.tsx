import { TCharacterResult } from "@/shared/types/character";
import Image from "next/image";

interface Props {
  character: TCharacterResult;
}

const Character = ({ character }: Props) => {
  return (
    <div className="flex flex-row my-6">
      <div className="w-[10vw] flex-col p-3 bg-[#e0e0e077]">
        <Image
          className="mb-1"
          src={character.image}
          alt="Image"
          width={100}
          height={100}
          priority
        />
        <div>{character.name}</div>
      </div>
      <div className="bg-[#e0e0e077] w-full ml-6 box-border p-6">
        <div>
          <b>ID</b>: {character.id}
        </div>
        <div>
          <b>Status:</b> {character.status}
        </div>
        <div>
          <b>Species:</b> {character.species}
        </div>
        <div>
          <b>Created:</b> {character.created}
        </div>
        <div>
          <b>Gender:</b> {character.gender}
        </div>
      </div>
    </div>
  );
};

export default Character;
