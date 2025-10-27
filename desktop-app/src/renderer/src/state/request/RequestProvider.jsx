import { createContext, useContext, useReducer } from "react";
import { initialState } from "./config";
import { reducer } from "./reducer";

export const RequestContext = createContext();

export function RequestContextProvider({
  children,
  config
}) {
  const [state, dispatch] = useReducer(reducer, config)
  return <RequestContext.Provider value={{
    dispatch,
    state
  }}>
    {children}
  </RequestContext.Provider>
}

export function useRequestContext() {
  const context = useContext(RequestContext);
  if (!context) throw new Error("No context found!");
  return context;
}