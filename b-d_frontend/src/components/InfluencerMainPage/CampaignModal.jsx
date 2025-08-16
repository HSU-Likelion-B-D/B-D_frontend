import styles from "@/styles/components/MainPage/CampaignModal.module.scss";
import { useState } from "react";

export default function ProfileModal() {
  const menuItems = [
    "모두보기",
    "대기중",
    "제안 받은",
    "확정 및 진행중",
    "완료",
    "취소",
    "입금 대기",
  ];
  const [selectedItem, setSelectedItem] = useState(menuItems[0]);

  return (
    <div className={styles.container}>
      <div className={styles.contents}>
        {menuItems.map((item, index) => (
          <div
            key={index}
            className={`${styles.item} ${
              selectedItem === item ? styles.active : ""
            }`}
            onClick={() => setSelectedItem(item)}
          >
            {item}
          </div>
        ))}
      </div>
    </div>
  );
}
