import styles from "@/styles/pages/InfluencerMatchingPage.module.scss";
import Header from "@/components/MainPage/Header";
import InfluencerItem from "@/components/InfluencerMatchingPage/InfluencerItem";
import ProposalModal from "@/components/InfluencerMatchingPage/ProposalModal";
import { useState, useEffect } from "react";
import axiosInstance from "@/apis/axiosInstance";

export default function InfluencerMatchingPage() {
  const [isProposalModalOpen, setIsProposalModalOpen] = useState(false);
  const [recommendations, setRecommendations] = useState([]);
  //const proposalId = 3;

  const proposalId = sessionStorage.getItem("proposalId"); // createproposal 할때 저장함

  // 모달이 열릴 때 스크롤을 최상단으로 이동
  useEffect(() => {
    if (isProposalModalOpen) {
      window.scrollTo({ top: 0 });
    }
  }, [isProposalModalOpen]);

  useEffect(() => {
    axiosInstance.get("/bd/api/businessman/me/recommendations").then((res) => {
      setRecommendations(res.data.data);
      console.log(res.data);
    });
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <Header />
        <div className={styles.topContainer}>
          <button className={styles.myProposalButton}>제안서 확인</button>
          <div className={styles.titleContainer}>
            <div className={styles.title}>
              <span>인플루언서 </span>매칭하기
            </div>
            <div className={styles.subtitle}>사장님을 기다리고 있어요!</div>
          </div>

          <button className={styles.refreshButton}>새로고침</button>
        </div>

        <div className={styles.description}>
          *블로그는 투데이 수치로 기록됩니다.
        </div>

        {/* ✅ 각 아이템에 recipientId와 proposalId 전달 */}
        <div className={styles.influencerList}>
          {recommendations.map((recommendation, index) => (
            <InfluencerItem
              key={recommendation.id || index}
              setIsProposalModalOpen={setIsProposalModalOpen}
              proposalId={proposalId}
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
