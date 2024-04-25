import ReactFlow from "reactflow";
import "reactflow/dist/style.css";

function App() {
  return (
    <div className="w-screen h-screen">
      <div className="flex flex-col w-full h-full">
        <div className="h-[56px] flex items-center justify-end px-[24px] bg-gray-200">
          <button>Save Changes</button>
        </div>
        <div className="flex w-full flex-1">
          <div className="w-full">
            <ReactFlow />
          </div>
          <div className="w-[500px] border-2 border-gray-200">
            <button>Message</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
