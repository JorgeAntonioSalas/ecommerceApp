import { HashRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import ProductsDetail from "./pages/ProductsDetail";
import Login from "./pages/Login";
import Favorites from "./pages/Favorites";
import MyNavbar from "./components/MyNavar";
import LoadingScreen from "./components/LoadingScreen";
import { useSelector } from "react-redux/es/hooks/useSelector";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getProductsThunk } from "./store/slices/products.slice";
import { Container } from "react-bootstrap";
import ProtectedRoutes from "./components/ProtectedRoutes";

function App() {
  const dispatch= useDispatch();

  useEffect(()=>{
    dispatch(getProductsThunk());
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])

  const isLoading = useSelector(state => state.isLoadingSlice)

  return (
    <div>
      <HashRouter>
      <MyNavbar />
        {isLoading && <LoadingScreen/>}
        <Container className="mt-5">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products/:id" element={<ProductsDetail/>} />
          <Route element={<ProtectedRoutes/>}>
          <Route path="/favorites" element={<Favorites />} />
          </Route>
          <Route path="/login" element={<Login />} />
        </Routes>
        </Container>
      </HashRouter>
    </div>
  );
}

export default App;
