"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import useUrl from "@/shared/hooks/useUrl";
import Link from "next/link";
import { ChangeEvent } from "react";

const Search = () => {
  const { updateParams, getParam } = useUrl();
  const name = getParam("name");

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    updateParams({ name: event.target.value, page: 1 });
  };

  return (
    <div className="flex w-screen max-w-sm items-center gap-2 mr-[1vw]">
      {!!name && (
        <div className="my-3 w-full">
          <Link href="/" className="text-blue-600">
            &larr; Home Page
          </Link>
        </div>
      )}
      <Input
        onChange={handleChange}
        type="search"
        placeholder="Character name"
      />
      <Button
        onClick={(e) => {
          e.preventDefault();
          updateParams({ page: 1 });
        }}
        type="submit"
        aria-label="Search"
        className="cursor-pointer"
        variant="outline"
      >
        Search
      </Button>
    </div>
  );
};

export default Search;
