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



export default function CompletedTransactions() {
  const {completTransactions} = useSelector((state) => state.payments);
  return (
    <>
        <TableContainer component={Paper} style={{boxShadow: "none", border: '1px solid lightgray'}}>
      <Table sx={{ minWidth: 700, boxShadow: 0 }} aria-label='customized table'>
        <TableHead>
          <TableRow>
            <StyledTableCell>Transaction ID</StyledTableCell>
            <StyledTableCell align='right'>Reference NO</StyledTableCell>
            <StyledTableCell align='right'>Order ID</StyledTableCell>
            <StyledTableCell align='right'>Customer Name</StyledTableCell>
            <StyledTableCell align='right'>Amount</StyledTableCell>
            <StyledTableCell align='right'>Date</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {completTransactions?.transactions?.map((transaction) => (
            <StyledTableRow key={transaction.id}>
              <StyledTableCell>{transaction.id}</StyledTableCell>
              <StyledTableCell align='right'>
                {transaction.receiptNumber}
              </StyledTableCell>
              <StyledTableCell align='right'>{transaction.order_id}</StyledTableCell>
              <StyledTableCell align='right'>{transaction.fullName}</StyledTableCell>
              <StyledTableCell align='right'>{transaction.amount}</StyledTableCell>
              <StyledTableCell align='right'>{transaction.transactionDate}</StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    <Pagination pages={completTransactions?.total_pages} currentPage={completTransactions?.current_page} />
    </>
  );
}
