import styles from "@/styles/components/MainPage/MatchingList.module.scss";
import MatchingItem from "./MatchingItem";
import { busy_left } from "@/assets";
import { useNavigate } from "react-router-dom";
export default function MatchingList() {
  const navigate = useNavigate();
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
      <div className={styles.buttonContainer}>
        <img src={busy_left} className={styles.busyLeft} />
        <button
          className={styles.seemoreButton}
          onClick={() => navigate("/influencer-matching")}
        >
          자세히 보러가기
        </button>
      </div>
    </div>
  );
}
