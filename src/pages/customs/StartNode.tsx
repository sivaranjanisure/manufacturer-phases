import { Position } from "reactflow";
import styles from "./customs.module.css";
import CustomHandle from "./CustomHandle";

function StartNode({ data }: any) {
  return (
    <div className={styles.singleTextNode}>
      <div className={styles.dropdownWrap}>
        <label htmlFor="text">{data?.label}</label>
      </div>
      <CustomHandle type="source" position={Position.Right} isConnectable={5} />
    </div>
  );
}

export default StartNode;
