import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import NewsDetail from "./pages/NewsDetail";
import Login from "./pages/Login";
import Favorites from "./pages/Favorites";
import MyNavbar from "./components/MyNavar";
import LoadingScreen from "./components/LoadingScreen";

function App() {
  return (
    <div>
      <BrowserRouter>
        <LoadingScreen />
        <MyNavbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/news/:id" element={<NewsDetail />} />
          <Route path="/login" element={<Login />} />
          <Route path="/favorites" element={<Favorites />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
