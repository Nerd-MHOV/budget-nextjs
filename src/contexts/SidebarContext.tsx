"use client";
import { createContext, useReducer } from "react";

type SidebarContextType = {
  activeSidebar: boolean;
  setActiveSidebar: VoidFunction;
};
type State = { activeSidebar: boolean };
type Action = { type: string; payload: boolean };

const SidebarReducer = (state: State, action: Action) => {
  switch (action.type) {
    case "TOGGLE": {
      return {
        ...state,
        activeSidebar: action.payload,
      };
    }
    default:
      return state;
  }
};

export const SidebarContext = createContext({} as SidebarContextType);

export const SidebarContextProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const initialState = {
    activeSidebar: false,
  };

  const [state, dispatch] = useReducer(SidebarReducer, initialState);
  const { activeSidebar } = state;

  const setActiveSidebar = () => {
    dispatch({
      type: "TOGGLE",
      payload: !activeSidebar,
    });
  };
  return (
    <SidebarContext.Provider value={{ activeSidebar, setActiveSidebar }}>
      {children}
    </SidebarContext.Provider>
  );
};
