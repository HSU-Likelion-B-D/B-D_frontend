// 금액에 3자리마다 쉼표 추가하는 함수
export const formatNumber = (num) => {
  if (!num) return "0";
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};
