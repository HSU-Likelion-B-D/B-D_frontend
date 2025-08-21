import styles from "@/styles/components/MainPage/ProfileModal.module.scss";
import { useNavigate } from "react-router-dom";
export default function ProfileModal() {
  const navigate = useNavigate();
  return (
    <div className={styles.container}>
      <div className={styles.contents}>
        <div className={styles.customerService}>고객센터</div>
        <div
          className={styles.logout}
          onClick={() => {
            localStorage.removeItem("accessToken");
            navigate("/login");
          }}
        >
          로그아웃
        </div>
      </div>
    </div>
  );
}
