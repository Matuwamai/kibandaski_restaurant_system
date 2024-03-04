import moment from "moment";

export const formatDate = (createdAt) => {
  const today = moment().startOf("day");
  const orderDate = moment(createdAt);

  // Check if the order was created today
  if (orderDate.isSame(today, "day")) {
    return orderDate.calendar();
  } else {
    return orderDate.format("ll");
  }
};
