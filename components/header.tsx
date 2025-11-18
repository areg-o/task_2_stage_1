import Logo from "@/components/logo";
import Search from "@/components/search";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const Header = () => {
  return (
    <header className="flex flex-row items-center justify-between w-full p-3 border-b">
      <div>
        <Logo />
      </div>
      <div className="flex flex-row items-center">
        <Search />
        <Link href="/users/add">
          <Button className="cursor-pointer">Add</Button>
        </Link>
      </div>
    </header>
  );
};

export default Header;
