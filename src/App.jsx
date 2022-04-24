import { Routes, Route, Link } from "react-router-dom";
import "./App.css";

// Components
import NavBar from "./components/navbar/NavBar";

// Pages
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import Signup from "./pages/signup/Signup";

// Conntext
import { useAuthContext } from "./hooks/useAuthContext";

function App() {
  const { authIsReady, user } = useAuthContext();
  return (
    <div className="App">
      {authIsReady && (
        <>
          <NavBar />

          <Routes>
            <Route path="/" element={!user ? <Login /> : <Home />} />
            <Route path="login" element={user ? <Home /> : <Login />} />
            <Route path="signup" element={user ? <Home /> : <Signup />} />
          </Routes>
        </>
      )}
    </div>
  );
}

export default App;
