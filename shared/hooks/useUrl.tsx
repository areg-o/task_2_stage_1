"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";

const useUrl = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const updateParams = useCallback(
    (updates: Record<string, string | number | undefined>) => {
      const params = new URLSearchParams(searchParams);

      Object.entries(updates).forEach(([key, value]) => {
        if (
          value === undefined ||
          value === "" ||
          (key === "page" && value == 1)
        ) {
          params.delete(key);
        } else {
          params.set(key, value.toString());
        }
      });
      const query = params.toString();
      router.push(query ? `${pathname}?${query}` : pathname, {
        scroll: false,
      });
    },
    [router, pathname, searchParams]
  );

  const getParam = useCallback(
    (key: string) => searchParams.get(key),
    [searchParams]
  );

  return { updateParams, getParam, router };
};

export default useUrl;
