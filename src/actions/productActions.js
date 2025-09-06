import axios from "axios";
import {
  CREATE_PRODUCTS_FAILURE,
  CREATE_PRODUCTS_REQUEST,
  CREATE_PRODUCTS_SUCCESS,
  DELETE_PRODUCT_FAILURE,
  DELETE_PRODUCT_SUCCESS,
  FETCH_PRODUCT_FAILURE,
  FETCH_PRODUCT_REQUEST,
  FETCH_PRODUCT_SUCCESS,
  FETCH_PRODUCTS_FAILURE,
  FETCH_PRODUCTS_REQUEST,
  FETCH_PRODUCTS_SUCCESS,
  UPDATE_PRODUCT_FAILURE,
  UPDATE_PRODUCT_SUCCESS,
} from "./products/productTypes";
import { renderSync } from "sass";

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

const fetchProductRequest = () => {
  return {
    type: FETCH_PRODUCT_REQUEST,
  };
};

const fetchProductSuccess = (product) => {
  return {
    type: FETCH_PRODUCT_SUCCESS,
    payload: product,
  };
};

const fetchProductFailure = (error) => {
  return {
    type: FETCH_PRODUCT_FAILURE,
    payload: error,
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

const updateProductSuccess = (product) => {
  return {
    type: UPDATE_PRODUCT_SUCCESS,
    payload: product,
  };
};

const updateProductFailure = (error) => {
  return {
    type: UPDATE_PRODUCT_FAILURE,
    payload: error,
  };
};

const deleteProductSuccess = (product) => {
  return {
    type: DELETE_PRODUCT_SUCCESS,
    payload: product,
  };
};

const deleteProductFailure = () => {
  return {
    type: DELETE_PRODUCT_FAILURE,
  };
};

export const createProduct = (product) => {
  return async (dispatch) => {
    dispatch(createProductsRequest());
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

export const fetchProducts = (status) => {
  return async (dispatch) => {
    dispatch(fetchProductsRequest());

    const Url = `http://localhost:3000/products`;
    const apiUrl = status === undefined ? Url : Url + `?status=${status}`;

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

export const fetchProduct = (id) => {
  return async (dispatch) => {
    dispatch(fetchProductRequest());

    const apiUrl = `http://localhost:3000/products/${id}`;

    try {
      const res = await axios.get(apiUrl);
      const product = res && res.data ? res.data : [];
      dispatch(fetchProductSuccess(product));
    } catch (error) {
      console.log(error.message);
      dispatch(fetchProductFailure(error));
    }
  };
};

export const updateProduct = (product) => {
  return async (dispatch) => {
    const apiUrl = `http://localhost:3000/products/${product.id}`;

    try {
      const res = await axios.put(apiUrl, product);
      if (res && res?.status === 200) {
        dispatch(updateProductSuccess(res?.data));
      } else {
        dispatch(updateProductFailure("Update Failed"));
      }
    } catch (error) {
      dispatch(updateProductFailure(error?.message));
    }
  };
};

export const deleteProduct = (id) => {
  return async (dispatch) => {
    const apiUrl = `http://localhost:3000/products/${id}`;

    try {
      const res = await axios.delete(apiUrl);
      if (res && res?.status === 200) {
        dispatch(deleteProductSuccess(res?.data));
        setTimeout(() => {
          dispatch(fetchProducts());
        }, 500);
      } else {
        dispatch(deleteProductFailure("Delete Failed"));
      }
    } catch (error) {
      dispatch(deleteProductFailure(error?.message));
    }
  };
};

export const fetchProductsBySearchText = (searchText) => {
  return async (dispatch) => {
    dispatch(fetchProductsRequest());

    const apiUrl = `http://localhost:3000/products?q=${encodeURIComponent(searchText)}`;

    try {
      const res = await axios.get(apiUrl);
      console.log("searchText:", searchText);
      const products = res && res.data ? res.data : [];
      dispatch(fetchProductsSuccess(products));
    } catch (error) {
      console.log(error.message);
      dispatch(fetchProductsFailure(error));
    }
  };
};
