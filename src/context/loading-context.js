import React, { createContext, useReducer } from "react";

const initState = {
  isLoading: false
};
const loadingStore = createContext(initState);
const { Provider } = loadingStore;

const LoadingStateProvider = ({ children }) => {
  const [loadingState, dispatchLoading] = useReducer((state, action) => {
    switch (action.type) {
      case "Set-Loading":
        return { ...state, isLoading: action.isLoading };
      default:
        throw new Error();
    }
  }, initState);
  return <Provider value={{ loadingState, dispatchLoading }}>{children}</Provider>;
};

export { loadingStore, LoadingStateProvider };
