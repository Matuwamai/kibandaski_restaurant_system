import React, { createContext, useContext, useReducer } from "react";
import { reducer } from "./reducer";

const context = createContext();

const initialState = {
  isOrderViewModalOpen: false,
  isOrderCreateModalOpen: false,
  isMealCreateModalOpen: false,
  isCartOpen: false,
  viewOrderNo: null,
};

function ContextProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  const openOrderViewModal = (id) => {
    dispatch({ type: "OPEN_ORDER_VIEW_MODAL", payload: id });
  };

  const closeOrderViewModal = () => {
    dispatch({ type: "CLOSE_ORDER_VIEW_MODAL" });
  };

  const openCartModal = () => {
    dispatch({ type: "OPEN_CART_MODAL" });
  };

  const closeCartModal = () => {
    dispatch({ type: "CLOSE_CART_MODAL" });
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
        openCartModal,
        closeCartModal,
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
