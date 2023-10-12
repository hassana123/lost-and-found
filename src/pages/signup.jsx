/* eslint-disable react-hooks/rules-of-hooks */
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useState, useEffect } from "react";
import { database } from "../firebase";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
const signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const history = useNavigate();

  const signUp = (e) => {
    e.preventDefault();
    createUserWithEmailAndPassword(database, email, password)
      .then((userCredential) => {
        console.log(userCredential);
        history("/home");
      })
      .catch((error) => {
        console.log(error.code);
        setError(error.code);
      });
  };
  useEffect(() => {
    const time = setTimeout(() => {
      setError(error.code);
    }, 2000);
    return () => clearTimeout(time);
  }, [error]);

  return (
    <>
      <Navbar />

      <form onSubmit={signUp}>
        <div className="bg-grey-lighter min-h-screen flex flex-col">
          <div className="container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-2">
            <div className="bg-white px-6 py-8 rounded shadow-md text-black w-full">
              <h1 className="mb-8 text-base text-center">
                {" "}
                {error && <div>{error}</div>}
              </h1>
              <h1 className="mb-8 text-3xl text-center">Sign up</h1>

              <input
                type="email"
                className="block border border-grey-light w-full p-3 rounded mb-4"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
              />

              <input
                type="password"
                className="block border border-grey-light w-full p-3 rounded mb-4"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
              />

              <button
                className="w-full text-center py-3 rounded bg-green hover:bg-green-dark  my-1"
                type="submit"
              >
                Sign Up
              </button>
            </div>

            <div className="text-grey-dark mt-6">
              Already have an account?
              <a
                className="no-underline border-b border-blue text-blue-400"
                href="./login"
              >
                Log in
              </a>
              .
            </div>
          </div>
        </div>
      </form>
    </>
  );
};

export default signup;
