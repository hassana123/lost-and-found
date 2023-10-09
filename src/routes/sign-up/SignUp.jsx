import React from "react";
import vector from "../../assets/vector.svg";
import "./style.css";
const SignUp = () => {
  return (
    <>
      {/* <section className="create-acc">
        <div className="vector">
          <img src={vector} alt="vector" />
          <div>
            <h2>Create an Account</h2>
            <p>
              Report and Find lost items seamlesslyReport and Find lost items
              seamlessly
            </p>
          </div>
        </div>
        <div className="verification">
          <h2>Phone Number</h2>
          <p>Let us run a quick verification.</p>
          <form>
            <select name="country-code">
              <option value={+234}>+234</option>
            </select>
            <input type="number" placeholder="0000 000 0000" />
          </form>
          <div className="btn-submit">
            <button className="">Submit</button>
          </div>
        </div>
        <div className="verification">
          <h2>Verification</h2>
          <p>Enter the OTP sent to your number</p>
          <form>
            <input type="number" placeholder="enter OTP" />
          </form>
          <button className="btn-submit">Verify</button>
          <p>1:00</p>
          <p>
            did not get an OTP | <a href="#">Change Phone Number</a>{" "}
          </p>
        </div>
      </section> */}
      <section>
        <h1>Create Login Details</h1>
        <p>Final touch on setting up your account.</p>
        <form>
          <fieldset>
            <legend>First Name</legend>
            <input type="text" name="" id="" placeholder="john" />
          </fieldset>
          <fieldset>
            <legend>Last Name</legend>
            <input type="text" name="" id="" placeholder="doe" />
          </fieldset>
          <fieldset>
            <legend>Email</legend>
            <input type="email" name="" id="" placeholder="johndoe@gmail.com" />
          </fieldset>
          <fieldset>
            <legend>password</legend>
            <input type="password" name="" id="" placeholder="Enter Password" />
          </fieldset>
          <fieldset>
            <legend>Confirm password</legend>
            <input
              type="password"
              name=""
              id=""
              placeholder="Confirm Password"
            />
          </fieldset>
          <div>
            <input type="checkbox" name="" id="" />
            <label htmlFor="checkbox">I agree to Terms & Conditions</label>
          </div>
        </form>
        <button className="btn-create">Create Account</button>
      </section>
    </>
  );
};

export default SignUp;
