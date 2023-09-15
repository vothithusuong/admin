import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import List from "./pages/list/List";
import ListCate from "./pages/listCate/ListCate";
import Single from "./pages/single/Single";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import "./style/dark.scss";
import { useContext } from "react";
import { DarkModeContext } from "../src/context/darkModeContext/darkModeContext";
import { AuthContext } from "./context/authContext/AuthContext";
import ListBook from "./pages/listBook/ListBook";
import ListBorrow from "./pages/listBorrow/ListBorrow";
import ListBanner from "./pages/listBanner/ListBanner";
import NotFound from "./pages/404NotFound/404NotFound";
import ScrollToTop from "./components/scroll/ScrollToTop"


function App() {
  const { darkMode } = useContext(DarkModeContext);
  const { user } = useContext(AuthContext)
  return (
    <div className={darkMode ? "app dark" : "app"}>
      <BrowserRouter>
      <ScrollToTop />
        <Routes>
          <Route exact path='/' element={user ? <Home /> : <Login />} />
          <Route path="users">
            <Route index element={user ? <List /> : <Login />} />
            <Route path=":userId" element={user ? <Single /> : <Login />} />
          </Route>
          <Route path='/login' element={user ? <Navigate to='/' /> : <Login />} />
          <Route path="books">
            <Route index element={user ? <ListBook /> : <Login />} />
            <Route path=":bookId" element={user ? <Single /> : <Login />} />
          </Route>
          <Route path="borrows">
            <Route index element={user ? <ListBorrow /> : <Login />} />
          </Route>
          <Route path="category">
            <Route index element={user ? <ListCate /> : <Login />} />
          </Route>
          <Route path="banner">
            <Route index element={user ? <ListBanner /> : <Login />} />
          </Route>
          <Route path='*' element={user ? <NotFound /> : <Login />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
