"use client";

import { getQueryClient } from "@/lib/clients/tanstack";
import { QueryClientProvider } from "@tanstack/react-query";

export function ProviderTanstack({ children }: { children: React.ReactNode }) {
  const queryClient = getQueryClient();

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}
