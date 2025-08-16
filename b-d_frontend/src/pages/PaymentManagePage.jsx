import React from "react";
import { useState } from "react";
import styles from "../styles/pages/PaymentManagePage.module.scss";
import Header from "../components/MainPage/Header";
import { hamburger_icon, payment_profile } from "@/assets";
import PaymentModal from "../components/PaymentManage/PaymentModal";
import PaymentListItem from "../components/PaymentManage/PaymentListItem";
import Pagination from "../components/PaymentManage/Pagination";
import PaymentProgressModal from "../components/PaymentManage/PaymentProgressModal";
import PaymentCompleteModal from "../components/PaymentManage/PaymentCompleteModal";
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
  {
    id: 7,
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
    id: 8,
    imgSrc: payment_profile,
    title: "#성북구 카페 신메뉴 런칭, 인플루언서 협업 제안 캠페인",
    desc: "요청 금액 : 100,000 / 수수료 10% / 실 납부금액",
    price: "110,000",
    period: "25.10.01~25.12.31",
    status: "정산 완료",
    statusColor: "#bdbdbd",
    dDay: undefined,
  },
];

const ITEMS_PER_PAGE = 6;
const PaymentManagePage = () => {
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [filter, setFilter] = useState("all");
  const [isPaymentProgressModalOpen, setIsPaymentProgressModalOpen] =
    useState(false);
  const [isPaymentCompleteModalOpen, setIsPaymentCompleteModalOpen] =
    useState(false);
  // 현재 페이지에 보여줄 데이터만 추출 - 6개의 데이터만
  const pagedList = sampleList.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );
  // 필터링된 리스트
  const filteredList = pagedList.filter((item) => {
    //해당 페이지마다 필터링 가능
    if (filter === "all") return true;
    if (filter === "결제 대기") return item.status === "결제하기";
    if (filter === "결제 완료") return item.status === "결제 완료";
    if (filter === "정산 완료") return item.status === "정산 완료";
    return true;
  });

  // 페이지 수는 전체 데이터 기준으로 - 전체 / 6개의 데이터
  const totalPages = Math.ceil(sampleList.length / ITEMS_PER_PAGE);

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
              <PaymentModal
                filter={filter}
                setFilter={(value) => {
                  setFilter(value);
                  setIsPaymentModalOpen(false); // 모달 닫기
                }}
              />
            </div>
          )}
        </div>
      </div>
      <div className={styles.description}>사장님을 기다리고 있어요!</div>
      <div className={styles.listWrap}>
        {filteredList.map((item) => (
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
            setIsPaymentProgressModalOpen={setIsPaymentProgressModalOpen}
          />
        ))}
      </div>
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
      {isPaymentProgressModalOpen && (
        <div className={styles.paymentProgressModal}>
          <PaymentProgressModal
            setIsPaymentProgressModalOpen={setIsPaymentProgressModalOpen}
            setIsPaymentCompleteModalOpen={setIsPaymentCompleteModalOpen}
          />
        </div>
      )}

      {isPaymentCompleteModalOpen && (
        <div className={styles.paymentCompleteModal}>
          <PaymentCompleteModal
            setIsPaymentCompleteModalOpen={setIsPaymentCompleteModalOpen}
          />
        </div>
      )}
    </div>
  );
};

export default PaymentManagePage;
