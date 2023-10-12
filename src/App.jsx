import Home from "./pages/home";
// import ForgotPassword from "./pages/ForgotPassword";
import Login from "./pages/login";
import Signup from "./pages/signup";

import { Routes, Route, BrowserRouter } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path="/" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/home" element={<Home />} />
          {/* <Route path="/reset" element={<ForgotPassword />} /> */}
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
