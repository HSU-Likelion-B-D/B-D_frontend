import styles from "@/styles/components/InfluencerMainPage/MatchingList.module.scss";
import MatchingItem from "./MatchingItem";
import { dilly_right } from "@/assets";
export default function MatchingList() {
  return (
    <div className={styles.container}>
      <div className={styles.title}>
        <span>가게 </span>매칭하기
      </div>
      <div className={styles.subTitle}>당신을 기다리고 있어요!</div>
      <div className={styles.matchingListContainer}>
        <MatchingItem />
        <MatchingItem />
        <MatchingItem />
        <MatchingItem />
      </div>
      <div className={styles.buttonContainer}>
        <img src={dilly_right} className={styles.busyLeft} />
        <button className={styles.seemoreButton}>자세히 보러가기</button>
      </div>
    </div>
  );
}
