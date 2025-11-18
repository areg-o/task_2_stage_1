import { z } from "zod";

export const schemaCharacterResult = z.object({
  id: z.number(),
  name: z.string(),
  status: z.string(),
  species: z.string(),
  type: z.string(),
  gender: z.string(),
  image: z.string(),
  origin: z.object({
    name: z.string(),
    url: z.string().nullable(),
  }),
  location: z.object({
    name: z.string(),
    url: z.string().nullable(),
  }),
  url: z.string(),
  created: z.string(),
});

export const schemaCharacter = z.object({
  info: z.object({
    count: z.number(),
    pages: z.number(),
    next: z.string().nullable(),
    prev: z.string().nullable(),
  }),
  results: z.array(schemaCharacterResult),
});

export type TCharacterResult = z.infer<typeof schemaCharacterResult>;
export type TCharacters = z.infer<typeof schemaCharacter>;
