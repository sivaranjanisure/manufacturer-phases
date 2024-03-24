import { useNavigate } from "react-router-dom";
import styles from "./main.module.css";

function LandingPage() {
  const navigate = useNavigate();
  return (
    <div className={styles.main}>
      <div className={styles.landing}></div>
      <div className={styles.content}>
        <p>Welcome To Build New Cars!!!</p>
        <button className={styles.startBtn} onClick={() => navigate("/home")}>
          Let's start here
        </button>
      </div>
    </div>
  );
}
export default LandingPage;
