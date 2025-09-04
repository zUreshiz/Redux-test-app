import axios from "axios";
import {
  FETCH_PRODUCTS_FAILURE,
  FETCH_PRODUCTS_REQUEST,
  FETCH_PRODUCTS_SUCCESS,
} from "./products/productTypes";

const fetchProductsRequest = () => {
  return {
    type: FETCH_PRODUCTS_REQUEST,
  };
};

const fetchProductsSuccess = (error) => {
  return {
    type: FETCH_PRODUCTS_SUCCESS,
    payload: error,
  };
};

const fetchProductsFailure = () => {
  return {
    type: FETCH_PRODUCTS_FAILURE,
    products: [],
  };
};
export const fetchProducts = () => {
  return async (dispatch) => {
    dispatch(fetchProductsRequest);

    const apiUrl = "http://localhost:3000/products";

    try {
      const res = await axios.get(apiUrl);
      const products = res && res.data ? res.data : [];
      dispatch(fetchProductsSuccess(products));
    } catch (error) {
      console.log(error.message);
      dispatch(fetchProductsFailure(error));
    }
  };
};
