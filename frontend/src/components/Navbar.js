import { Link } from "react-router-dom";
import { IoBookSharp } from "react-icons/io5";
const Navbar = () => {
  return (
    <nav className="bg-blue-500 p-4 text-white sticky top-0">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center gap-2">
          <IoBookSharp className="text-5xl items-center text-orange-500 p-1 " />
          <h1 className="text-2xl font-bold text-orange-500 p-1">
            Student Management System
          </h1>
        </div>
        <div>
          <Link to="/" className="mx-2 text-lg">
            Home
          </Link>
          <Link to="/add" className=" text-white-500 px-3 py-1 text-lg">
            Add Student
          </Link>
          <Link to="/faculty" className="text-white-500 px-3 py-1 text-lg">
            Faculty Members
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
