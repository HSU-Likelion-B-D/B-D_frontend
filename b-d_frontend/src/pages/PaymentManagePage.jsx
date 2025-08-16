import React from "react";
import { useState } from "react";
import styles from "../styles/pages/PaymentManagePage.module.scss";
import Header from "../components/MainPage/Header";
import { hamburger_icon, payment_profile } from "@/assets";
import PaymentModal from "../components/PaymentManage/PaymentModal";
import PaymentListItem from "../components/PaymentManage/PaymentListItem";
import Pagination from "../components/PaymentManage/Pagination";

const sampleList = [
  {
    id: 1,
    imgSrc: payment_profile,
    title: "#성북구 카페 신메뉴 런칭, 인플루언서 협업 제안 캠페인",
    desc: "요청 금액 : 100,000 / 수수료 10% / 실 납부금액",
    price: "110,000",
    period: "25.10.01~25.12.31",
    status: "결제하기",
    statusColor: "#0c9ce9",
    dDay: "D-3",
  },
  {
    id: 2,
    imgSrc: payment_profile,
    title: "#성북구 카페 신메뉴 런칭, 인플루언서 협업 제안 캠페인",
    desc: "요청 금액 : 100,000 / 수수료 10% / 실 납부금액",
    price: "110,000",
    period: "25.10.01~25.12.31",
    status: "결제 완료",
    statusColor: "#43a047",
    dDay: undefined,
  },
  {
    id: 3,
    imgSrc: payment_profile,
    title: "#성북구 카페 신메뉴 런칭, 인플루언서 협업 제안 캠페인",
    desc: "요청 금액 : 100,000 / 수수료 10% / 실 납부금액",
    price: "110,000",
    period: "25.10.01~25.12.31",
    status: "정산 완료",
    statusColor: "#bdbdbd",
    dDay: undefined,
  },
  {
    id: 4,
    imgSrc: payment_profile,
    title: "#성북구 카페 신메뉴 런칭, 인플루언서 협업 제안 캠페인",
    desc: "요청 금액 : 100,000 / 수수료 10% / 실 납부금액",
    price: "110,000",
    period: "25.10.01~25.12.31",
    status: "결제하기",
    statusColor: "#0c9ce9",
    dDay: undefined,
  },
  {
    id: 5,
    imgSrc: payment_profile,
    title: "#성북구 카페 신메뉴 런칭, 인플루언서 협업 제안 캠페인",
    desc: "요청 금액 : 100,000 / 수수료 10% / 실 납부금액",
    price: "110,000",
    period: "25.10.01~25.12.31",
    status: "결제하기",
    statusColor: "#0c9ce9",
    dDay: undefined,
  },
  {
    id: 6,
    imgSrc: payment_profile,
    title: "#성북구 카페 신메뉴 런칭, 인플루언서 협업 제안 캠페인",
    desc: "요청 금액 : 100,000 / 수수료 10% / 실 납부금액",
    price: "110,000",
    period: "25.10.01~25.12.31",
    status: "결제하기",
    statusColor: "#0c9ce9",
    dDay: undefined,
  },
];

const PaymentManagePage = () => {
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  return (
    <div className={styles.container}>
      <div className={styles.headerContainer}>
        <Header isCreateProposalPage={true} />
      </div>
      <div className={styles.titleContainer}>
        <div className={styles.subhamContainer}>
          <h1 className={styles.subtitle}>
            <span className={styles.highlight}>결제 및 정산</span> 관리하기
          </h1>
        </div>
        <div className={styles.hamburgerContainer}>
          <img
            className={styles.hamburgerIcon}
            src={hamburger_icon}
            alt="hamburger"
            onClick={() => setIsPaymentModalOpen(!isPaymentModalOpen)}
          />
          {isPaymentModalOpen && (
            <div className={styles.paymentModal}>
              <PaymentModal />
            </div>
          )}
        </div>
      </div>
      <div className={styles.description}>사장님을 기다리고 있어요!</div>
      <div className={styles.listWrap}>
        {sampleList.map((item) => (
          <PaymentListItem
            key={item.id}
            imgSrc={item.imgSrc}
            title={item.title}
            desc={item.desc}
            price={
              <span style={{ color: "#2196f3", fontWeight: 700 }}>
                {item.price}
              </span>
            }
            period={item.period}
            status={item.status}
            statusColor={item.statusColor}
            dDay={item.dDay}
          />
        ))}
      </div>
      <Pagination
        currentPage={1}
        totalPages={5}
        onPageChange={(page) => console.log("Page changed to:", page)}
      />
    </div>
  );
};

export default PaymentManagePage;
