"use client";

import notFound from "@/app/not-found";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { baseURL } from "@/lib/clients/axios";
import { useEffect, useRef, useState } from "react";

const getLastId = async () => {
  const res = await fetch(`${baseURL}/api/character/?page=1`);
  const data = await res.json();
  return data.info.count;
};

export default function Add() {
  const [id, setId] = useState("");

  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    async function getLastIdF() {
      const id = await getLastId();
      if (!id) return notFound();
      else setId(id + 1);
    }
    getLastIdF();
  }, []);

  const handleClick = () => {
    if (!formRef.current) return;

    const formData = new FormData(formRef.current);
    const character = {
      id: id?.toString(),
      ...Object.fromEntries(formData.entries()),
    };

    window.localStorage.setItem(
      `character[${character.id}]`,
      JSON.stringify(character)
    );
  };

  return (
    <>
      <Card className="w-[40%] mx-auto my-5">
        <CardHeader>
          <CardTitle>Create new character</CardTitle>
        </CardHeader>
        <CardContent>
          <form ref={formRef}>
            <Input name="name" placeholder="Name:" className="mb-2" />
            <Input name="gender" placeholder="Gender:" className="mb-2" />
            <Input name="species" placeholder="Species:" className="mb-2" />
            <Input name="status" placeholder="Status:" className="mb-2" />
          </form>
        </CardContent>
        <CardFooter>
          <Button className="w-full cursor-pointer" onClick={handleClick}>
            Add
          </Button>
        </CardFooter>
      </Card>
    </>
  );
}
