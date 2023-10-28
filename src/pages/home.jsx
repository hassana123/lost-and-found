/* eslint-disable react-hooks/rules-of-hooks */
import Navbar from "../components/Navbar";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import HomeLayout from "../components/HomeLayout";
import mainpic from "../assests/images/Group 304.png";
import mainfeature1 from "../assests/images/Frame 91.png";
import mainfeature2 from "../assests/images/Frame 91 (1).png";
import mainfeature3 from "../assests/images/Frame 91 (2).png";
import icon1 from "../assests/icons/icon1.png";
import icon2 from "../assests/icons/icon2.png";
import icon3 from "../assests/icons/icon3.png";
import icon4 from "../assests/icons/icon4.png";
function home() {
  return (
    <HomeLayout>
      <section className="md:flex w-[80%] mx-auto mt  justify-around p-5 px-8 items-center">
        <div className="text-center md:text-left">
          <h1 className="text-[#2F327D] text-4xl font-bold mt-20 ">
            Lost and Found Hub:
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
            <button className="px-8 py-2 rounded-md shadow-sm bg-[#0A032A]  shadow-slate-400  text-white just">
              Get Started
            </button>
          </div>
        </div>
        <img src={mainpic} className="md:w-[40%]" alt="" />
      </section>
      <section>
        <h1 className="text-[#2F327D] text-2xl mb-5 text-center font-bold mt-20 ">
          Our Main Features
        </h1>
        <div className="grid md:grid-cols-2 justify-center gap-[4rem] w-[80%] mx-auto ">
          <div className="W-[90%]">
            <img src={mainfeature1} className="w-full" alt="" />
            <h4 className="text-center">Report a Lost Item</h4>
            <p className=" w-[80%] mx-auto text-center">
              It's easy! Provide us with the details by filling out a simple
              form, and we'll do our best to help you find it.
            </p>
          </div>
          <div className="W-[90%]">
            <img src={mainfeature2} className="w-full" alt="" />
            <h4 className="text-center">Finding Lost Items</h4>
            <p className=" w-[80%] mx-auto text-center">
              Browse through items that have been found and are waiting to be
              reclaimed – your lost item could be there, waiting for you!"
            </p>
          </div>
        </div>
      </section>
      <section className="grid md:grid-cols-2 gap-[4rem] items-center justify-center w-[80%] mx-auto mt-[9rem]">
        <img src={mainfeature3} alt="" />
        <div>
          <h3 className="font-semibold text-2xl text-center mb-4">
            About Lost and Found Hub
          </h3>
          <p className="text-center">
            Welcome to the heart of our Lost and Found initiative. We're more
            than just a lost item recovery service. We're a dedicated community
            of students on a mission to ensure that even the smallest of items
            find their way back to their rightful owners.
          </p>
        </div>
      </section>
      <section>
        <h1 className="text-[#2F327D] text-2xl text-center font-bold mt-20 mb-10 ">
          Our Values
        </h1>
        <div className="grid grid-cols-4 justify-evenly w-5/6 mx-auto gap-10  items-center text-center">
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
