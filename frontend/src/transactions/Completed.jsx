import * as React from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

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
  "&:nth-of-type(odd)": {
    backgroundColor: "rgb(248 250 252)",
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));


const rows = [
  {
    id: 1,
    order_id: 3,
    ReceiptNumber: "SAJNSJWEQ",
    Amount: 100,
    fullName: "Wamae Ndiritu",
    date: "1/03/2024 13:47",
  },
  {
    id: 2,
    order_id: 4,
    ReceiptNumber: "ASDJASDWQ",
    Amount: 150,
    fullName: "John Doe",
    date: "1/03/2024 14:15",
  },
  {
    id: 3,
    order_id: 5,
    ReceiptNumber: "POINLKOIN",
    Amount: 200,
    fullName: "Jane Smith",
    date: "1/03/2024 14:32",
  },
  {
    id: 4,
    order_id: 6,
    ReceiptNumber: "ZXCVBNNMI",
    Amount: 180,
    fullName: "Alice Johnson",
    date: "1/03/2024 15:02",
  },
  {
    id: 5,
    order_id: 7,
    ReceiptNumber: "QWERTYUIO",
    Amount: 120,
    fullName: "Bob Brown",
    date: "1/03/2024 15:21",
  },
  {
    id: 6,
    order_id: 8,
    ReceiptNumber: "MNBVCXZLK",
    Amount: 90,
    fullName: "Emily Wilson",
    date: "1/03/2024 15:45",
  },
];


export default function CompletedTransactions() {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label='customized table'>
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
          {rows.map((row) => (
            <StyledTableRow key={row.id}>
              <StyledTableCell >{row.id}</StyledTableCell>
              <StyledTableCell align='right'>
                {row.ReceiptNumber}
              </StyledTableCell>
              <StyledTableCell align='right'>{row.order_id}</StyledTableCell>
              <StyledTableCell align='right'>{row.fullName}</StyledTableCell>
              <StyledTableCell align='right'>{row.Amount}</StyledTableCell>
              <StyledTableCell align='right'>{row.date}</StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
