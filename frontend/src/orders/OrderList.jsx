import * as React from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useSelector } from "react-redux";
import Pagination from "../pagination/Pagination";
import moment from "moment";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "",
    // color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  padding: 0,
  "&:nth-of-type(odd)": {
    backgroundColor: "rgb(248 250 252)",
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
  // "&:hover": {
  //   backgroundColor: ""
  // }
}));

export default function OrderList() {
  const { completTransactions } = useSelector((state) => state.payments);
  const { ordersList } = useSelector((state) => state.orders);

  const formatOrderDate = (createdAt) => {
    const today = moment().startOf("day");
    const orderDate = moment(createdAt);

    // Check if the order was created today
    if (orderDate.isSame(today, "day")) {
      return orderDate.calendar();
    } else {
      return orderDate.format("ll");
    }
  };
  
  return (
    <>
      <TableContainer
        component={Paper}
        style={{ boxShadow: "none", border: "1px solid lightgray" }}
      >
        <Table
          sx={{ minWidth: 700, boxShadow: 0 }}
          aria-label='customized table'
        >
          <TableHead>
            <TableRow>
              <StyledTableCell>Order NO</StyledTableCell>
              <StyledTableCell>Table/Counter</StyledTableCell>
              <StyledTableCell>Customer</StyledTableCell>
              <StyledTableCell>Description</StyledTableCell>
              <StyledTableCell>Payment Method</StyledTableCell>
              <StyledTableCell align='right'>Amount</StyledTableCell>
              <StyledTableCell align='right'>Balance</StyledTableCell>
              <StyledTableCell align='right'>Status</StyledTableCell>
              <StyledTableCell>Date</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {ordersList?.orders?.map((order) => {
              const order_desc = (order.orderItems || [])
                .map((item) => item.title)
                .join(", ");
              return (
                <StyledTableRow key={order.id}>
                  <StyledTableCell>{order.id}</StyledTableCell>
                  <StyledTableCell>
                    {order.table_no}
                  </StyledTableCell>
                  <StyledTableCell>{order.customer_name}</StyledTableCell>
                  <StyledTableCell>{order_desc}</StyledTableCell>
                  <StyledTableCell>
                    {order.payment_method === "MPESA" ? (
                      <img
                        src='/assets/mpesa.png'
                        alt='mpesa'
                        className='w-14 h-6 img-cover'
                      />
                    ) : (
                      <h5 className='h-full text-gray-600 uppercase'>Cash</h5>
                    )}
                  </StyledTableCell>
                  <StyledTableCell align='right'>
                    {order.amount.toFixed(2)}
                  </StyledTableCell>
                  <StyledTableCell align='right'>0.0</StyledTableCell>
                  <StyledTableCell align='right'>
                    {order.is_paid}
                  </StyledTableCell>
                  <StyledTableCell>
                    {formatOrderDate(order.created_at)}
                  </StyledTableCell>
                </StyledTableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <Pagination
        pages={completTransactions?.total_pages}
        currentPage={completTransactions?.current_page}
      />
    </>
  );
}
