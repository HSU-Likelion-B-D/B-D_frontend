import styles from "@/styles/components/InfluencerMatchingPage/InfluencerItem.module.scss";
import { main_dilly, star_icon } from "@/assets";
import axiosInstance from "@/apis/axiosInstance";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function InfluencerItem({
  setIsProposalModalOpen,
  proposalId, // InfluencerMatchingPage에서 전달
  recommendation, // InfluencerMatchingPage에서 전달
  setSelectedItem,
}) {
  const [loading, setLoading] = useState(false);
  const recipientId = recommendation.userId;
  const navigate = useNavigate();
  const handleSendProposal = () => {
    if (loading) return;

    // 필수값 체크
    if (!proposalId || !recipientId) {
      alert("제안서를 작성해주세요.");
      navigate("/create-proposal");
      return;
    }

    const token = localStorage.getItem("accessToken");
    if (!token) {
      alert("로그인이 필요합니다. 다시 로그인해주세요.");
      navigate("/login");
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
          setSelectedItem(recommendation);
        } else {
          // 성공 플래그 false
          throw new Error(res?.data?.message || "캠페인 생성에 실패했습니다.");
        }
      })
      .catch((error) => {
        if (error.response.status === 409) {
          alert(error.response.data.message);
        } else {
          alert("제안서가 필요합니다. 제안서를 저장해주세요.");
          navigate("/create-proposal");
        }
      })
      .finally(() => setLoading(false));
  };

  return (
    <div className={styles.container}>
      <div className={styles.info}>
        <img
          src={recommendation.imgUrl || main_dilly}
          className={styles.profileImage}
        />
        <div className={styles.title}>
          <div className={styles.nameContainer}>
            <div className={styles.name}>{recommendation.nickname}</div>
            <img src={star_icon} className={styles.starIcon} />
            <div className={styles.starNumber}>
              {recommendation.avgScore}{" "}
              <span className={styles.starCount}>
                ({recommendation.reviewCount})
              </span>
            </div>
          </div>
          <div className={styles.description}>
            {recommendation.platform.map((platform) => platform).join(",")} /{" "}
            {recommendation.followerCount} / {recommendation.minBudget} /{" "}
            {recommendation.contentTopic.map((topic) => topic).join(",")}
          </div>
        </div>
      </div>
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
