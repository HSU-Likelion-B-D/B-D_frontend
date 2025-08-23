import styles from "@/styles/pages/BusinessMatchingPage.module.scss";
import Header from "@/components/InfluencerMainPage/Header";
import BusinessItem from "@/components/BusinessMatchingPage/BusinessItem";
import ProposalModal from "@/components/BusinessMatchingPage/ProposalModal";
import { useState, useEffect } from "react";
import axiosInstance from "@/apis/axiosInstance";
export default function BusinessMatchingPage() {
  const [isProposalModalOpen, setIsProposalModalOpen] = useState(false);
  const [recommendations, setRecommendations] = useState([]);
  const proposalId = sessionStorage.getItem("proposalId");
  const recipientId = 1; // recommend에서 추천 리스트 받고 거기서 userId 받아야 함

  // 모달이 열릴 때 스크롤을 최상단으로 이동
  useEffect(() => {
    if (isProposalModalOpen) {
      window.scrollTo({ top: 0 });
    }
  }, [isProposalModalOpen]);
  useEffect(() => {
    axiosInstance.get("/bd/api/influencer/me/recommendations").then((res) => {
      setRecommendations(res.data.data);
      console.log(res.data.data);
    });
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <Header />
        <div className={styles.topContainer}>
          <button className={styles.myProposalButton}>
            내 제안서 확인하기
          </button>
          <div className={styles.titleContainer}>
            <div className={styles.title}>
              <span>가게 </span>매칭하기
            </div>
            <div className={styles.subtitle}>당신을 기다리고 있어요!</div>
          </div>

          <button className={styles.refreshButton}>새로고침</button>
        </div>
        <div className={styles.description}>
          *블로그는 투데이 수치로 기록됩니다.
        </div>
        <div className={styles.influencerList}>
          {recommendations.map((recommendation, index) => (
            <BusinessItem
              key={recommendation.id || index}
              setIsProposalModalOpen={setIsProposalModalOpen}
              proposalId={proposalId}
              recipientId={recipientId}
              recommendation={recommendation}
            />
          ))}
        </div>
      </div>
      {isProposalModalOpen && (
        <div className={styles.proposalModal}>
          <ProposalModal setIsProposalModalOpen={setIsProposalModalOpen} />
        </div>
      )}
    </div>
  );
}
