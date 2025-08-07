import React from "react";
import styles from "@/styles/MainPage/MainPage.module.scss";
import SelectBox from "@/components/MainPage/SelectBox";

function MainPage() {
  return (
    <div className={styles.container}>
      <SelectBox
        title="자영업자"
        content1="인플루언서와의 공생관계"
        content2="가게를 홍보할 수 있어요!"
        style={{
          textAlign: "end",
        }}
      />
      <SelectBox
        title="인플루언서"
        content1="협찬을 통한"
        content2="여러 콜라보 활동을 할 수 있어요!"
        style={{
          textAlign: "start",
        }}
      />
    </div>
  );
}

export default MainPage;
