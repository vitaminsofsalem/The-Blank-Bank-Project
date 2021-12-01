import { useRouter } from "next/router";
import React, { useState, useEffect } from "react";
import { Button, Table } from "reactstrap";
import { getAccountData } from "../services/accounts";

const AccountsTable = (props) => {
  const router = useRouter();
  const [accounts, setAccounts] = useState([]);
  useEffect(() => {
    getAccountData().then((response) => {
      console.log(response);
      if (response.success) setAccounts(response.data);
      else if (response.data?.status == 401) {
        localStorage.removeItem("jwt");
        router.replace("/");
      }
    });
  }, []);

  return (
    <>
      <Table hover>
        <thead>
          <tr>
            <th>Balance</th>
            <th>Account No.</th>
            <th>view transactions</th>
          </tr>
        </thead>
        <tbody>
          {accounts.map((a, i) => (
            <tr key={i}>
              <th scope="row">{a.balance}</th>
              <td>{a.accountNo}</td>
              <td>
                <Button onClick={() => props.handleTransactionSelect(a._id)}>
                  view transactions
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  );
};
export default AccountsTable;
