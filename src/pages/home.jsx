/* eslint-disable react-hooks/rules-of-hooks */
import { Link } from "react-router-dom";
import HomeLayout from "../components/HomeLayout";
import mainpic from "../assests/images/Group 304.png";
import mainfeature1 from "../assests/images/Frame 91.png";
import mainfeature2 from "../assests/images/Frame 91 (1).png";
import icon1 from "../assests/icons/icon1.png";
import icon2 from "../assests/icons/icon2.png";
import icon3 from "../assests/icons/icon3.png";
import icon4 from "../assests/icons/icon4.png";

function home() {
  return (
    <HomeLayout>
      <section className="block md:flex justify-center gap-5 w-[90%] mx-auto items-center">
        <div className="text-center md:text-left">
          <h1 className="text-[#2F327D] text-4xl font-bold mt-20 ">
            RECLAIM HUB:
          </h1>
          <p className="my-5 ">
            Your One-Stop Solution for Reuniting with Lost Items
          </p>
          <p className="my-5 ">
            Did you misplace something on campus? You're in the right place! Our
            Lost and Found platform is dedicated to reuniting you with your
            belongings.
          </p>
          <div className="flex items-center gap-4 justify-center md:justify-normal">
            <Link to="/register">
              <button className="px-8 py-2 rounded-md shadow-sm bg-[#0A032A]  shadow-slate-400  text-white just">
                Get Started
              </button>
            </Link>
          </div>
        </div>
        <img src={mainpic} className="md:w-[40%] my-[55px]" alt="" />
      </section>
      <section>
        <h1 className="text-[#2F327D] text-2xl mb-5 text-center font-bold mt-20 ">
          Our Main Features
        </h1>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 justify-center gap-5 w-[90%] mx-auto ">
          <div className="W-[90%]">
            <img src={mainfeature1} className="w-full" alt="" />
            <h1 className="text-center text-lg font-bold">
              Report a Lost Item
            </h1>
            <p className=" w-[80%] mx-auto text-center">
              It's easy! Provide us with the details by filling out a simple
              form, and we'll do our best to help you find it.
            </p>
          </div>
          <div className="W-[90%]">
            <img src={mainfeature2} className="w-full" alt="" />
            <h1 className="text-center text-lg font-bold">
              Finding Lost Items
            </h1>

            <p className=" w-[80%] mx-auto text-center">
              Browse through items that have been found and are waiting to be
              reclaimed – your lost item could be there, waiting for you!"
            </p>
          </div>
        </div>
      </section>
      {/* about  */}

      <section>
        <h1 className="text-[#2F327D] text-2xl text-center font-bold mt-20 mb-10 ">
          Our Values
        </h1>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 justify-evenly w-[90%] mx-auto gap-5  items-center text-center">
          <div className="grid items-center">
            <img src={icon1} className="mx-auto" alt="" />
            <h3 className="font-bold my-1">Community</h3>
            <p>
              Community We thrive on the spirit of unity within our campus
              community.
            </p>
          </div>
          <div className="grid items-center">
            <img src={icon2} className="mx-auto" alt="" />
            <h3 className="font-bold my-1">Empathy</h3>
            <p>
              We understand the frustration of losing something, and we're here
              to provide support.
            </p>
          </div>
          <div className="grid items-center">
            <img src={icon3} className="mx-auto" alt="" />
            <h3 className="font-bold my-1">Efficiency</h3>
            <p>
              We're committed to streamlining the process of reporting and
              recovering lost items.
            </p>
          </div>
          <div className="grid items-center">
            <img src={icon4} className="mx-auto" alt="" />
            <h3 className="font-bold my-1">Trust</h3>
            <p> We build trust through transparency and dedication.</p>
          </div>
        </div>
      </section>
    </HomeLayout>
  );
}
export default home;
