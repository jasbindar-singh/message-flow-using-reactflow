import { useDrag, useDrop } from "react-dnd";
import ReactFlow, { useEdgesState, useNodesState } from "reactflow";

const MainActivity = () => {
  const [, drop] = useDrop(() => ({
    accept: "node-element",
    drop: () => console.log("dropped"),
  }));
  const [, drag] = useDrag(() => ({
    type: "node-element",
    item: { id: "drag" },
  }));

  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);

  return (
    <div className="flex w-full flex-1">
      <div ref={drop} className="w-full">
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
        />
      </div>
      <div className="w-[500px] border-2 border-gray-200">
        <button ref={drag}>Message</button>
      </div>
    </div>
  );
};

export default MainActivity;
