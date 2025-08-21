import React, { useEffect, useRef, useState } from "react";

const KakaoMap = ({ address = "" }) => {
  const mapRef = useRef(null);
  const markerRef = useRef(null);
  const infowindowRef = useRef(null);
  const [mapError, setMapError] = useState(false);
  const [coordinates, setCoordinates] = useState(null);

  // 주소를 좌표로 변환하는 함수 (REST API 사용)
  const geocodeAddress = async (address) => {
    try {
      const restApiKey = import.meta.env.VITE_KAKAO_REST_API_KEY;

      if (!restApiKey) {
        throw new Error(
          "카카오 REST API 키가 설정되지 않았습니다. .env 파일에 VITE_KAKAO_REST_API_KEY를 설정해주세요."
        );
      }

      const response = await fetch(
        `https://dapi.kakao.com/v2/local/search/address.json?query=${encodeURIComponent(
          address
        )}`,
        {
          headers: {
            Authorization: `KakaoAK ${restApiKey}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      if (data.documents && data.documents.length > 0) {
        const result = data.documents[0];
        const coords = new window.kakao.maps.LatLng(
          parseFloat(result.y),
          parseFloat(result.x)
        );

        return {
          coords,
          address: result.address_name,
          roadAddress: result.road_address?.address_name || result.address_name,
        };
      } else {
        throw new Error("주소를 찾을 수 없습니다.");
      }
    } catch (error) {
      console.error("REST API 주소 검색 실패:", error);
      throw error;
    }
  };

  useEffect(() => {
    const loadKakaoMap = async () => {
      // 환경변수에서 API 키 가져오기
      const apiKey = import.meta.env.VITE_KAKAO_API_KEY || "";

      if (!apiKey) {
        console.warn(
          "카카오맵 API 키가 설정되지 않았습니다. .env 파일에 VITE_KAKAO_API_KEY를 설정해주세요."
        );
        setMapError(true);
        return;
      }

      try {
        // 이미 카카오맵이 로드되어 있는지 확인
        if (window.kakao && window.kakao.maps) {
          // autoload=false로 로드된 경우 load() 호출 필요
          if (typeof window.kakao.maps.load === "function") {
            await new Promise(window.kakao.maps.load);
          }
          // 주소를 좌표로 변환 후 맵 초기화
          await initializeMapWithAddress();
          return;
        }

        // 카카오맵 스크립트가 이미 로드 중인지 확인
        const existingScript = document.querySelector(
          'script[src*="dapi.kakao.com"]'
        );
        if (existingScript) {
          // 기존 스크립트의 로드 완료를 기다림
          await new Promise((resolve) => {
            existingScript.addEventListener("load", resolve);
          });

          // autoload=false로 로드된 경우 load() 호출
          if (typeof window.kakao.maps.load === "function") {
            await new Promise(window.kakao.maps.load);
          }

          // 주소를 좌표로 변환 후 맵 초기화
          await initializeMapWithAddress();
          return;
        }

        // autoload=false로 스크립트 로드
        const script = document.createElement("script");
        script.src = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=${apiKey}&autoload=false`;
        script.async = true;

        // 스크립트 로드 완료 대기
        await new Promise((resolve, reject) => {
          script.onload = resolve;
          script.onerror = reject;
          document.head.appendChild(script);
        });

        // autoload=false로 로드된 경우 load() 호출
        if (typeof window.kakao.maps.load === "function") {
          await new Promise(window.kakao.maps.load);
        }

        // 주소를 좌표로 변환 후 맵 초기화
        await initializeMapWithAddress();
      } catch (error) {
        console.error("카카오맵 로드 중 오류:", error);
        setMapError(true);
      }
    };

    loadKakaoMap();

    return () => {
      // 정리 작업
      if (markerRef.current) {
        markerRef.current.setMap(null);
      }
      if (infowindowRef.current) {
        infowindowRef.current.close();
      }
    };
  }, [address]);

  // 주소를 좌표로 변환한 후 맵을 초기화하는 함수
  const initializeMapWithAddress = async () => {
    try {
      const result = await geocodeAddress(address);
      setCoordinates(result);
      initializeMap(result.coords);
    } catch (error) {
      console.error("주소 변환 실패:", error);
      // 기본 좌표로 맵 초기화
      const defaultCoords = new window.kakao.maps.LatLng(37.5796, 126.9989);
      initializeMap(defaultCoords);
    }
  };

  const initializeMap = (coords) => {
    // SDK가 준비되었는지 확인
    if (
      !window.kakao ||
      !window.kakao.maps ||
      typeof window.kakao.maps.LatLng !== "function" ||
      typeof window.kakao.maps.Map !== "function" ||
      typeof window.kakao.maps.Marker !== "function" ||
      typeof window.kakao.maps.InfoWindow !== "function"
    ) {
      console.error("카카오맵 SDK가 완전히 준비되지 않았습니다.");
      setMapError(true);
      return;
    }

    const container = document.getElementById("map");
    if (!container) {
      console.error("맵 컨테이너를 찾을 수 없습니다.");
      return;
    }

    try {
      const options = {
        center: coords,
        level: 3,
      };

      const map = new window.kakao.maps.Map(container, options);
      mapRef.current = map;

      // 마커 생성
      const marker = new window.kakao.maps.Marker({
        position: coords,
      });
      marker.setMap(map);
      markerRef.current = marker;

      // 정보창 생성
      const infowindow = new window.kakao.maps.InfoWindow({
        content: `
            <div style="padding:10px;text-align:center;">
              <h3 style="margin:0 0 5px 0;font-size:16px;">호호식당 대학로점</h3>
              <p style="margin:0;font-size:14px;color:#666;">${coordinates?.address}</p>
            </div>
          `,
      });
      infowindowRef.current = infowindow;

      // 마커 클릭 시 정보창 표시
      window.kakao.maps.event.addListener(marker, "click", function () {
        infowindow.open(map, marker);
      });

      // 지도 클릭 시 정보창 닫기
      window.kakao.maps.event.addListener(map, "click", function () {
        infowindow.close();
      });

      setMapError(false);
    } catch (error) {
      console.error("카카오맵 초기화 중 오류:", error);
      setMapError(true);
    }
  };

  if (mapError) {
    return (
      <div
        style={{
          width: "100%",
          height: "100%",
          borderRadius: "8px",
          border: "1px solid #e0e0e0",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#f5f5f5",
          color: "#666",
        }}
      >
        카카오맵을 불러올 수 없습니다.
      </div>
    );
  }

  return (
    <div
      id="map"
      style={{
        width: "100%",
        height: "100%",
        borderRadius: "8px",
        border: "1px solid #e0e0e0",
      }}
    />
  );
};

export default KakaoMap;
