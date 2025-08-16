import styles from "@/styles/pages/BusinessMatchingPage.module.scss";
import Header from "@/components/InfluencerMainPage/Header";
import BusinessItem from "@/components/BusinessMatchingPage/BusinessItem";
import ProposalModal from "@/components/BusinessMatchingPage/ProposalModal";
import { useState, useEffect } from "react";

export default function BusinessMatchingPage() {
  const [isProposalModalOpen, setIsProposalModalOpen] = useState(false);

  // 모달이 열릴 때 스크롤을 최상단으로 이동
  useEffect(() => {
    if (isProposalModalOpen) {
      window.scrollTo({ top: 0 });
    }
  }, [isProposalModalOpen]);

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
              <span>자영업자 </span>매칭하기
            </div>
            <div className={styles.subtitle}>당신을 기다리고 있어요!</div>
          </div>

          <button className={styles.refreshButton}>새로고침</button>
        </div>
        <div className={styles.description}>
          *블로그는 투데이 수치로 기록됩니다.
        </div>
        <div className={styles.influencerList}>
          <BusinessItem setIsProposalModalOpen={setIsProposalModalOpen} />
          <BusinessItem setIsProposalModalOpen={setIsProposalModalOpen} />
          <BusinessItem setIsProposalModalOpen={setIsProposalModalOpen} />
          <BusinessItem setIsProposalModalOpen={setIsProposalModalOpen} />
          <BusinessItem setIsProposalModalOpen={setIsProposalModalOpen} />
          <BusinessItem setIsProposalModalOpen={setIsProposalModalOpen} />
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
