import React from "react";
import { Navigate, Outlet } from "react-router-dom";

function getUserType() {
  try {
    return localStorage.getItem("userType");
  } catch (error) {
    console.error(error);
    return null;
  }
}

export const BusinessRoute = () => {
  const userType = getUserType();

  if (!userType || userType !== "BUSINESS") {
    alert("자영업자만 접근 가능합니다.");

    if (!userType) {
      return <Navigate to="/login" replace />;
    } else {
      return <Navigate to="/influencer-main" replace />;
    }
  }
  return <Outlet />;
};

export default BusinessRoute;
