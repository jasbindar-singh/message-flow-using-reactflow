import { useCallback, useState } from "react";
import { useDrag, useDrop } from "react-dnd";
import ReactFlow, {
  ReactFlowProvider,
  useEdgesState,
  useNodesState,
} from "reactflow";
import { v4 } from "uuid";

const MainActivity = () => {
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
        type: "default",
        position,
        data: { type: "text", value: "" },
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

  return (
    <div className="flex w-full flex-1">
      <div ref={drop} className="w-full">
        <ReactFlowProvider>
          <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onInit={setReactFlowInstance}
            onDrop={onMessageDropped}
          />
        </ReactFlowProvider>
      </div>
      <div className="w-[500px] border-2 border-gray-200">
        <button ref={drag}>Message</button>
      </div>
    </div>
  );
};

export default MainActivity;
