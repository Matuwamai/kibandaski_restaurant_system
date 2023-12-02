export const reducer = (state, action) => {
  switch (action.type) {
    case "OPEN_ORDER_VIEW_MODAL":
      return {
        ...state,
        isOrderViewModalOpen: true,
        viewOrderNo: action.payload,
      };
    case "CLOSE_ORDER_VIEW_MODAL":
      return {
        ...state,
        isOrderViewModalOpen: false,
        viewOrderNo: null,
      };
    case "OPEN_ORDER_CREATE_MODAL":
      return {
        ...state,
        isOrderCreateModalOpen: true,
      };
    case "CLOSE_ORDER_CREATE_MODAL":
      return {
        ...state,
        isOrderCreateModalOpen: false,
      };
    case "OPEN_MEAL_CREATE_MODAL":
      return {
        ...state,
        isMealCreateModalOpen: true,
      };
    case "CLOSE_MEAL_CREATE_MODAL":
      return {
        ...state,
        isMealCreateModalOpen: false,
      };
    case "OPEN_CART_MODAL":
      return {
        ...state,
        isCartOpen: true,
      };
    case "CLOSE_CART_MODAL":
      return {
        ...state,
        isCartOpen: false,
      };
    default:
      return state;
  }
};
