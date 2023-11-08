import { NavLink } from "react-router-dom";
import { FaBars } from "react-icons/fa";
import { useState } from "react";

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <div className="bg-gray-100 font-sans w-full  m-0">
      <div className="bg-white shadow">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between py-4">
            <div className=" sm:flex sm:items-center">
              <NavLink
                exact
                to="/"
                className="text-primary font-bold text-sm hover:text-purple-600 mr-4"
              >
                ReclaimHub
              </NavLink>
            </div>
            {/* mobile nav */}
            <div
              className={`${
                mobileMenuOpen
                  ? "left-[5%] md:left-0 transition-transform duration-3000 ease-in"
                  : "left-[-80%] md:left-0 transition-transform duration-3000 ease-in"
              } md:hidden block absolute top-[10%] shadow-xl rounded-xl py-10 px-8 w-[70%] bg-[#2F327D]`}
            >
              <NavLink
                exact
                to="/"
                className={({ isActive }) =>
                  isActive
                    ? " block my-5 text-purple-600 text-lg font-bold hover:text-purple-600 mr-4"
                    : " block my-5 text-white text-sm font-semibold hover:text-purple-600 mr-4"
                }
              >
                Home
              </NavLink>
              <NavLink
                to="/about"
                className={({ isActive }) =>
                  isActive
                    ? " block my-5 text-purple-600 text-lg font-bold hover:text-purple-600 mr-4"
                    : " block my-5 text-white text-sm font-semibold hover:text-purple-600 mr-4"
                }
              >
                About
              </NavLink>
              <NavLink
                to="/guide"
                className={({ isActive }) =>
                  isActive
                    ? " block my-5 text-purple-600 text-lg font-bold hover:text-purple-600 mr-4"
                    : " block my-5 text-white text-sm font-semibold hover:text-purple-600 mr-4"
                }
              >
                User Guide
              </NavLink>
              {/*
              <NavLink
                to="#"
                className="text-white block my-5 text-sm font-semibold hover:text-purple-600 mr-4"
              >
                Contact
              </NavLink>
              */}
              <NavLink
                to="/register"
                className={({ isActive }) =>
                  isActive
                    ? " block my-5 text-purple-600 text-lg font-bold hover:text-purple-600 mr-4"
                    : " block my-5 text-white text-sm font-semibold hover:text-purple-600 mr-4"
                }
              >
                Sign up
              </NavLink>
              <NavLink
                to="/login"
                className={({ isActive }) =>
                  isActive
                    ? "text-purple-600 block my-5 text-lg font-bold border border-purple-600 px-4 py-2 rounded-lg hover:text-purple-600 hover:border-purple-600"
                    : "text-white block my-5 text-sm font-semibold border px-4 py-2 rounded-lg hover:text-purple-600 hover:border-purple-600"
                }
              >
                Login
              </NavLink>
            </div>
            {/*desktop nav*/}
            <div className="hidden md:block">
              <NavLink
                exact
                to="/"
                className={({ isActive }) =>
                  isActive
                    ? "text-primary mr-4 font-bold"
                    : "text-gray-800 text-sm font-semibold hover:text-purple-600 mr-4"
                }
              >
                Home
              </NavLink>
              <NavLink
                to="/about"
                className={({ isActive }) =>
                  isActive
                    ? "text-primary mr-4 font-bold"
                    : "text-gray-800 text-sm font-semibold hover:text-purple-600 mr-4"
                }
              >
                About
              </NavLink>
              <NavLink
                to="/guide"
                className={({ isActive }) =>
                  isActive
                    ? "text-primary mr-4 font-bold"
                    : "text-gray-800 text-sm font-semibold hover:text-purple-600 mr-4"
                }
              >
                User Guide
              </NavLink>
              {/*
              <NavLink
                to="#"
                className="text-gray-800 text-sm font-semibold hover:text-purple-600 mr-4"
              >
                Contact
              </NavLink>
              */}

              <NavLink
                to="/register"
                className={({ isActive }) =>
                  isActive
                    ? "text-primary mr-4 font-bold"
                    : "text-gray-800 text-sm font-semibold hover:text-purple-600 mr-4"
                }
              >
                Sign up
              </NavLink>
              <NavLink
                to="/login"
                className={({ isActive }) =>
                  isActive
                    ? "text-primary text-sm font-bold border border-primary px-4 py-2 rounded-lg hover:text-purple-600 hover:border-purple-600"
                    : "text-gray-800 text-sm font-semibold border px-4 py-2 rounded-lg hover:text-purple-600 hover:border-purple-600"
                }
              >
                Login
              </NavLink>
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
