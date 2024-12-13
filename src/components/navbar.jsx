import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav class="sticky top-0 flex flex-col bg-gray-950 items-center py-4 md:flex-row md:h-auto md:gap-4 md:pl-10">
      <div class="flex items-center md:justify-center md:flex-none">
        <Link to="/">
          <img
            src="/Icon.jpg"
            alt="Logo"
            class="h-16 w-16 mr-4 rounded-full md:h-12 md:w-12"
          />
        </Link>
        <h1 class="text-white text-xl md:text-center">Learn With JKP</h1>
      </div>

      <div class="flex flex-col flex-1 items-center justify-end gap-3 md:mr-10 md:w-full md:flex-wrap md:gap-20 md:flex-row">
        <Link to="/" className="text-white hover:underline">
          <h3>Home</h3>
        </Link>
        <Link to="/learn" className="text-white hover:underline">
          <h3>Learn</h3>
        </Link>
        <Link to="/account" className="text-white hover:underline">
          <h3>Account</h3>
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;
