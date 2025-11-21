import { TAddCharacter } from "@/shared/types/character";

const localStorage = window.localStorage;

const AddCharacter = ({ character }: { character: TAddCharacter }) => {
  localStorage.setItem("firstName", "Areg");

  return;
};

export default AddCharacter;
