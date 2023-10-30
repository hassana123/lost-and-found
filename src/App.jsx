import Home from "./pages/home";
import "./index.css";
import Dashboard from "./pages/dashboard";

// import ForgotPassword from "./pages/ForgotPassword"
import Login from "./pages/login";
import Signup from "./pages/signup";
import LostItems from "./pages/lostItems";
import About from "./pages/about";
import ReportLostItem from "./pages/reportLostItem";
import LostItemDetails from "./pages/details";
import ClaimedItems from "./pages/claimedItems";
import { Routes, Route, BrowserRouter } from "react-router-dom";

function App() {
  // localStorage.clear();
  // localStorage.removeItem("userId");
  return (
    <BrowserRouter>
      <div className="bg-white font-montserrat text-capitalize">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Signup />} />
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/report" element={<ReportLostItem />} />
          <Route path="/items" element={<LostItems />} />
          <Route path="/details/:id" element={<LostItemDetails />} />
          <Route path="/claimed" element={<ClaimedItems />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
