import { useRouter } from "next/router";
import React from "react";
import { Button, Table } from "reactstrap";

const AccountsTable = (props) => {
  const router = useRouter();
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
          {props.accounts.map((a, i) => (
            <tr key={i}>
              <th scope="row">{a.balance}</th>
              <td>{a.accountNo}</td>
              <td>
                <Button onClick={() => router.push(`/transactions/${a._id}`)}>
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
