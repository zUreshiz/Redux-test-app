import {
  FETCH_PRODUCTS_REQUEST,
  FETCH_PRODUCTS_FAILURE,
  FETCH_PRODUCTS_SUCCESS,
  CREATE_PRODUCTS_REQUEST,
  CREATE_PRODUCTS_FAILURE,
  CREATE_PRODUCTS_SUCCESS,
  FETCH_PRODUCT_REQUEST,
  FETCH_PRODUCT_SUCCESS,
  FETCH_PRODUCT_FAILURE,
  UPDATE_PRODUCT_SUCCESS,
  UPDATE_PRODUCT_FAILURE,
} from "../actions/products/productTypes";
const initState = {
  loading: false,
  products: [],
  error: "",
  createSuccess: false,
  createErrorMessage: "",
  product: {},
  updateSuccess: false,
  updateErrorMessage: "",
};

const productReducer = (state = initState, action) => {
  switch (action.type) {
    case FETCH_PRODUCTS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case FETCH_PRODUCTS_SUCCESS:
      return {
        loading: false,
        products: action.payload,
        error: "",
      };
    case FETCH_PRODUCTS_FAILURE:
      return {
        loading: false,
        products: [],
        error: action.payload,
      };

    case CREATE_PRODUCTS_REQUEST:
      return {
        createSuccess: false,
        createErrorMessage: "",
      };
    case CREATE_PRODUCTS_SUCCESS:
      return {
        createSuccess: true,
        createErrorMessage: "",
      };
    case CREATE_PRODUCTS_FAILURE:
      return {
        createSuccess: false,
        createErrorMessage: action.payload,
      };

    case FETCH_PRODUCT_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case FETCH_PRODUCT_SUCCESS:
      return {
        loading: false,
        product: action.payload,
      };
    case FETCH_PRODUCT_FAILURE:
      return {
        loading: false,
        error: action.payload,
      };
    case UPDATE_PRODUCT_SUCCESS:
      return {
        loading: false,
        updateSuccess: true,
        updateErrorMessage: "",
      };
    case UPDATE_PRODUCT_FAILURE:
      return {
        loading: false,
        updateSuccess: false,
        updateErrorMessage: action.payload,
      };
    default:
      return state;
  }
};

export default productReducer;
