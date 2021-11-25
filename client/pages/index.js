import { useState, useEffect } from "react";
import Login from "../components/Login";
import Dashboard from "../components/Dashboard";
import Guest from "../components/Guest";

export default function Home() {
  const [accessToken, setAccessToken] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("jwt");
    setAccessToken(token);
  }, []);

  return accessToken ? <Dashboard /> : <Guest />;
}
