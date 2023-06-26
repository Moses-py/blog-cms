import Image from "next/image";
import Link from "next/link";
const Navbar = () => {
  return (
    <nav className="p-4 divide-x divide-gray-300">
      <div className="md:container flex justify-between items-center">
        <Image src={"/flair.svg"} alt={"logo"} width={100} height={100} />
        <ul className="hidden sm:flex justify-between items-center gap-6">
          <li>
            <Link href={"/"}>Home</Link>
          </li>
          <li>
            <Link href={"/"}>Popular</Link>
          </li>
          <li>
            <Link href={"/"}>Featured</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
