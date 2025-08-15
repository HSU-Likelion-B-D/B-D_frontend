import styles from "@/styles/pages/InfluencerMatchingPage.module.scss";
import Header from "@/components/MainPage/Header";

export default function InfluencerMatchingPage() {
  return (
    <div className={styles.container}>
      <Header />
      <div className={styles.topContainer}>
        <button className={styles.myProposalButton}>내 제안서 확인하기</button>
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
    </div>
  );
}
