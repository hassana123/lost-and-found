/* eslint-disable no-unused-vars */
import { sendPasswordResetEmail } from "firebase/auth";
import { database } from "../firebase";
import { useNavigate } from "react-router-dom";

function ForgotPassword() {
  const history = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const emalVal = e.target.email.value;
    sendPasswordResetEmail(database, emalVal)
      .then((data) => {
        alert("Check your gmail");
        history("/");
      })
      .catch((err) => {
        alert(err.code);
      });
  };
  return (
    <div className="App">
      <h1>Forgot Password</h1>
      <form onSubmit={(e) => handleSubmit(e)}>
        <input name="email" />
        <br />
        <br />
        <button>Reset</button>
      </form>
    </div>
  );
}
export default ForgotPassword;
