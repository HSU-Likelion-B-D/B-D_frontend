import styles from "@/styles/pages/BusinessMatchingPage.module.scss";
import Header from "@/components/InfluencerMainPage/Header";
import BusinessItem from "@/components/BusinessMatchingPage/BusinessItem";
import ProposalModal from "@/components/BusinessMatchingPage/ProposalModal";
import { useState, useEffect } from "react";
import axiosInstance from "@/apis/axiosInstance";
import { useNavigate } from "react-router-dom";
export default function BusinessMatchingPage() {
  const [isProposalModalOpen, setIsProposalModalOpen] = useState(false);
  const [recommendations, setRecommendations] = useState([]);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const proposalId = sessionStorage.getItem("proposalId");
  const navigate = useNavigate();
  // 모달이 열릴 때 스크롤을 최상단으로 이동
  useEffect(() => {
    if (isProposalModalOpen) {
      window.scrollTo({ top: 0 });
    }
  }, [isProposalModalOpen]);
  const fetchRecommendations = async () => {
    try {
      const res = await axiosInstance.get(
        "/bd/api/influencer/me/recommendations"
      );
      setRecommendations(res.data.data);
      console.log(res.data.data);
    } catch (error) {
      console.error("추천 데이터 가져오기 실패:", error);
    }
  };

  useEffect(() => {
    fetchRecommendations();
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <Header />
        <div className={styles.topContainer}>
          <button
            className={styles.myProposalButton}
            onClick={() => navigate("/influencer-create-proposal")}
          >
            제안서 확인
          </button>
          <div className={styles.titleContainer}>
            <div className={styles.title}>
              <span>가게 </span>매칭하기
            </div>
            <div className={styles.subtitle}>당신을 기다리고 있어요!</div>
          </div>

          <button
            className={styles.refreshButton}
            disabled={isRefreshing}
            onClick={async () => {
              if (!isRefreshing) {
                setIsRefreshing(true);
                await fetchRecommendations();
                setIsRefreshing(false);
              }
            }}
          >
            새로고침
          </button>
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
              recommendation={recommendation}
              imgUrl={recommendation.imgUrl}
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
