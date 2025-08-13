import styles from "@/styles/components/MatchingList.module.scss";
import MatchingItem from "./MatchingItem";
export default function MatchingList() {
  return (
    <div className={styles.container}>
      <div className={styles.title}>
        <span>인플루언서 </span>매칭하기
      </div>
      <div className={styles.subTitle}>사장님을 기다리고 있어요!</div>
      <div className={styles.matchingListContainer}>
        <MatchingItem />
        <MatchingItem />
        <MatchingItem />
        <MatchingItem />
      </div>
      <button className={styles.seemoreButton}>자세히 보러가기</button>
    </div>
  );
}
