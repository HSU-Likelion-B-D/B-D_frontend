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

export const InfluencerRoute = () => {
  const userType = getUserType();

  if (!userType || userType !== "INFLUENCER") {
    // userType이 없거나 INFLUENCER가 아닌 경우
    alert("인플루언서만 접근 가능합니다.");

    if (!userType) {
      return <Navigate to="/login" replace />;
    } else {
      return <Navigate to="/" replace />;
    }
  }
  return <Outlet />;
};

export default InfluencerRoute;
