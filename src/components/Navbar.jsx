import { Link } from "react-router-dom";

const Navbar = () => {
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
            </div>

            <div className=" sm:flex sm:items-center">
              <Link
                to="/"
                className="text-gray-800 text-sm font-semibold hover:text-purple-600 mr-4"
              >
                Home
              </Link>
              <Link
                to="#"
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
