import { useCallback, useEffect, useState } from "react";
import { useDrag, useDrop } from "react-dnd";
import ReactFlow, { addEdge, useEdgesState, useNodesState } from "reactflow";
import { v4 } from "uuid";
import CustomNode from "../CustomNode";

const nodeTypes = { textMessage: CustomNode };
const MainActivity = () => {
  const [nodeText, setNodeText] = useState("");
  const [selectedNodeId, setSelectedNodeId] = useState("");
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [reactFlowInstance, setReactFlowInstance] = useState();

  const onMessageDropped = useCallback(
    (event) => {
      const position = reactFlowInstance.screenToFlowPosition({
        x: event.clientX,
        y: event.clientY,
      });

      const newNode = {
        id: v4(),
        type: "textMessage",
        position,
        data: { text: "" },
      };

      setNodes((nodes) => nodes.concat(newNode));
    },
    [reactFlowInstance, setNodes]
  );

  const [, drop] = useDrop(() => ({
    accept: "node",
  }));
  const [, drag] = useDrag(() => ({
    type: "node",
    item: { id: "drag" },
  }));

  const onNodeClick = (_, node) => {
    setSelectedNodeId(node.id);
    setNodeText(node.data.text);
  };

  const resetSelectedNode = () => {
    setSelectedNodeId("");
    setNodeText("");
  };

  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );

  const isValidConnection = (connection) => {
    const source = connection.source;
    const sourceEdgeExist = edges.find((edge) => edge.source === source);

    if (sourceEdgeExist) return false;
    return true;
  };

  useEffect(() => {
    if (selectedNodeId)
      setNodes((nds) =>
        nds.map((node) => {
          if (node.id === selectedNodeId) {
            node.data = {
              ...node.data,
              text: nodeText,
            };
          }
          return node;
        })
      );
  }, [nodeText, selectedNodeId, setNodes]);

  return (
    <div className="flex w-full flex-1">
      <div ref={drop} className="w-full">
        <ReactFlow
          nodes={nodes}
          edges={edges}
          nodeTypes={nodeTypes}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onInit={setReactFlowInstance}
          onDrop={onMessageDropped}
          onNodeClick={onNodeClick}
          onPaneClick={resetSelectedNode}
          onConnect={onConnect}
          isValidConnection={isValidConnection}
        />
      </div>
      <div className="w-[500px] p-[16px] border-2 border-gray-200 flex justify-center items-start">
        {selectedNodeId ? (
          <div className="w-full">
            <div className="mb-[24px]">
              <button
                className="border-[1px] px-[12px] border-black rounded-sm bg-white"
                onClick={resetSelectedNode}
              >
                Back
              </button>
            </div>
            <div>
              <textarea
                value={nodeText}
                onChange={(e) => setNodeText(e.target.value)}
                rows={5}
                className="w-full border-[1px] border-gray-400 p-[4px] rounded-sm"
                placeholder="Message"
              />
            </div>
          </div>
        ) : (
          <button
            ref={drag}
            className="border-[1px] p-[24px] border-blue-400 text-blue-400 rounded-sm"
          >
            Message
          </button>
        )}
      </div>
    </div>
  );
};

export default MainActivity;
