import React, { useEffect, useState } from "react";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import axios from "../services/apiService";
import { useRouter } from "next/router";
import { Button } from "reactstrap";

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
      fontSize: 28,
    },
  },
}))(TableRow);

const useStyles = makeStyles({
  table: {
    minWidth: 400,
  },
});

export default function Dashboard(props) {
  const classes = useStyles();
  const [AccountsList, setList] = useState([]);

  const router = useRouter();

  const signOut = () => {
    localStorage.removeItem("jwt");
    router.replace("/");
  };

  useEffect(async () => {
    try {
      await axios.get("http://localhost:3001/accounts").then((AccOfUserID) => {
        setList(AccOfUserID.data);
      });
    } catch (e) {
      if (e.response && e.response.data.statusCode === 401) {
        signOut();
      }
    }
  }, []);

  return (
    <>
      <h1 align="center"> Dashboard </h1>
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell align="left">Account Number</StyledTableCell>
              <StyledTableCell align="left">Balance</StyledTableCell>
              <StyledTableCell align="left">Account Ledger</StyledTableCell>
              <StyledTableCell align="left">
                <Button color="danger" onClick={signOut}>
                  Sign out
                </Button>
              </StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {AccountsList.map((Account) => (
              <StyledTableRow key={Account._id}>
                <StyledTableCell align="left">
                  {Account.accountNo}
                </StyledTableCell>
                <StyledTableCell align="left">
                  {Account.balance}
                </StyledTableCell>
                <StyledTableCell align="left">
                  <button
                    type="button"
                    onClick={() => {
                      router.push(`/transactions/${Account._id}`);
                    }}
                  >
                    View transactions
                  </button>
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
