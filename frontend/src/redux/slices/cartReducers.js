import {
  CART_ADD_ITEM,
  CART_REMOVE_ITEM,
  CART_CLEAR_ITEMS,
  CART_SAVE_BILLING_ADDRESS,
  CART_SAVE_PAYMENT_METHOD,
  DECREASE_CART_QTY,
} from "../constants/cartConstants";

export const cartReducer = (
  state = {
    cartItems: localStorage.getItem("cartItems")
      ? JSON.parse(localStorage.getItem("cartItems"))
      : [],
    billingAddress: localStorage.getItem("billingAddress")
      ? JSON.parse(localStorage.getItem("billingAddress"))
      : {},
  },
  action
) => {
  switch (action.type) {
    case CART_ADD_ITEM:
      const item = action.payload;
      const existItem = state.cartItems.find((x) => x.id === item.id);

      if (existItem) {
        const newItem = { ...existItem, quantity: existItem?.quantity + 1 };
        return {
          ...state,
          cartItems: state.cartItems.map((x) =>
            x.id === existItem.id ? newItem : x
          ),
        };
      } else {
        return {
          ...state,
          cartItems: [...state.cartItems, item],
        };
      }
    case DECREASE_CART_QTY:
      const dec_productId = action.payload;
      const existingItem = state.cartItems.find((x) => x.id === dec_productId);

      const newItem = { ...existingItem, quantity: existingItem?.quantity - 1 };
      return {
        ...state,
        cartItems: state.cartItems.map((x) =>
          x.id === dec_productId ? newItem : x
        ),
      };

    case CART_REMOVE_ITEM:
      return {
        ...state,
        cartItems: state.cartItems.filter((x) => x.id !== action.payload),
      };
    case CART_SAVE_BILLING_ADDRESS:
      return {
        ...state,
        billingAddress: action.payload,
      };
    case CART_SAVE_PAYMENT_METHOD:
      return {
        ...state,
        paymentMethod: action.payload,
      };
    case CART_CLEAR_ITEMS:
      return {
        ...state,
        cartItems: [],
      };
    default:
      return state;
  }
};
