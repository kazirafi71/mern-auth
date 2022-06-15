import React from "react";
import { Link } from "react-router-dom";

const HomeComp = () => {
  const token = localStorage.getItem("auth_token");

  if (!token) {
    return (
      <div className="d-flex align-item-center justify-content-center">
        <Link to="/login">Please Login</Link>
      </div>
    );
  }
  return (
    <div>
      <h2>Welcome to Home</h2>
    </div>
  );
};

export default HomeComp;
