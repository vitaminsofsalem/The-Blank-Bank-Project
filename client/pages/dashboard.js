import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { getAccountData } from "../services/accounts";
import NavBar from "../components/NavBar";
import DialogBox from "../components/DialogBox";
import styles from "../styles/Dashboard.module.scss";
import { Container } from "reactstrap";
import AccountsTable from "../components/AccountsTable";

//Navbar props accepts

const Dashboard = (props) => {
  const [accountsList, setAccountsList] = useState([]);
  const [viewSignOutDialog, setViewSignOutDialog] = useState(false);

  const router = useRouter();

  const signOut = () => {
    localStorage.removeItem("jwt");
    router.replace("/");
  };

  const navbarOptions = [
    { key: 0, label: "accounts", action: null },
    { key: 1, label: "Sign Out", action: () => setViewSignOutDialog(true) },
  ];

  const signOutOptions = [
    { key: 0, label: "yes", action: signOut },
    { key: 1, label: "no", action: () => setViewSignOutDialog(false) },
  ];

  useEffect(() => {
    getAccountData().then((response) => {
      console.log(response);
      if (response.success) setAccountsList(response.data);
      else if (response.data?.status == 401) {
        signOut();
      }
    });
  }, []);

  return (
    <>
      {viewSignOutDialog && (
        <DialogBox
          message="are you sure you want to sign out?"
          options={signOutOptions}
        />
      )}
      <NavBar title="Dashboard" options={navbarOptions} />
      <div className={styles.dashboardContainer}>
        <h1>Accounts</h1>
        <AccountsTable accounts={accountsList} />
      </div>
    </>
  );
};

export default Dashboard;
