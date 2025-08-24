import React from "react";
import { useState, useEffect } from "react";
import styles from "../styles/pages/PaymentManagePage.module.scss";
import Header from "../components/MainPage/Header";
import { hamburger_icon } from "@/assets";
import PaymentModal from "../components/PaymentManage/PaymentModal";
import PaymentListItem from "../components/PaymentManage/PaymentListItem";
import Pagination from "../components/PaymentManage/Pagination";
import PaymentProgressModal from "../components/PaymentManage/PaymentProgressModal";
import PaymentCompleteModal from "../components/PaymentManage/PaymentCompleteModal";
import axiosInstance from "@/apis/axiosInstance";

const PaymentManagePage = () => {
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [filter, setFilter] = useState("all");
  const [isPaymentProgressModalOpen, setIsPaymentProgressModalOpen] =
    useState(false);
  const [isPaymentCompleteModalOpen, setIsPaymentCompleteModalOpen] =
    useState(false);
  const [totalPages, setTotalPages] = useState(0);
  const [paymentList, setPaymentList] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null); // 선택된 아이템 상태 추가
  const [prevModalState, setPrevModalState] = useState(false); // 이전 모달 상태 추적

  // 모달이 열릴 때 스크롤을 최상단으로 이동
  useEffect(() => {
    if (isPaymentProgressModalOpen || isPaymentCompleteModalOpen) {
      window.scrollTo({ top: 0 });
    }
  }, [isPaymentProgressModalOpen, isPaymentCompleteModalOpen]);

  // 정산 완료 모달이 닫힐 때 새로고침
  useEffect(() => {
    if (prevModalState && !isPaymentCompleteModalOpen) {
      // 이전에 모달이 열려있었고, 지금 닫혔을 때만 새로고침
      window.location.reload();
    }
    setPrevModalState(isPaymentCompleteModalOpen);
  }, [isPaymentCompleteModalOpen, prevModalState]);

  useEffect(() => {
    if (filter === "all") {
      axiosInstance
        .get("/bd/api/payments?all=true")
        .then((res) => {
          console.log(res.data);
          setPaymentList(res.data.data.content);
          setCurrentPage(1);
          setTotalPages(res.data.data.totalPages);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      axiosInstance
        .get(`/bd/api/payments?status=${filter}`)
        .then((res) => {
          console.log(res.data);
          setPaymentList(res.data.data.content);
          setCurrentPage(1);
          setTotalPages(res.data.data.totalPages);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [filter]);

  return (
    <div className={styles.container}>
      <div className={styles.contentContainer}>
        <Header />
        <div className={styles.titleContainer}>
          <h1 className={styles.subtitle}>
            <span className={styles.highlight}>결제 및 정산</span> 관리하기
          </h1>
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
          <div className={styles.description}>비디가 기다리고 있어요!</div>
        </div>
        <div className={styles.listWrap}>
          {paymentList.map((item) => (
            <PaymentListItem
              key={item.paymentId}
              item={item}
              setIsPaymentProgressModalOpen={setIsPaymentProgressModalOpen}
              setSelectedItem={setSelectedItem}
            />
          ))}
        </div>
        <div className={styles.paginationContainer}>
          <Pagination
            redCurrentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        </div>
      </div>

      {isPaymentProgressModalOpen && (
        <div className={styles.paymentProgressModal}>
          <PaymentProgressModal
            setIsPaymentProgressModalOpen={setIsPaymentProgressModalOpen}
            setIsPaymentCompleteModalOpen={setIsPaymentCompleteModalOpen}
            selectedItem={selectedItem}
          />
        </div>
      )}

      {isPaymentCompleteModalOpen && (
        <div className={styles.paymentCompleteModal}>
          <PaymentCompleteModal
            setIsPaymentCompleteModalOpen={setIsPaymentCompleteModalOpen}
            selectedItem={selectedItem}
          />
        </div>
      )}
    </div>
  );
};

export default PaymentManagePage;
