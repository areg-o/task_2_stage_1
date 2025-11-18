const Main = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="flex items-center justify-center">
      <div className="w-[95%]">{children}</div>
    </main>
  );
};

export default Main;
