import { useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Position, useReactFlow, useStoreApi, NodeToolbar } from "reactflow";
import styles from "./customs.module.css";
import CustomHandle from "./CustomHandle";

function SingleNode({ data, id }: any) {
  const navigate = useNavigate();
  const { setNodes } = useReactFlow();
  const store = useStoreApi();
  const [isHovered, setIsHovered] = useState(false);

  const onValueChange = useCallback(
    (e: any) => {
      const { nodeInternals } = store.getState();
      const updatedNodes = Array.from(nodeInternals.values()).map((node) => {
        if (node.id === id) {
          return {
            ...node,
            data: {
              ...node.data,
              value: e.target.value,
            },
          };
        }
        return node;
      });
      setNodes(updatedNodes);
    },
    [id, setNodes, store]
  );
  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const handleNodeDoubleClick = () => {
    navigate(`/details/${id}`);
  };
  return (
    <div
      className={styles.singleTextNode}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onDoubleClick={handleNodeDoubleClick}
    >
      <CustomHandle type="target" position={Position.Left} isConnectable={1} />
      {data.value && (
        <NodeToolbar isVisible={isHovered} position={Position.Right}>
          <div className={styles.tooltip}>
            <p>the printing : 200 </p>
            <p>typesetting : 800.</p>
            <p>the printing and typesetting industry.</p>
          </div>
        </NodeToolbar>
      )}
      <div className={styles.dropdownWrap}>
        <input
          type="text"
          name="name"
          className={styles.textField}
          value={data.value}
          onChange={onValueChange}
        />
      </div>
    </div>
  );
}

export default SingleNode;
