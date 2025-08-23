import styles from "@/styles/components/InfluencerMainPage/MatchingList.module.scss";
import MatchingItem from "./MatchingItem";
import { dilly_right } from "@/assets";
import { useNavigate } from "react-router-dom";
export default function MatchingList({ businessList }) {
  const navigate = useNavigate();

  return (
    <div className={styles.container}>
      <div className={styles.title}>
        <span>가게 </span>매칭하기
      </div>
      <div className={styles.subTitle}>당신을 기다리고 있어요!</div>
      <div className={styles.matchingListContainer}>
        {businessList && businessList.length > 0 ? (
          businessList
            .slice(0, 4)
            .map((business) => (
              <MatchingItem key={business.businessManId} business={business} />
            ))
        ) : (
          <div className={styles.emptyMessage}>
            현재 매칭 가능한 가게가 없습니다.
          </div>
        )}
      </div>
      <div className={styles.buttonContainer}>
        <img src={dilly_right} className={styles.busyLeft} />
        <button
          className={styles.seemoreButton}
          onClick={() => {
            navigate("/business-matching");
          }}
        >
          자세히 보러가기
        </button>
      </div>
    </div>
  );
}
