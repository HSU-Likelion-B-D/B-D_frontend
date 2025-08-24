import React from "react";
import { useState, useEffect } from "react";
import styles from "../styles/pages/InfluencerPaymentManagePage.module.scss";
import Header from "../components/InfluencerMainPage/Header";
import { hamburger_icon } from "@/assets";
import PaymentModal from "../components/InfluencerPaymentManagePage/PaymentModal";
import PaymentListItem from "../components/InfluencerPaymentManagePage/PaymentListItem";
import Pagination from "../components/PaymentManage/Pagination";
import InfluencerPaymentProgressModal from "../components/InfluencerPaymentManagePage/InfluencerPaymentProgressModal";
import InfluencerPaymentStarModal from "../components/InfluencerPaymentManagePage/InfluencerPaymentStarModal";
import axiosInstance from "@/apis/axiosInstance";

const ITEMS_PER_PAGE = 6;
const InfluencerPaymentManagePage = () => {
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
  const [bankInfo, setBankInfo] = useState(null);
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

  // 현재 페이지에 보여줄 데이터만 추출 - 6개의 데이터만
  const pagedList = paymentList.slice(
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
        .get(`/bd/api/payments?state=${filter}`)
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

  useEffect(() => {
    axiosInstance.get("/bd/api/influencer/bank").then((res) => {
      console.log(res.data);
      setBankInfo(res.data.data);
    });
  }, []);

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
          <div className={styles.description}>사장님을 기다리고 있어요!</div>
        </div>
        <div className={styles.listWrap}>
          {filteredList.map((item) => (
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
          <InfluencerPaymentProgressModal
            setIsPaymentProgressModalOpen={setIsPaymentProgressModalOpen}
            setIsPaymentCompleteModalOpen={setIsPaymentCompleteModalOpen}
            selectedItem={selectedItem}
            bankInfo={bankInfo}
          />
        </div>
      )}

      {isPaymentCompleteModalOpen && (
        <div className={styles.paymentCompleteModal}>
          <InfluencerPaymentStarModal
            setIsPaymentCompleteModalOpen={setIsPaymentCompleteModalOpen}
          />
        </div>
      )}
    </div>
  );
};

export default InfluencerPaymentManagePage;
