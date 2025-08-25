import styles from "@/styles/components/MainPage/CampaignItem.module.scss";
import { profile_img } from "@/assets";
import axiosInstance from "@/apis/axiosInstance";
export default function CampaignItem({
  campaignId,
  title,
  money,
  date,
  status,
  imgUrl,
}) {
  const handleResponse = (response) => {
    console.log("캠페인 Id", campaignId);
    axiosInstance
      .patch(
        "/bd/api/campaigns",
        {
          campaignId: campaignId,
          response: response, // "yes" 또는 "no"
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`, // 토큰을 Authorization 헤더에 추가
          },
        }
      )
      .then((result) => {
        if (result.data.isSuccess) {
          console.log("캠페인 상태 변경 성공:", result.data);
          console.log(`캠페인 ${response === "yes" ? "수락" : "거절"} 완료`);
          window.scrollTo({ top: 0 }); //새로고침
        } else {
          console.error("캠페인 상태 변경 실패:", result.data);
          console.log("캠페인 상태 변경에 실패했습니다.");
        }
      })
      .catch((error) => {
        console.error("API 요청 중 오류 발생:", error);
        console.log("캠페인 상태 변경 중 오류가 발생했습니다.");
      });
  };

  return (
    <div className={styles.container}>
      <img src={imgUrl || profile_img} className={styles.profileImg} />
      <div className={styles.contentContainer}>
        <div className={styles.content}>
          <div className={styles.title}>{title}</div>
          <div className={styles.subTitle}>
            <span className={styles.money}>{money}</span> /{" "}
            <span className={styles.date}>{date}</span>
          </div>
        </div>
        <div className={styles.status}>
          {status === "제안 받음" ? (
            <div className={styles.buttonsWithCircle}>
              <div className={styles.buttons}>
                <button
                  className={styles.acceptButton}
                  onClick={() => {
                    handleResponse("yes");
                    window.location.reload();
                  }}
                >
                  수락
                </button>
                <button
                  className={styles.rejectButton}
                  onClick={() => {
                    handleResponse("no");
                    window.location.reload();
                  }}
                >
                  거절
                </button>
              </div>

              <div className={styles.yellowCircle} />
            </div>
          ) : (
            <>
              {status}
              <div className={styles.circle} />
            </>
          )}
        </div>
      </div>
    </div>
  );
}
