import mainfeature3 from "../assests/images/Frame 91 (2).png";
import icon1 from "../assests/icons/icon1.png";
import icon2 from "../assests/icons/icon2.png";
import icon3 from "../assests/icons/icon3.png";
import icon4 from "../assests/icons/icon4.png";

const about = () => {
  return (
    <div>
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
        <div className="grid grid-cols-2 md:grid-cols-4 justify-evenly w-5/6 mx-auto gap-10  items-center text-center">
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
    </div>
  );
};

export default about;
