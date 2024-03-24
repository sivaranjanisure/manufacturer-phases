import { useState } from "react";
import Workflow from "./workflow/Workflow";
import defautlData from "../assets/default.json";
import styles from "./main.module.css";

function Home() {
  const [wfData, setWfData] = useState<any>(defautlData);
  const [selectedId, setSelectedId] = useState<any>(null);
  const [showWf, setShoWf] = useState(false);

  const handleDelete = (id: any) => {
    const result = wfData.filter((item: any) => item.id !== id);
    setWfData(result);
  };

  return (
    <div>
      {!showWf ? (
        <div className={styles.home}>
          <p className={styles.title}>
            Car Manufacturer new vehicle build plans
          </p>
          <button
            className={styles.button}
            onClick={() => {
              setSelectedId(null);
              setShoWf(true);
            }}
          >
            {" "}
            Create new plan
          </button>
          <div className={styles.cardsWrap}>
            {wfData.map((workflow: any) => (
              <div className={styles.card}>
                <p className={styles.cardText}>
                  {workflow.id}. {workflow.name}
                </p>
                <div className={styles.groupBtn}>
                  <button
                    className={styles.editBtn}
                    onClick={() => {
                      setSelectedId(workflow.id);
                      setShoWf(true);
                    }}
                  >
                    Edit
                  </button>
                  <button
                    className={styles.deleteBtn}
                    onClick={() => {
                      handleDelete(workflow.id);
                    }}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <Workflow
          setWfData={setWfData}
          wfData={wfData}
          selectedId={selectedId}
          setShoWf={setShoWf}
        />
      )}
    </div>
  );
}
export default Home;
