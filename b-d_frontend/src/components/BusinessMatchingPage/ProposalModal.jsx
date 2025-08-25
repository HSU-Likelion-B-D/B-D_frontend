import styles from "@/styles/components/BusinessMatchingPage/ProposalModal.module.scss";
import { useEffect } from "react";
import { busy_left } from "@/assets";

export default function ProposalModal({
  setIsProposalModalOpen,
  selectedItem,
}) {
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
        <div className={styles.title}>
          {selectedItem.nickname}님께 제안서를 보낼까요?
        </div>
        <div className={styles.subTitle}>멋진 결과물을 기대하고 있을게요!</div>
        <img
          src={selectedItem.imgUrl || busy_left}
          className={styles.influencerImg}
        />
        <div className={styles.name}>{selectedItem.workPlaceName}</div>
        <div className={styles.description}>{selectedItem.introduction}</div>
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
