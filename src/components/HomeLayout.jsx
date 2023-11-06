import React from 'react';
import Navbar from './Navbar';
import Footer from "./Footer";
const HomeLayout = ({ children }) => {
  return (
    <div>
      <Navbar />
      <>
        {/* Children element in the middle */}
        {children}
      </>
      <Footer />
    </div>
  );
};

export default HomeLayout;
