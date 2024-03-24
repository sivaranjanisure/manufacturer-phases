import { useNavigate, useParams } from "react-router-dom";
import CarGif from "../assets/automain.jpg";
import styles from "./main.module.css";

function DetailsPage() {
  const navigate = useNavigate();
  const { nodeId } = useParams();
  return (
    <div className={styles.details}>
      <button className={styles.backButton} onClick={() => navigate("/home")}>
        {"<-"} Go Back
      </button>
      <div>
        <h3 className={styles.cardText}>
          Node ID to load content dynamically : {nodeId}
        </h3>
        <div className={styles.detailsContent}>
          {" "}
          <img src={CarGif} alt="CarGif" />{" "}
          <div className={styles.detailsContentWrap}>
            <p>
              Why do we use it? It is a long established fact that a reader will
              be distracted by the readable content of a page when looking at
              its layout. The point of using Lorem Ipsum is that it has a
              more-or-less normal distribution of letters, as opposed to using
              'Content here, content here', making it look like readable
              English.
            </p>
            <p>
              Many desktop publishing packages and web page editors now use
              Lorem Ipsum as their default model text, and a search for 'lorem
              ipsum' will uncover many web sites still in their infancy. Various
              versions have evolved over the years, sometimes by accident,
              sometimes on purpose (injected humour and the like).
            </p>
            <br />
            <p>
              Why do we use it? It is a long established fact that a reader will
              be distracted by the readable content of a page when looking at
              its layout. The point of using Lorem Ipsum is that it has a
              more-or-less normal distribution of letters, as opposed to using
              'Content here, content here', making it look like readable
              English.
            </p>
            <p>
              Many desktop publishing packages and web page editors now use
              Lorem Ipsum as their default model text, and a search for 'lorem
              ipsum' will uncover many web sites still in their infancy. Various
              versions have evolved over the years, sometimes by accident,
              sometimes on purpose (injected humour and the like).
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
export default DetailsPage;
