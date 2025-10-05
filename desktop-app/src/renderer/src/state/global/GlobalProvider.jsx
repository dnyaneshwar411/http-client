import { createContext, useContext, useReducer } from "react";
import { initialState } from "./config";
import { reducer } from "./reducer";

export const GlobalContext = createContext();

export function GlobalContextProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState)
  return <GlobalContext.Provider value={{
    dispatch,
    state
  }}>
    {children}
  </GlobalContext.Provider>
}

export function useGlobalContext() {
  const context = useContext(GlobalContext);
  if (!context) throw new Error("No context found!");
  return context;
}