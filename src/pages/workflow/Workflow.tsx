import { useState, useMemo, useCallback, useEffect } from "react";
import ReactFlow, {
  Background,
  Controls,
  Node,
  Edge,
  addEdge,
  applyEdgeChanges,
  applyNodeChanges,
  updateEdge,
} from "reactflow";
import "reactflow/dist/style.css";
import { v4 as uuidv4 } from "uuid";
import styles from "./workflowTable.module.css";
import StartNode from "../customs/StartNode";
import EndNode from "../customs/EndNode";
import SingleNode from "../customs/SingleNode";
import MultiNode from "../customs/MultiNode";

interface NodeDataMapping {
  [key: string]: {
    label: string;
    [key: string]: any;
  };
}

function Workflow({ setWfData, wfData, selectedId, setShoWf }: any) {
  const [nodes, setNodes] = useState<any>([]);
  const [edges, setEdges] = useState<any>([]);
  const [wfName, setWfName] = useState("");
  const [nameError, setNameError] = useState(false);
  const proOptions = { hideAttribution: true };

  const nodeTypes = useMemo(
    () => ({
      start: StartNode,
      end: EndNode,
      SingleNode: SingleNode,
      MultiNode: MultiNode,
    }),
    []
  );

  const onNodesChange = useCallback((changes: any) => {
    setNodes((prevNodes: Node<any>[]) => applyNodeChanges(changes, prevNodes));
  }, []);

  const onEdgesChange = useCallback((changes: any) => {
    setEdges((prevEdges: Edge<any>[]) => applyEdgeChanges(changes, prevEdges));
  }, []);

  const onConnect = useCallback(
    (params: any) => setEdges((eds: Edge[]) => addEdge(params, eds)),
    []
  );

  const onEdgeUpdate = useCallback(
    (oldEdge: any, newConnection: any) =>
      setEdges((els: any) => updateEdge(oldEdge, newConnection, els)),
    []
  );

  const handleAddNode = (nodeType: any) => {
    const nodeDataMapping: NodeDataMapping = {
      start: {
        label: "Start",
      },
      end: {
        label: "End",
      },
      SingleNode: {
        label: "Single Node",
        value: "",
      },
      MultiNode: {
        label: "Multi Node",
        value: "",
      },
    };

    const newNodeId = uuidv4(); // Generate a random ID
    const newNode = {
      id: nodeType.includes("start") ? nodeType : newNodeId,
      data: {
        ...nodeDataMapping[nodeType],
      },
      position: {
        x: Math.random() * (window.innerWidth - 200),
        y: Math.random() * (window.innerHeight - 200),
      },
      type: nodeType,
    };

    setNodes((prevNodes: any) => [...prevNodes, newNode]);
  };

  const handleSave = () => {
    if (wfName) {
      if (selectedId) {
        // If selectedId exists, find the index of the object to update
        const indexToUpdate = wfData.findIndex(
          (item: any) => item.id === selectedId
        );
        if (indexToUpdate !== -1) {
          const updatedData = {
            ...wfData[indexToUpdate],
            nodes: nodes,
            edges: edges,
            name: wfName,
          };
          const updatedWfData = [...wfData];
          updatedWfData[indexToUpdate] = updatedData;
          setWfData(updatedWfData);
        }
      } else {
        const data = {
          nodes: nodes,
          edges: edges,
          name: wfName,
          id: wfData.length + 1,
        };
        setWfData([...wfData, data]);
      }
      setShoWf(false);
    } else {
      setNameError(true);
    }
  };

  useEffect(() => {
    if (selectedId) {
      const selectedData = wfData.find((item: any) => item.id === selectedId);
      setNodes(selectedData.nodes);
      setEdges(selectedData.edges);
      setWfName(selectedData.name);
    }
  }, [selectedId, wfData]);

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <button className={styles.backButton} onClick={() => setShoWf(false)}>
          {"<-"} Go Back
        </button>
        <div className={styles.fieldWrap}>
          <span className={styles.wfSubHeader}>Name : </span>
          <div className={styles.inputWrap}>
            <input
              type="text"
              name="name"
              className={styles.wfTextField}
              value={wfName}
              onChange={(e) => setWfName(e.target.value)}
            />
            {nameError && (
              <span className={styles.error}>Name is required</span>
            )}
          </div>
          <button className={styles.saveButton} onClick={() => handleSave()}>
            Save Workflow
          </button>
        </div>
      </div>

      <div className={styles.wfWrap}>
        <div className={styles.wfSidebar}>
          <p className={styles.wfSubHeader}>Flow Elements</p>

          <div className={styles.elementsWrap}>
            <div className={styles.elementText}>
              <span>Basic</span>
            </div>
            <div className={styles.element}>
              <button
                type="button"
                className={styles.ovalBtn}
                disabled={nodes.some((node: any) => node.type === "start")}
                onClick={() => handleAddNode("start")}
              >
                START
              </button>
              <button
                type="button"
                className={styles.ovalBtn}
                // disabled={nodes.some((node: any) => node.type === "end")}
                onClick={() => handleAddNode("end")}
              >
                END
              </button>
              <button
                type="button"
                className={styles.rectBtn}
                onClick={() => handleAddNode("SingleNode")}
              >
                SINGLE NODE
              </button>

              <button
                type="button"
                className={styles.rectBtn}
                onClick={() => handleAddNode("MultiNode")}
              >
                MULTI NODE
              </button>
            </div>
          </div>
        </div>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          nodeTypes={nodeTypes}
          className={styles.wfContainer}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onEdgeUpdate={onEdgeUpdate}
          onConnect={onConnect}
          deleteKeyCode={["Backspace", "Delete"]}
          proOptions={proOptions}
          defaultViewport={{ x: 0, y: 0, zoom: 0 }}
          snapToGrid
        >
          <Background />
          <Controls />
        </ReactFlow>
      </div>
    </div>
  );
}

export default Workflow;
