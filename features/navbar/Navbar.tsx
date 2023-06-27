import Link from "next/link";
const Navbar = () => {
  return (
    <nav className="p-4 divide-x divide-gray-300">
      <div className="md:container flex justify-between items-center">
        <div className="">
          <h1 className="divide-x font-sans font-bold text-[#001858] text-3xl inline">
            flai-r
          </h1>
          <span>.</span>
          <span className="text-primary font-bold text-sm">Blog</span>
        </div>
        <ul className="hidden sm:flex justify-between items-center gap-6 text-xs font-semibold text-gray-600">
          <li>
            <Link href={"/"}>Home</Link>
          </li>
          <li>
            <Link href={"/"}>Categories</Link>
          </li>
          <li>
            <Link href={"/"}>About us</Link>
          </li>
          <li>
            <Link href={"/"}>
              <button className="bg-[#6246EA] px-[17px] py-[10px] flex gap-[10px] text-white rounded-md">
                Buy me a coffee
              </button>
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
