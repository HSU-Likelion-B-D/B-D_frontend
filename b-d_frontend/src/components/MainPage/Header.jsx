import styles from "@/styles/components/MainPage/Header.module.scss";
import {
  logo,
  alarm_icon,
  chat_icon,
  profile_icon,
  hamburger_icon,
} from "@/assets";
import ProfileModal from "./ProfileModal";
import { useState } from "react";
export default function Header({ setIsNotificationModalOpen }) {
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  return (
    <div className={styles.header}>
      <div className={styles.iconContainer}>
        <div className={styles.iconBox}>
          <img className={styles.icon} src={chat_icon} alt="chat" />
          <div className={styles.count}>1</div>
        </div>
        <div
          className={styles.iconBox}
          onClick={() => setIsNotificationModalOpen(true)}
        >
          <img className={styles.icon} src={alarm_icon} alt="alarm" />
          <div className={styles.count}>1</div>
        </div>
      </div>
      <div className={styles.logoContainer}>
        <img className={styles.logo} src={logo} alt="logo" />
      </div>
      <div className={styles.rightIconContainer}>
        <div className={styles.userInfoContainer}>
          <div className={styles.userNameContainer}>
            <span className={styles.userName}>화이팅</span> 님
          </div>
          <div className={styles.profileContainer}>
            <img
              className={styles.profileIcon}
              src={profile_icon}
              alt="profile"
            />
          </div>
        </div>
        <div className={styles.hamburgerContainer}>
          <img
            className={styles.hamburgerIcon}
            src={hamburger_icon}
            alt="hamburger"
            onClick={() => setIsProfileModalOpen(!isProfileModalOpen)}
          />
          {isProfileModalOpen && (
            <div className={styles.profileModal}>
              <ProfileModal />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
