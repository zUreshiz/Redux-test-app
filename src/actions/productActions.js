import axios from "axios";
import {
  CREATE_PRODUCTS_FAILURE,
  CREATE_PRODUCTS_REQUEST,
  CREATE_PRODUCTS_SUCCESS,
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

const createProductsRequest = () => {
  return {
    type: CREATE_PRODUCTS_REQUEST,
  };
};

const createProductsSuccess = (product) => {
  return {
    type: CREATE_PRODUCTS_SUCCESS,
    payload: product,
  };
};

const createProductsFailure = (error) => {
  return {
    type: CREATE_PRODUCTS_FAILURE,
    payload: error,
  };
};

export const createProduct = (product) => {
  return async (dispatch) => {
    dispatch(createProductsRequest);
    const apiUrl = "http://localhost:3000/products";

    try {
      const res = await axios.post(apiUrl, product);
      if (res && res?.status === 201) {
        dispatch(createProductsSuccess(res?.data));
      } else {
        dispatch(createProductsFailure("Create Failed"));
      }
    } catch (error) {
      dispatch(createProductsFailure(error?.message));
    }
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
