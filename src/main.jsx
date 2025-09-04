import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import "./index.css";
import App from "./App.jsx";
import store from "./config/store.js";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Products from "./pages/Products.jsx";
import "bootstrap/dist/css/bootstrap.min.css";
import AddProduct from "./pages/AddProduct.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/manage-product" element={<Products />} />
          <Route path="/create-product" element={<AddProduct />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  </StrictMode>
);
