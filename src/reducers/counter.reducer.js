const initialState = {
  initCount: 0,
};

const counterReducer = (state = initialState, action) => {
  switch (action.type) {
    case "plus":
      return {
        initCount: state.initCount + 1,
      };
    case "minus":
      return {
        initCount: state.initCount - 1,
      };
    default:
      return state;
  }
};
export default counterReducer;
