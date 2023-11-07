import { FaFacebook, FaInstagram, FaTwitter, FaLinkedin } from "react-icons/fa";
import { HiLocationMarker } from "react-icons/hi";

const Footer = () => {
  return (
    <>
      <div className="bg-[#060218] text-white py-5  mt-12">
        <div className="block w-[90%]  mx-auto md:flex justify-between mb-4">
          <div>
            <h2 className="font-bold mb-10">ReclaimHub</h2>
            <ul className="grid gap-4">
              <li>About us</li>
              <li>Investors</li>
              <li>Testimonial</li>
              <li>Contact</li>
            </ul>
          </div>
          <div>
            <h2 className="font-bold mb-10 mt-5">
              Subscribe to our email newsletter
            </h2>
            <div className="block md:flex items-center gap-3">
              <input
                type="text"
                className=" bg-transparent border-2 px-4 py-2 border-solid my-5 border-white rounded-md"
                placeholder="Your Email"
              />
              <button className="bg-white text-black p-3 rounded-md">
                Subscribe
              </button>
            </div>
          </div>
        </div>
        <div className="md:flex justify-around items-center mt-10 gap-8">
          <div className="flex justify-center gap-10 mb-4">
            <FaFacebook />
            <FaTwitter />
            <FaLinkedin />
            <FaInstagram />
          </div>
          <div className="flex gap-1 justify-center items-center mb-4">
            <HiLocationMarker />
            <p>Bayero University Kano, Kano State</p>
          </div>
        </div>
      </div>
      <hr />
    </>
  );
};

export default Footer;
