import React from "react";
import HomeLayout from "../components/HomeLayout";

const UserGuide = () => {
  return (
    <HomeLayout>
      <div className="container mx-auto p-5">
        <h1 className="text-3xl font-bold text-[#2F327D] my-4">
          User Guide for Reclaim Hub - Lost and Found Website
        </h1>

        {/* Landing Page */}
        <section className="my-6">
          <h2 className="text-xl font-semibold">1. Landing Page</h2>
          <p>
            When you visit{" "}
            <a
              href="https://lost-and-found-git-main-hassana123.vercel.app/"
              className="text-primary hover:underline"
            >
              Reclaim Hub
            </a>
            , you'll arrive at the landing page. The landing page provides some
            introductory information about the site and offers navigation links
            to "Sign Up" or "Log In."
          </p>
        </section>

        {/* Sign Up as a New User */}
        <section className="my-6">
          <h2 className="text-xl font-semibold">2. Sign Up as a New User</h2>
          <p>
            If you're a new user, click on "Sign Up" or "Get Started" to create
            an account. After signing up, you'll be directed to the Log In page.
            Remember your email and password for future logins.
          </p>
        </section>

        {/* Log In */}
        <section className="my-6">
          <h2 className="text-xl font-semibold">3. Log In</h2>
          <p>
            To access your account, input your registered email and password on
            the Log In page.
          </p>
        </section>

        {/* Dashboard */}
        <section className="my-6">
          <h2 className="text-xl font-semibold">4. Dashboard</h2>
          <p>The dashboard is the central hub for users. Here you can:</p>
          <ul className="list-disc pl-6">
            <li>View misplaced items in general.</li>
            <li>Report lost items.</li>
            <li>View items reported by you.</li>
            <li>View items that have been claimed in general.</li>
            <li>Update your profile.</li>
            <li>Log out from your account.</li>
          </ul>
        </section>

        {/* View Misplaced or Lost Items */}
        <section className="my-6">
          <h2 className="text-xl font-semibold">
            5. View Misplaced or Lost Items
          </h2>
          <p>
            This page displays a collection of items reported by users. Click on
            any item to view more details. You can also "Claim Item," which
            redirects you to the WhatsApp DM of the person who found the item.
            The item's status changes to "Pending."
          </p>
        </section>

        {/* Report Lost Item */}
        <section className="my-6">
          <h2 className="text-xl font-semibold">6. Report Lost Item</h2>
          <p>
            Report lost items by providing necessary details and uploading an
            image. Reported items appear at the top of the "View Lost Items"
            page. They are also added to your "Reported Items" page.
          </p>
        </section>

        {/* Reported Items Page */}
        <section className="my-6">
          <h2 className="text-xl font-semibold">7. Reported Items Page</h2>
          <p>Your reported items are categorized into:</p>
          <ul className="list-disc pl-6">
            <li>Pending (items that others are trying to claim).</li>
            <li>Claimed (items you uploaded that have been claimed).</li>
            <li>Unclaimed (items you uploaded with no claim attempts).</li>
          </ul>
        </section>

        {/* View Claimed Items in General */}
        <section className="my-6">
          <h2 className="text-xl font-semibold">
            8. View Claimed Items in General
          </h2>
          <p>This page displays all items that have been claimed by users.</p>
        </section>

        {/* Update Profile */}
        <section className="my-6">
          <h2 className="text-xl font-semibold">9. Update Profile</h2>
          <p>You can edit your profile, including:</p>
          <ul className="list-disc pl-6">
            <li>Adding, removing, or changing your profile image.</li>
            <li>Changing your name, username, and phone number.</li>
          </ul>
        </section>

        {/* Log Out */}
        <section className="my-6">
          <h2 className="text-xl font-semibold">10. Log Out</h2>
          <p>
            The log out page allows you to sign out from your dashboard. You'll
            need to log in again to access the site's features.
          </p>
        </section>
      </div>
    </HomeLayout>
  );
};

export default UserGuide;
