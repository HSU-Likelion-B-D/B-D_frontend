import { useState, useEffect } from "react";
import axiosInstance from "@/apis/axiosInstance";
import styles from "@/styles/components/InfluencerMainPage/CampaignManagement.module.scss";
import { hamburger_icon, star_icon_red, busy_dilly_together } from "@/assets";
import CampaignItem from "./CampaignItem";
import CampaignModal from "./CampaignModal";

export default function CampaignManagement() {
  const [isCampaignModalOpen, setIsCampaignModalOpen] = useState(false);
  const [campaignList, setCampaignList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null); // 에러 상태 추가
  const [selectedState, setSelectedState] = useState("all");

  // 캠페인 데이터를 가져오는 함수
  useEffect(() => {
    setLoading(true);
    setError(null); // API 요청 시작 시 에러 상태 초기화

    const endpoint =
      selectedState === "all"
        ? "/bd/api/campaigns?all=true"
        : `/bd/api/campaigns?state=${selectedState}`;

    axiosInstance
      .get(endpoint)
      .then((response) => {
        if (response.data.isSuccess && response.data.data) {
          setCampaignList(response.data.data.content);
          console.log("캠페인 데이터:", response.data.data.content);
        } else {
          // isSuccess가 false이거나 data가 없는 경우 에러 처리
          setError(
            response.data.message || "캠페인 데이터를 가져오지 못했습니다."
          );
          setCampaignList([]); // 데이터를 비워줌
        }
      })
      .catch((err) => {
        // 네트워크 에러 등 axios 요청 자체가 실패한 경우
        console.error("API 요청 중 오류 발생:", err);
        setError("데이터를 불러오는 중 오류가 발생했습니다.");
        setCampaignList([]); // 데이터를 비워줌
      })
      .finally(() => {
        setLoading(false);
      });
  }, [selectedState]); // selectedState가 변경될 때마다 재호출

  const handleStateChange = (state) => {
    setSelectedState(state);
    setIsCampaignModalOpen(false);
  };

  // 콘텐츠 렌더링 로직을 함수로 분리하여 가독성 향상
  const renderContent = () => {
    if (loading) {
      return <div>로딩 중...</div>;
    }
    if (error) {
      return <div>{error}</div>; // 에러 메시지 표시
    }
    if (campaignList.length === 0) {
      return (
        <img
          src={busy_dilly_together}
          className={styles.campaignImage}
          alt="No campaigns"
        />
      );
    }
    return campaignList.map((campaign) => (
      // campaign.id와 같이 고유한 값을 key로 사용하는 것을 권장
      <CampaignItem
        key={campaign.id} // 혹은 campaign.id 같은 고유 ID
        title={campaign.title}
        money={`${campaign.offerBudget}원`}
        date={`${campaign.startDate}~${campaign.endDate}`}
        status={campaign.status}
      />
    ));
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.headerLeft}>
          <div className={styles.headerLeftTitle}>
            <span>캠페인 </span>관리
            <img src={star_icon_red} alt="star_icon" />
          </div>
          <div className={styles.headerLeftSubtitle}>
            현재 캠페인{" "}
            {campaignList.length === 0 ? (
              <span style={{ color: "#FF4242" }}>휴식중</span>
            ) : (
              <span>진행중</span>
            )}
            이에요!
          </div>
        </div>
        <div className={styles.headerRight}>
          <img
            src={hamburger_icon}
            alt="hamburger"
            onClick={() => setIsCampaignModalOpen(!isCampaignModalOpen)}
          />
          {isCampaignModalOpen && (
            <CampaignModal onStateChange={handleStateChange} />
          )}
        </div>
      </div>
      <div className={styles.content}>{renderContent()}</div>
    </div>
  );
}
