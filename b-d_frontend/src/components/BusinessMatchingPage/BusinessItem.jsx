import styles from "@/styles/components/BusinessMatchingPage/BusinessItem.module.scss";
import { store_img, star_icon_red } from "@/assets";

export default function BusinessItem({ setIsProposalModalOpen }) {
  return (
    <div className={styles.container}>
      <div className={styles.info}>
        <img src={store_img} className={styles.profileImage} />
        <div className={styles.title}>
          <div className={styles.nameContainer}>
            <div className={styles.name}>아기사자</div>
            <img src={star_icon_red} className={styles.starIcon} />
            <div className={styles.starNumber}>
              3.0 <span className={styles.starCount}>(332)</span>
            </div>
          </div>
          <div className={styles.description}>
            음식,음료 / 10대,힙한,단체 / 300,000 / 부산
          </div>
        </div>
      </div>
      <button
        className={styles.proposalButton}
        onClick={() => setIsProposalModalOpen(true)}
      >
        제안서 보내기
      </button>
    </div>
  );
}
