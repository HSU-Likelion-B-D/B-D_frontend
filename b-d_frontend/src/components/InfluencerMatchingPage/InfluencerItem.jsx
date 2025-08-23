import styles from "@/styles/components/InfluencerMatchingPage/InfluencerItem.module.scss";
import { store_img, star_icon } from "@/assets";
import axiosInstance from "@/apis/axiosInstance";
import { useState } from "react";

export default function InfluencerItem({
  setIsProposalModalOpen,
  proposalId, // InfluencerMatchingPage에서 전달
  recipientId, // InfluencerMatchingPage에서 전달
}) {
  const [loading, setLoading] = useState(false);

  const handleSendProposal = () => {
    if (loading) return;

    // 필수값 체크
    if (!proposalId || !recipientId) {
      console.log("proposalId 또는 recipientId가 없습니다.");
      return;
    }

    const token = localStorage.getItem("accessToken");
    if (!token) {
      console.log("로그인이 필요합니다. 다시 로그인해주세요.");
      return;
    }

    const headers = { Authorization: `Bearer ${token}` }; // Authorization 헤더 설정
    const body = {
      proposalId: Number(proposalId), // 제안서 ID
      recipientId: Number(recipientId), // 받는 사람 ID
    };

    setLoading(true);

    axiosInstance
      .post("/bd/api/campaigns", body, { headers }) // 요청 바디와 헤더 전달
      .then((res) => {
        console.log("제안서 전송 응답:", res);
        const { isSuccess, message } = res?.data ?? {};

        if (isSuccess) {
          console.log(message || "제안서 전송에 성공했습니다.");
          // 필요 시 모달 닫기
          if (setIsProposalModalOpen) setIsProposalModalOpen(true);
        } else {
          // 성공 플래그 false
          throw new Error(res?.data?.message || "캠페인 생성에 실패했습니다.");
        }
      })
      .catch((error) => {
        console.error("제안서 전송 오류:", error);
        const status = error?.response?.status;
        const msg = error?.response?.data?.message || error.message;

        // 명세의 에러 분기(404: 제안서/받는 사람 없음, 500: 서버오류 등)
        if (status === 401) {
          console.log(
            "로그인이 만료되었거나 유효하지 않습니다. 다시 로그인해주세요."
          );
        } else if (status === 404) {
          console.log(msg || "제안서 또는 받는 사람을 찾을 수 없습니다.");
        } else if (status === 500) {
          console.log(
            "내부 서버 오류가 발생했습니다. 잠시 후 다시 시도해주세요."
          );
        } else {
          console.log(msg || "요청 처리 중 문제가 발생했습니다.");
        }
      })
      .finally(() => setLoading(false));
  };

  return (
    <div className={styles.container}>
      <div className={styles.info}>
        <img src={store_img} className={styles.profileImage} />
        <div className={styles.title}>
          <div className={styles.nameContainer}>
            <div className={styles.name}>아기사자</div>
            <img src={star_icon} className={styles.starIcon} />
            <div className={styles.starNumber}>
              3.0 <span className={styles.starCount}>(332)</span>
            </div>
          </div>
          <div className={styles.description}>
            유튜브 블로그 / 20k / 300,000 / 음식,음료
          </div>
        </div>
      </div>

      {/* ✅ 통신 연결 */}
      <button
        className={styles.proposalButton}
        onClick={handleSendProposal}
        disabled={loading}
      >
        {loading ? "전송 중..." : "제안서 보내기"}
      </button>
    </div>
  );
}
