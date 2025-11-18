import api from "@/lib/clients/axios";
import { TCharacterResult, TCharacters } from "@/shared/types/character";

export const getCharacters = async (page?: number, name?: string) => {
  try {
    const params = new URLSearchParams();

    if (page) params.set("page", page.toString());
    if (name) params.set("name", name.toString());

    const response = await api.get<TCharacters>(
      `/api/character/?${params.toString()}`
    );
    return response.data;
  } catch (error) {
    return null;
  }
};

export const getCharacterById = async (id: number) => {
  try {
    const response = await api.get<TCharacterResult>(`/api/character/${id}`);
    return response.data;
  } catch (error) {
    return null;
  }
};
