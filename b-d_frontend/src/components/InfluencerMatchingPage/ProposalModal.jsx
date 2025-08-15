import styles from "@/styles/components/InfluencerMatchingPage/ProposalModal.module.scss";
import { useEffect } from "react";
import { store_img } from "@/assets";

export default function ProposalModal({ setIsProposalModalOpen }) {
  useEffect(() => {
    // 모달이 열릴 때 body 스크롤 차단
    document.body.style.overflow = "hidden";

    // 모달이 닫힐 때 body 스크롤 복원
    return () => {
      document.body.style.overflow = "unset";
    };
  }, []);
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.title}>멋사TV님께 제안서를 보낼까요?</div>
        <div className={styles.subTitle}>멋진 결과물을 기대하고 있을게요!</div>
        <img src={store_img} className={styles.influencerImg} />
        <div className={styles.name}>멋사TV( 아기사자 )</div>
        <div className={styles.description}>유튜브 30초 숏폼 구합니다.</div>
        <div className={styles.buttonContainer}>
          <button
            className={styles.cancelButton}
            onClick={() => setIsProposalModalOpen(false)}
          >
            취소
          </button>
          <button
            className={styles.sendButton}
            onClick={() => setIsProposalModalOpen(false)}
          >
            보내기
          </button>
        </div>
      </div>
    </div>
  );
}
