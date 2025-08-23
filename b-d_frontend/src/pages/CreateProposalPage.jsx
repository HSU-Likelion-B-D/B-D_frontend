import React, { useEffect, useState } from "react";
import styles from "@/styles/pages/CreateProposalPage.module.scss";
import Header from "@/components/MainPage/Header";
import { useForm } from "react-hook-form";
import { main_busy } from "@/assets";
import { useNavigate } from "react-router-dom";
import axiosInstance from "@/apis/axiosInstance";
import KakaoMap from "@/components/BusinessMyPage/KakaoMap";

export default function CreateProposalPage() {
  const navigate = useNavigate();
  const { register, handleSubmit, watch, setValue } = useForm({
    mode: "onChange",
  });
  const [proposalData, setProposalData] = useState({
    workPlaceName: "",
    introduction: "",
    name: "",
    title: "",
    offerBudget: 0,
    startDate: "",
    endDate: "",
    overView: "",
    request: "",
    contentTopic: "",
  });

  const onSubmit = (data) => {
    // form 데이터를 API 형식에 맞게 변환
    const apiData = {
      title: data.proposalTitle,
      offerBudget: data.minAmount,
      startDate: `${data.startYear}-${data.startMonth}-${data.startDay}`,
      endDate: `${data.endYear}-${data.endMonth}-${data.endDay}`,
      overView: data.proposalContent || "",
      request: data.proposalRequest || "",
    };

    axiosInstance
      .post("/bd/api/proposal/write", apiData)
      .then((res) => {
        if (res.data.isSuccess) {
          navigate("/");
          // 서버 응답에서 proposalId 추출하여 세션스토리지에 저장
          const proposalId = res.data.data.proposalId;
          sessionStorage.setItem("proposalId", proposalId);
        }
      })
      .catch((err) => {
        console.log("API 오류:", err);
      });
  };

  // 필수 필드들의 값을 모니터링
  const watchedFields = watch([
    "proposalTitle",
    "proposerName",
    "storeLocation",
    "minAmount",
    "startYear",
    "startMonth",
    "startDay",
    "endYear",
    "endMonth",
    "endDay",
    "proposalContent",
    "proposalRequest",
    "agreement",
  ]);
  useEffect(() => {
    axiosInstance
      .get("/bd/api/proposal/write")
      .then((res) => {
        if (res.data.isSuccess) {
          // existInfo와 defaultInfo를 올바르게 병합
          const existInfo = res.data.data.existInfo || {};
          const defaultInfo = res.data.data.defaultInfo || {};

          // 두 객체를 병합 (defaultInfo가 우선)
          const mergedData = { ...existInfo, ...defaultInfo };

          // form 필드에 값 설정
          if (mergedData.title) setValue("proposalTitle", mergedData.title);
          if (mergedData.name) setValue("proposerName", mergedData.name);
          if (mergedData.workPlaceAddress)
            setValue("storeLocation", mergedData.workPlaceAddress);
          if (mergedData.offerBudget)
            setValue("minAmount", mergedData.offerBudget);
          if (mergedData.startDate) {
            const [year, month, day] = mergedData.startDate.split("-");
            setValue("startYear", parseInt(year));
            setValue("startMonth", parseInt(month));
            setValue("startDay", parseInt(day));
          }
          if (mergedData.endDate) {
            const [year, month, day] = mergedData.endDate.split("-");
            setValue("endYear", parseInt(year));
            setValue("endMonth", parseInt(month));
            setValue("endDay", parseInt(day));
          }
          if (mergedData.overView)
            setValue("proposalContent", mergedData.overView);
          if (mergedData.request)
            setValue("proposalRequest", mergedData.request);

          setProposalData(mergedData);
        }
      })
      .catch((err) => {
        console.log("API 오류:", err);
      });
  }, [setValue]);

  // 모든 필수 필드가 채워졌는지 확인
  const isFormValid = watchedFields.every((field, index) => {
    const fieldNames = [
      "proposalTitle",
      "proposerName",
      "storeLocation",
      "minAmount",
      "startYear",
      "startMonth",
      "startDay",
      "endYear",
      "endMonth",
      "endDay",
      "proposalContent",
      "proposalRequest",
      "agreement",
    ];

    // agreement는 체크박스이므로 boolean 값 확인
    if (fieldNames[index] === "agreement") {
      return field === true;
    }

    // 숫자 필드들은 0이 아닌 값 확인
    if (
      [
        "startYear",
        "startMonth",
        "startDay",
        "endYear",
        "endMonth",
        "endDay",
        "minAmount",
      ].includes(fieldNames[index])
    ) {
      return field !== undefined && field !== null && field !== "";
    }

    // 문자열 필드들은 빈 문자열이 아닌지 확인
    return field && field.toString().trim() !== "";
  });
  return (
    <div className={styles.container}>
      <div className={styles.headerContainer}>
        <Header isCreateProposalPage={true} />
      </div>
      <div className={styles.titleContainer}>
        <img src={main_busy} className={styles.main_busy} />
        <div className={styles.title}>제안서 작성</div>
      </div>
      <div className={styles.content}>
        <div className={styles.storeContainer}>
          <div className={styles.storeName}>
            {proposalData.workPlaceName || "가게 이름"}
          </div>
          <div className={styles.storeDescription}>
            {proposalData.introduction || "가게 소개"}
          </div>
        </div>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className={styles.formContainer}
        >
          <div className={styles.proposalTitle}>
            <div className={styles.proposalTitleLeft}>
              <input
                type="text"
                placeholder="제안서 제목을 입력해주세요."
                maxLength={20}
                {...register("proposalTitle", {
                  required: "제안서 제목을 입력해주세요",
                  maxLength: {
                    value: 20,
                  },
                })}
              />
            </div>
            <div className={styles.proposalTitleRight}>
              <input
                type="text"
                placeholder="제안자 명"
                value={proposalData.name || ""}
                {...register("proposerName", {
                  required: "제안자 명을 입력해주세요",
                })}
              />
            </div>
          </div>
          <div className={styles.proposalLocation}>
            <input
              type="text"
              placeholder="가게의 위치를 입력해주세요."
              value={proposalData.workPlaceAddress || ""}
              {...register("storeLocation", {
                required: "가게의 위치를 입력해주세요",
              })}
            />
          </div>
          <div className={styles.mapContainer}>
            <KakaoMap address={proposalData.workPlaceAddress} />
          </div>
          <div className={styles.proposalMoney}>
            <div className={styles.proposalMoneyLeft}>
              <input
                type="number"
                placeholder="금액 제안"
                {...register("minAmount", {
                  required: "금액을 입력해주세요",
                  min: {
                    value: 1,
                    message: "금액은 1원 이상이어야 합니다",
                  },
                })}
              />
            </div>
          </div>
          <div className={styles.proposalDate}>
            <input
              type="number"
              placeholder=""
              className={styles.proposalDateYear}
              {...register("startYear", {
                required: "시작 연도를 입력해주세요",
                min: {
                  value: 2025,
                  message: "2025년 이후로 입력해주세요",
                },
              })}
            />
            년
            <input
              type="number"
              placeholder=""
              className={styles.proposalDateMonth}
              {...register("startMonth", {
                required: "시작 월을 입력해주세요",
                min: { value: 1, message: "1월 이상 입력해주세요" },
                max: { value: 12, message: "12월 이하로 입력해주세요" },
              })}
            />
            월
            <input
              type="number"
              placeholder=""
              className={styles.proposalDateDay}
              {...register("startDay", {
                required: "시작 일을 입력해주세요",
                min: { value: 1, message: "1일 이상 입력해주세요" },
                max: { value: 31, message: "31일 이하로 입력해주세요" },
              })}
            />
            일<div className={styles.proposalDateSeparator}>~</div>
            <input
              type="number"
              placeholder=""
              className={styles.proposalDateYear}
              {...register("endYear", {
                required: "종료 연도를 입력해주세요",
                min: {
                  value: 2025,
                  message: "2025년 이후로 입력해주세요",
                },
              })}
            />
            년
            <input
              type="number"
              placeholder=""
              className={styles.proposalDateMonth}
              {...register("endMonth", {
                required: "종료 월을 입력해주세요",
                min: { value: 1, message: "1월 이상 입력해주세요" },
                max: { value: 12, message: "12월 이하로 입력해주세요" },
              })}
            />
            월
            <input
              type="number"
              placeholder=""
              className={styles.proposalDateDay}
              {...register("endDay", {
                required: "종료 일을 입력해주세요",
                min: { value: 1, message: "1일 이상 입력해주세요" },
                max: { value: 31, message: "31일 이하로 입력해주세요" },
              })}
            />
            일
          </div>
          <div className={styles.proposalContent}>
            <textarea
              placeholder="제안 개요를 작성해주세요."
              {...register("proposalContent", {
                required: "제안 개요를 입력해주세요",
              })}
            />
          </div>
          <div className={styles.proposalRequest}>
            <textarea
              placeholder="요청사항을 자유롭게 적어주세요."
              {...register("proposalRequest", {
                required: "요청사항을 입력해주세요",
              })}
            />
          </div>
          <div className={styles.proposalAgreement}>
            <span className={styles.red}>
              광고주(자영업자)는 캠페인 확정 시 금액의 100%를 선결제한다. /
              인플루언서는 광고 이행 후 정산액을 받을 수 있다.
            </span>
            <br />
            (업로드 된 광고 콘텐츠는 최소 30일간 삭제 없이 유지해야 한다. 삭제
            또는 수정 시 위약금이 발생할 수 있다.)
            <br />
            인플루언서는 제안된 타깃(연령, 지역 등)에 맞는 콘텐츠 스타일을
            유지해야 한다.{" "}
            <span className={styles.gray}>
              불일치 시 캠페인 종료 후 정산이 거절될 수 있다.
            </span>
            <br />
            광고주(자영업자)는 입금액의 10%를 수수료(정산 보증, 자동 계약서)로
            부과한다. / 인플루언서는 정산액의 8%를 수수료(정산액에서 자동으로
            차감)로 부과한다.
            <br />
            광고주(자영업자)는 캠페인 확정 후 광고 실행 전 취소 시
            위약금(정산금의 30%)를 인플루언서에게 지불한다. (위약금의 수수료
            10%는 플랫폼에서 가져간다.) <br />
            인플루언서는 일정 내 광고 미이행시 자영업자가 낸 금액은 전액
            환불되며, 인플루언서는 위약금(정산금의 50%)을 광고주에게 지불한다.
            (위약금의 수수료 10%는 플랫폼에서 가져간다.) <br />
            단, 불가항력의 사유(질병, 사고 등)는 증빙 제출 면제. 3회 이상 반복
            위약자는 자동 정지된다.
            <br />
            <span className={styles.gray}>
              캠페인 진행 중 발생하는 모든 커뮤니케이션은 플랫폼 내 메세지를
              통해 진행되어야 한다.{" "}
            </span>
            (외부연락으로 인한 분쟁 발생 시, 플랫폼은 책임지지 않는다.)
            <br />
            업로드 된 콘텐츠의 2차 활용은 캠페인 시 인플루언서의 별도 동의를
            받아야 한다. 무단 활용 시 법적 책임이 발생할 수 있다. <br />
            캠페인 종료 후, 양 당사자는 서로에 대한 평가를 남기는데, 이는 공개
            프로필에 반영되며 악의적 후기는 신고 기능으로 제재될 수 있다.
          </div>
          <div className={styles.checkbox}>
            <input
              type="checkbox"
              id="proposalAgreement"
              className={styles.checkboxInput}
              {...register("agreement", {
                required: "약관에 동의해주세요",
              })}
            />
            <label htmlFor="proposalAgreement" className={styles.checkboxLabel}>
              아래 조항들을 포함한 제안서 내용을 모두 읽었습니다.
            </label>
          </div>
          <button
            type="submit"
            className={`${styles.submitButton} ${
              isFormValid ? styles.active : ""
            }`}
            disabled={!isFormValid}
          >
            저장하기
          </button>
        </form>
      </div>
    </div>
  );
}
