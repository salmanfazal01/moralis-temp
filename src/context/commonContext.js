import { createContext, useState } from "react";

// Create Context Object
export const CommonContext = createContext({});

// Create a provider for components to consume and subscribe to changes
export const CommonContextProvider = ({ initialState = {}, children }) => {
  const [state, setState] = useState({ ...initialState });

  const setCommonState = (data = {}) => {
    setState((old) => ({
      ...old,
      ...data,
    }));
  };

  return (
    <CommonContext.Provider value={{ commonState: state, setCommonState }}>
      {children}
    </CommonContext.Provider>
  );
};
