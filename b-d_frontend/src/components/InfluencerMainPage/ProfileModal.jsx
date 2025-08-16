import styles from "@/styles/components/MainPage/ProfileModal.module.scss";

export default function ProfileModal() {
  return (
    <div className={styles.container}>
      <div className={styles.contents}>
        <div className={styles.customerService}>고객센터</div>
        <div className={styles.logout}>로그아웃</div>
      </div>
    </div>
  );
}
