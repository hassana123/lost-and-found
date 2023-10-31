import { Link } from "react-router-dom";
import { FaBars } from "react-icons/fa";
import { useState } from "react";

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState();
  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };
  return (
    <div className="bg-gray-100 font-sans w-full  m-0">
      <div className="bg-white shadow">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between py-4">
            <div className=" sm:flex sm:items-center">
              <Link
                to="/"
                className="text-gray-800 text-sm font-semibold hover:text-purple-600 mr-4"
              >
                Logo
              </Link>
              {/*mobile nav*/}
            </div>
            <div
              className={`${
                mobileMenuOpen
                  ? "left-[5%] md:left-0 transition-transform duration-3000 ease-in"
                  : "left-[-80%] md:left-0 transition-transform duration-3000 ease-in"
              } md:hidden block absolute top-[10%] shadow-xl rounded-xl py-10 px-8 w-[70%] bg-[#2F327D]`}
            >
              <Link
                to="/"
                className=" block my-5 text-white text-sm font-semibold hover:text-purple-600 mr-4"
              >
                Home
              </Link>
              <Link
                to="/about"
                className=" block block my-5 text-white text-sm font-semibold hover:text-purple-600 mr-4"
              >
                About
              </Link>
              <Link
                to="#"
                className="text-white block my-5 text-sm font-semibold hover:text-purple-600 mr-4"
              >
                Testimonial
              </Link>
              <Link
                to="#"
                className="text-white block my-5 text-sm font-semibold hover:text-purple-600 mr-4"
              >
                Contact
              </Link>
              <Link
                to="/register"
                className="text-white block my-5 text-sm font-semibold hover:text-purple-600 mr-4"
              >
                Sign up
              </Link>
              <Link
                to="/login"
                className="text-white block my-5 text-sm font-semibold border px-4 py-2 rounded-lg hover:text-purple-600 hover:border-purple-600"
              >
                Login
              </Link>
            </div>
            {/*Navigation*/}
            <div className="hidden md:block">
              <Link
                to="/"
                className="text-gray-800 text-sm font-semibold hover:text-purple-600 mr-4"
              >
                Home
              </Link>
              <Link
                to="/about"
                className="text-gray-800 text-sm font-semibold hover:text-purple-600 mr-4"
              >
                About
              </Link>
              <Link
                to="#"
                className="text-gray-800 text-sm font-semibold hover:text-purple-600 mr-4"
              >
                Testimonial
              </Link>
              <Link
                to="#"
                className="text-gray-800 text-sm font-semibold hover:text-purple-600 mr-4"
              >
                Contact
              </Link>
              <Link
                to="/register"
                className="text-gray-800 text-sm font-semibold hover:text-purple-600 mr-4"
              >
                Sign up
              </Link>
              <Link
                to="/login"
                className="text-gray-800 text-sm font-semibold border px-4 py-2 rounded-lg hover:text-purple-600 hover:border-purple-600"
              >
                Login
              </Link>
            </div>
            <FaBars
              color="#0a032a"
              size={25}
              onClick={toggleMobileMenu}
              className="block sm:hidden hover:scale-105 cursor-pointer"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
