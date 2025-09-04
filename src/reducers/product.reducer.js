import {
  FETCH_PRODUCTS_REQUEST,
  FETCH_PRODUCTS_FAILURE,
  FETCH_PRODUCTS_SUCCESS,
  CREATE_PRODUCTS_REQUEST,
  CREATE_PRODUCTS_FAILURE,
  CREATE_PRODUCTS_SUCCESS,
} from "../actions/products/productTypes";
const initState = {
  loading: false,
  products: [],
  error: "",
  createSuccess: false,
  createErrorMessage: "",
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
    default:
      return state;
  }
};

export default productReducer;
