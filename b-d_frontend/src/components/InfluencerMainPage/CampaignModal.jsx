import styles from "@/styles/components/MainPage/CampaignModal.module.scss";
import { useState } from "react";

export default function CampaignModal({ onStateChange }) {
  const menuItems = [
    { label: "모두보기", value: "all" },
    { label: "대기중", value: "WAITING" },
    { label: "제안 받은", value: "PROPOSED" },
    { label: "확정 및 진행중", value: "CONFIRMED_IN_PROGRESS" },
    { label: "완료", value: "COMPLETED" },
    { label: "취소", value: "CANCELED" },
    { label: "입금 대기", value: "PAYMENT_PENDING" },
  ];
  const [selectedItem, setSelectedItem] = useState(menuItems[0].value);

  return (
    <div className={styles.container}>
      <div className={styles.contents}>
        {menuItems.map((item, index) => (
          <div
            key={index}
            className={`${styles.item} ${
              selectedItem === item.value ? styles.active : ""
            }`}
            onClick={() => {
              setSelectedItem(item.value);
              onStateChange(item.value); // 상태 변경 트리거
            }}
          >
            {item.label}
          </div>
        ))}
      </div>
    </div>
  );
}
