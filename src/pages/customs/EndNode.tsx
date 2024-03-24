import { Handle, Position } from "reactflow";
import styles from "./customs.module.css";

function EndNode({ data, isConnectable }: any) {
  return (
    <div className={styles.singleTextNode}>
      <Handle
        type="target"
        position={Position.Left}
        isConnectable={isConnectable}
      />
      <div className={styles.dropdownWrap}>
        <label htmlFor="text">{data?.label}</label>
      </div>
    </div>
  );
}

export default EndNode;
