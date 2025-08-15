import React from "react";
import styles from "../../styles/components/PaymentManagePage/PaymentListItem.module.scss";

/**
 * PaymentListItem: 결제/정산 리스트의 한 줄을 재사용 가능한 컴포넌트로 분리
 * props:
 * - imgSrc: 프로필 이미지 URL
 * - title: 캠페인 제목
 * - desc: 상세 설명(요청 금액, 수수료 등)
 * - price: 실 납부금액(강조)
 * - period: 기간
 * - status: 상태 텍스트
 * - statusColor: 상태 텍스트 색상
 * - dDay: D-day 텍스트(선택)
 * - dDayColor: D-day 색상(선택)
 * - onClick: 클릭 이벤트(선택)
 */
const PaymentListItem = ({
  imgSrc,
  title,
  desc,
  price,
  period,
  status,
  statusColor = "#888",
  dDay,
  dDayColor = "#e53935",
  onClick,
}) => (
  <div className={styles.listItem} onClick={onClick}>
    <img src={imgSrc} alt="프로필" className={styles.profileImg} />
    <div className={styles.itemContent}>
      <div className={styles.itemTitle}>{title}</div>
      <div className={styles.itemDesc}>
        {desc} <span className={styles.itemPrice}>{price}</span> / {period}
      </div>
    </div>
    <div className={styles.itemStatusWrap}>
      <div className={styles.itemStatus} style={{ color: statusColor }}>
        {status} <span className={styles.statusDot} />
      </div>
      {dDay && (
        <div className={styles.dDay} style={{ color: dDayColor }}>
          {dDay}
        </div>
      )}
    </div>
  </div>
);

export default PaymentListItem;
