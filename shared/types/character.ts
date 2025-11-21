import { z } from "zod";

const schemaCharacterResult = z.object({
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

const schemaCharacter = z.object({
  info: z.object({
    count: z.number(),
    pages: z.number(),
    next: z.string().nullable(),
    prev: z.string().nullable(),
  }),
  results: z.array(schemaCharacterResult),
});

const schemaAddCharacter = z.object({
  image: z.string(),
  name: z.string(),
  gender: z.string(),
  species: z.string(),
  status: z.string(),
});

export type TCharacterResult = z.infer<typeof schemaCharacterResult>;
export type TCharacters = z.infer<typeof schemaCharacter>;
export type TAddCharacter = z.infer<typeof schemaAddCharacter>;
