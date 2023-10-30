import React from "react";
import { NavLink } from "react-router-dom";
//import requireAuth from "../requireAuth";
import HomeLayout from "../components/HomeLayout";

function logout() {
  return (
    <HomeLayout>
      <section className="block md:flex justify-center gap-5 w-[60%] py-10 px-5 shadow-xl mx-auto items-center">
        <div className="text-center md:text-left">
          <h1 className="text-[#2F327D] text-4xl font-bold mt-20">
            You've Been Logged Out
          </h1>
          <p className="my-5">
            Thank you for using our Lost and Found Hub. You have been
            successfully logged out.
          </p>
          <p className="my-5">
            If you need to access your account again, you can{" "}
            <NavLink
              to="/login"
              className="block my-5 text-[#2F327D]  underline"
            >
              log in here.
            </NavLink>
          </p>
        </div>
        {/* <img src={logoutImage} className="md:w-[40%]" alt="Logout" /> */}
      </section>
    </HomeLayout>
  );
}

export default logout;
