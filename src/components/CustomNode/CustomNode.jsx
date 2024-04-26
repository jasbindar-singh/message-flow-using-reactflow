import { Handle, Position } from "reactflow";

const CustomNode = (props) => {
  const isSelected = props.selected;
  const inputText = props.data.text;

  return (
    <>
      <Handle type="source" position={Position.Right} />
      <div
        className={`min-w-[200px] rounded-lg shadow-lg overflow-hidden ${
          isSelected ? "border-[1px] border-black" : ""
        }`}
      >
        <div className="px-[12px] py-[4px] bg-green-200">Send Message</div>
        <div className="px-[12px] py-[8px] bg-white">{inputText}</div>
      </div>
      <Handle type="target" position={Position.Left} />
    </>
  );
};

export default CustomNode;
