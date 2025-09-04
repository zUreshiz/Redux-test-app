const myLogger = (store) => (next) => (action) => {
  console.log("Log action ", action);
  next(action);
};
export default myLogger;
