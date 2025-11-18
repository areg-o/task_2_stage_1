import { ProviderTanstack } from "@/providers/tanstack";

export const Providers = ({ children }: { children: React.ReactNode }) => {
  return <ProviderTanstack>{children}</ProviderTanstack>;
};
