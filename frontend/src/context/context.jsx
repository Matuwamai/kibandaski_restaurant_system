import React, { createContext, useContext, useReducer } from "react";
import { reducer } from "./reducer";

const context = createContext();

const initialState = {
  isOrderViewModalOpen: false,
  isOrderCreateModalOpen: false,
  isMealCreateModalOpen: false,
};

function ContextProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  const openOrderViewModal = () => {
    dispatch({ type: "OPEN_ORDER_VIEW_MODAL" });
  };

  const closeOrderViewModal = () => {
    dispatch({ type: "CLOSE_ORDER_VIEW_MODAL" });
  };

  const openOrderCreateModal = () => {
    dispatch({ type: "OPEN_ORDER_CREATE_MODAL" });
  };

  const closeOrderCreateModal = () => {
    dispatch({ type: "CLOSE_ORDER_CREATE_MODAL" });
  };

  const openMealCreateModal = () => {
    dispatch({ type: "OPEN_MEAL_CREATE_MODAL" });
  };

  const closeMealCreateModal = () => {
    dispatch({ type: "CLOSE_MEAL_CREATE_MODAL" });
  };

  return (
    <context.Provider
      value={{
        ...state,
        openOrderViewModal,
        closeOrderViewModal,
        openOrderCreateModal,
        closeOrderCreateModal,
        openMealCreateModal,
        closeMealCreateModal,
      }}
    >
      {children}
    </context.Provider>
  );
}

const useGlobalContext = () => {
  return useContext(context);
};

export { ContextProvider, useGlobalContext };
