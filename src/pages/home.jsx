/* eslint-disable react-hooks/rules-of-hooks */
import { signOut } from "firebase/auth";

import { database } from "../firebase";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
// import { ReactSortable } from "react-sortablejs";
function home() {
  const [state, setState] = useState([
    {
      id: 1,
      url: "https://images.unsplash.com/photo-1488161628813-04466f872be2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fHBlb3BsZXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=600&q=60",
      tag: "people",
    },
    {
      id: 2,
      url: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8cGVvcGxlfGVufDB8fDB8fHww&auto=format&fit=crop&w=600&q=60",
      tag: "people",
    },
    {
      id: 3,
      url: "https://images.unsplash.com/photo-1513682121497-80211f36a7d3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8cGVvcGxlfGVufDB8fDB8fHww&auto=format&fit=crop&w=600&q=60",
      tag: "people",
    },
    {
      id: 4,
      url: "https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8cGVvcGxlfGVufDB8fDB8fHww&auto=format&fit=crop&w=600&q=60",
      tag: "people",
    },
    {
      id: 5,
      url: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTd8fHBlb3BsZXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=600&q=60",
      tag: "people",
    },
    {
      id: 6,
      url: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fHBlb3BsZXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=600&q=60",
      tag: "people",
    },
  ]);

  const history = useNavigate();

  const handleClick = () => {
    signOut(database).then((val) => {
      console.log(val, "val");
      history("/");
    });
  };
  return (
    <div>
      <div className="bg-gray-100 font-sans w-full  m-0">
        <div className="bg-white shadow">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between py-4">
              <div className=" sm:flex sm:items-center">
                <Link
                  to="/home"
                  className="text-gray-800 text-sm font-semibold hover:text-purple-600 mr-4"
                >
                  Home
                </Link>
              </div>

              <div className=" sm:flex sm:items-center">
                <Link
                  onClick={handleClick}
                  className="text-gray-800 text-sm font-semibold border px-4 py-2 rounded-lg hover:text-purple-600 hover:border-purple-600"
                >
                  sign out
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      <h1>home</h1>
    </div>
  );
}
export default home;
